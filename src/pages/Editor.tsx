import React, { useState, useRef, useCallback, useEffect } from 'react';
import type ReactPlayer from 'react-player/twitch';
import { useClips, useVideo, useUser } from '../services/hooks/api';
import { Button, Row, Col, Popconfirm, notification, message, Empty, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ClipList from '../components/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '../components/VideoPlayer';
import TimeSlider from '../components/TimeSlider/TimeSlider';
import type { IndividualTimestamp } from '../services/hooks/api';
import { useIntl } from 'umi';
import { useTime } from '../services/hooks/playtime';

const { Search } = Input;

const sendClips = async (videoId: string, clips: IndividualTimestamp[]) => {
  const data = { videoId, clips };

  const resp = await fetch('https://lfh9xm104e.execute-api.us-east-1.amazonaws.com/prod/clips', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return resp.ok;
};

const getStartEndTimeFromClipId = (clipId: string, clips: IndividualTimestamp[]): number[] => {
  if (clipId == null) return [0, 1];
  const selectedClip = clips.find((clip) => clip.id === clipId);
  if (!selectedClip) return [0, 1];
  return [selectedClip.startTime, selectedClip.endTime];
};

export default () => {
  const { id: videoId } = useParams<{ id: string }>();
  const { data: userData } = useUser();
  const { data, isLoading, isError } = useClips(videoId);
  const [clips, setClips] = useState<IndividualTimestamp[] | []>([]);
  const { data: videoData } = useVideo(videoId);
  const { thumbnail_url } = videoData || {};
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isCombineButtonDisabled, setIsCombineButtonDisabled] = useState<boolean>(false);
  const [selectedClipId, setSelectedClipId] = useState<string>('');
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [confirmChangeClip, setConfirmChangeClip] = React.useState(false);
  const { formatMessage } = useIntl();
  const [clipFeedbackText, setClipFeedbackText] = useState('');
  const [showClipHandles, setShowClipHandles] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [trimClipUpdateValues, setTrimClipUpdateValues] = useState<number[]>([0, 0]);
  const isPlaying = playing && isReady;
  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId, clips);
  const { setSecPlayed, playedSeconds, isClipOver } = useTime(isPlaying, startTime, endTime);
  useEffect(() => {
    if (isClipOver) {
      setPlaying(false);
    }
  }, [setPlaying, isClipOver]);

  const seek = useCallback(
    async (seekTime: number) => {
      setPlaying(true);

      // this pointless line is to hack a fix twitch bug where you can't seek while paused
      // this is the same reason we are calling setPlaying before seeking
      // https://github.com/cookpete/react-player/issues/924
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime, 'seconds');
      }
    },
    [videoRef],
  );
  const play = useCallback(
    (seekTime: number, clipId: string) => {
      setIsReady(false);
      seek(seekTime);
      setSecPlayed(seekTime);
      setSelectedClipId(clipId);
    },
    [seek, setSelectedClipId, setSecPlayed],
  );

  useEffect(() => {
    if (data?.brain) {
      const clipsDefaultChecked = data.brain.map((timestamp) => ({ ...timestamp, selected: true }));
      setClips((prev) => [...prev, ...clipsDefaultChecked]);
      // setSelectedClipId(clipsDefaultChecked[0].id);
      play(clipsDefaultChecked[0].startTime, clipsDefaultChecked[0].id);
    }
    if (data?.ccc) {
      const append = data.ccc.map((d) => ({
        ...d,
        verifiedTwitch: true,
      }));
      setClips((prev) => [...prev, ...append]);
    }
  }, [data]);

  if (isLoading) return formatMessage({ id: 'pages.editor.loading' });
  if (isError) return formatMessage({ id: 'pages.editor.error' });
  if (!data) return formatMessage({ id: 'pages.editor.noData' });
  const setPlaytime = (playtime: number) => {
    const newTime = startTime + playtime;
    setSecPlayed(newTime);
    seek(newTime);
  };

  const clipLength = Math.round(endTime - startTime);
  const { thumbnails } = data || {};

  const showSuccessNotification = (successMessage: string) => {
    notification.success({
      message: formatMessage({
        id: 'pages.editor.successNotification.message',
      }),
      description: successMessage,
    });
  };
  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';
  const { email } = userData || {};

  const onChange = (event: any) => {
    setClipFeedbackText(event.target.value);
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onSubmitClipFeedback = async () => {
    const clipData = getStartEndTimeFromClipId(selectedClipId, clips);
    const resp = await fetch('/api/submitClipFeedback', {
      method: 'POST',
      body: JSON.stringify({
        videoId,
        feedbackText: clipFeedbackText,
        clip: { startTime: clipData[0], endTime: clipData[1] },
      }),
    });
    const successMessage = formatMessage({
      id: 'pages.editor.onSubmitClipFeedback.successMessage',
    });
    showSuccessNotification(successMessage);
    setClipFeedbackText('');

    return resp.ok;
  };

  const combineClips = async () => {
    const successMessage = formatMessage({ id: 'pages.editor.combineClips.successMessage' });
    if (clips) {
      const selectedClips = clips.filter((clip) => clip.selected);
      setIsCombineButtonDisabled(true);
      setConfirmLoading(true);
      const success = await sendClips(videoId, selectedClips);
      setConfirmLoading(false);
      setVisible(false);
      if (success) {
        showSuccessNotification(successMessage);
      } else {
        message.error(
          formatMessage({
            id: 'pages.editor.combineClips.error',
          }),
        );
      }
    }
  };

  const seekToStartTime = () => {
    setPlaytime(trimClipUpdateValues[0]);
  };

  const triggerLoadingStartSequence = async () => {
    const indexOfClipToAdjust = clips.findIndex((clip) => clip.id === selectedClipId);

    clips[indexOfClipToAdjust].startTime += trimClipUpdateValues[0];
    clips[indexOfClipToAdjust].endTime -= clipLength - trimClipUpdateValues[1];

    setClips([...clips]);
    seekToStartTime();
    return true;
  }
  const triggerActiveLoadingButton = async () => {
    setConfirmChangeClip(false)
    return true
  }
  const triggerLoadingEndAnimation = () => {
    const successMessage = "Changes saved! ";
    showSuccessNotification(successMessage);
    setShowClipHandles(false)
    return true
  }

  const saveAdjustedClip = async () => {
    if (!trimClipUpdateValues[0]){
      setConfirmChangeClip(false) 
      return true;
    } 

    // this poopy code is to hardcode a user feedback sequence when they adjust a clip 
    setConfirmChangeClip(true)
    setTimeout(triggerLoadingStartSequence, 1000);
    setTimeout(triggerActiveLoadingButton, 900);
    setTimeout(triggerLoadingEndAnimation, 1600);
    

    return true;
  };

  return (
    <PageContainer
      content={formatMessage({
        id: 'pages.editor.instructions',
      })}
      extra={
        <Popconfirm
          title={
            <div>
              <div>
                {formatMessage({
                  id: 'pages.editor.exportConfirm1',
                })}
              </div>
              <div>
                {formatMessage(
                  {
                    id: 'pages.editor.exportConfirm2',
                  },
                  { email },
                )}
              </div>
              <div>
                {formatMessage({
                  id: 'pages.editor.exportConfirm3',
                })}
              </div>
            </div>
          }
          visible={visible}
          onConfirm={combineClips}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
          okText={formatMessage({ id: 'pages.editor.exportOkText' })}
          cancelText={formatMessage({
            id: 'pages.editor.exportCancelText',
          })}
        >
          <Button
            style={{ marginLeft: 24 }}
            type="primary"
            disabled={isCombineButtonDisabled}
            icon={<DownloadOutlined />}
            onClick={showPopconfirm}
          >
            {formatMessage({
              id: 'pages.editor.combineClipsButton',
            })}
          </Button>
          {}
        </Popconfirm>
      }
    >
      {clips.length !== 0 ? (
        <div>
          <Row gutter={24}>
            <Col span={14} style={{ marginBottom: 24 }}>
              <VideoPlayer
                videoRef={videoRef}
                playing={playing}
                setPlaying={setPlaying}
                progress={playedSeconds}
                onProgress={() => {}}
                duration={clipLength}
                onReady={() => setIsReady(true)}
                selectedClipId={selectedClipId}
                url={`https://twitch.tv/videos/${videoId}`}
              />
              <Search
                placeholder={'This clip was good/ok/bad because...'}
                onChange={onChange}
                value={clipFeedbackText}
                enterButton={'Submit'}
                onSearch={onSubmitClipFeedback}
                style={{ paddingBottom: '1rem', paddingTop: '1rem' }}
              />
              <Row>
                <Col style={{ width: '100%' }}>
                  <TimeSlider
                    trimClipUpdateValues={trimClipUpdateValues}
                    setTrimClipUpdateValues={setTrimClipUpdateValues}
                    showClipHandles={!showClipHandles}
                    duration={clipLength}
                    progress={playedSeconds}
                    setPlaytime={setPlaytime}
                    setPlaying={setPlaying}
                  />
                  <Button
                    style={{ marginTop: '6rem', marginLeft: '35%', marginRight: '1%' }}
                    onClick={() => setShowClipHandles(!showClipHandles)}
                  >
                    {showClipHandles ? 'Cancel' : 'Adjust Clip'}
                  </Button>

                  {showClipHandles ? (
                    <Button style={{ marginRight: '1%' }} loading={confirmChangeClip} onClick={saveAdjustedClip}>
                      Save Changes
                    </Button>
                  ) : null}
                  {showClipHandles ? <Button onClick={seekToStartTime}>Preview</Button> : null}
                </Col>
              </Row>
            </Col>
            <Col style={{ alignItems: 'flex-start' }} span={8}>
              {clips.length ? (
                <ClipList
                  clipInfo={{ clips, setClips }}
                  clipIdInfo={{ selectedClipId, setSelectedClipId }}
                  play={play}
                  thumbnail={thumbnail}
                  videoId={videoId}
                  thumbnails={thumbnails}
                />
              ) : (
                <Empty
                  description={formatMessage({
                    id: 'pages.editor.noClips',
                  })}
                />
              )}
            </Col>
          </Row>
        </div>
      ) : (
        'No clips found! Please select another VOD. '
      )}
    </PageContainer>
  );
};
