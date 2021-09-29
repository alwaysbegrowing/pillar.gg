/* eslint-disable no-nested-ternary */
import type { ReactNode } from 'react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import type ReactPlayer from 'react-player/twitch';
import { useClips, useUser, useVideo } from '../services/hooks/api';
import { Button, Row, Col, notification, Empty, Input, Tooltip, Alert } from 'antd';
import { DislikeTwoTone, LikeTwoTone } from '@ant-design/icons';
import ClipList from '@/components/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '@/components/VideoPlayer';
import TimeSlider from '@/components/TimeSlider/TimeSlider';
import ExportController from '@/components/MobileExporter/ExportController';
import type { IndividualTimestamp } from '@/services/hooks/api';
import { useIntl } from 'umi';
import { useTime } from '@/services/hooks/playtime';
import 'cropperjs/dist/cropper.css';
import ExportButton from '@/components/ExportButton';
import { ClipContext } from '@/services/contexts/ClipContext';
import { sendHubspotEvent } from '@/services/send';
import { MOBILE_EXPORT_URL } from '@/constants/apiUrls';
import { getHeaders } from '@/services/fetcher';

const { Search } = Input;

const getStartEndTimeFromClipId = (clipId: string, clips: IndividualTimestamp[]): number[] => {
  if (clipId == null) return [0, 1];
  const selectedClip = clips.find((clip) => clip.id === clipId);
  if (!selectedClip) return [0, 1];
  return [selectedClip.startTime, selectedClip.endTime];
};

export default () => {
  const { data: twitchData } = useUser();
  const { id: twitchId } = twitchData || {};
  const { id: videoId } = useParams<{ id: string }>();
  // const { data: userData } = useUser();
  const { data, isLoading, isError } = useClips(videoId);
  const [clips, setClips] = useState<IndividualTimestamp[] | []>([]);
  const { data: videoData } = useVideo(videoId);
  const { thumbnail_url } = videoData || {};
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [selectedClipId, setSelectedClipId] = useState<string>('');
  const [confirmChangeClip, setConfirmChangeClip] = React.useState(false);
  const [alert, setAlert] = useState<ReactNode>(null);
  const { formatMessage } = useIntl();
  const [clipFeedbackText, setClipFeedbackText] = useState('');
  const [showClipHandles, setShowClipHandles] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [trimClipUpdateValues, setTrimClipUpdateValues] = useState<number[]>([0, 0]);
  const isPlaying = playing && isReady;
  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId, clips);
  const [showExportController, setShowExportController] = useState<boolean>(false);
  const { setSecPlayed, playedSeconds, isClipOver, intervalInMs } = useTime(
    isPlaying,
    startTime,
    endTime,
  );

  useEffect(() => {
    if (isClipOver) {
      setPlaying(false);
    }
  }, [setPlaying, isClipOver]);

  const seek = useCallback(
    async (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime, 'seconds');
        setPlaying(true);
      }
    },
    [videoRef],
  );

  const play = useCallback(
    (seekTime: number, clipId: string) => {
      seek(seekTime);
      setSecPlayed(seekTime);
      setSelectedClipId(clipId);
    },
    [seek, setSelectedClipId, setSecPlayed],
  );

  useEffect(() => {
    if (data?.brain?.length) {
      const clipsDefaultChecked = data.brain.map((timestamp) => ({ ...timestamp, selected: true }));
      setClips((prev) => [...prev, ...clipsDefaultChecked]);
      // setSelectedClipId(clipsDefaultChecked[0].id);
      play(clipsDefaultChecked[0].startTime, clipsDefaultChecked[0].id);
    }
    if (data?.ccc?.length) {
      const append = data.ccc.map((d) => ({
        ...d,
        sourceAttribution: 'Clipped By Chat',
      }));
      setClips((prev) => [...prev, ...append]);
    }
    if (data?.manual?.length) {
      const append = data.manual.map((d) => ({
        ...d,
        sourceAttribution: 'From !clip',
      }));
      setClips((prev) => [...prev, ...append]);
    }
  }, [data]);

  if (isLoading) return formatMessage({ id: 'pages.editor.loading' });
  if (isError) return formatMessage({ id: 'pages.editor.error' });
  if (!data) return formatMessage({ id: 'pages.editor.noData' });

  const handleShowOnClick = () => {
    setShowExportController(true);
  };

  const showSuccessNotification = (successMessage: string) => {
    notification.success({
      message: formatMessage({
        id: 'pages.editor.successNotification.message',
      }),
      description: successMessage,
    });
  };

  const setPlaytime = (playtime: number) => {
    const newTime = startTime + playtime;
    setSecPlayed(newTime);
    seek(newTime);
  };

  const clipLength = Math.round(endTime - startTime);
  const { thumbnails } = data || {};

  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';

  const onChange = (event: any) => {
    setClipFeedbackText(event.target.value);
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
  };
  const triggerActiveLoadingButton = async () => {
    setConfirmChangeClip(false);
    return true;
  };
  const triggerLoadingEndAnimation = () => {
    const successMessage = 'Changes saved! ';
    showSuccessNotification(successMessage);
    setShowClipHandles(false);
    return true;
  };

  const isCurrentClip = (element: IndividualTimestamp) => element.id === selectedClipId;

  const saveAdjustedClip = async () => {
    if (!trimClipUpdateValues[0]) {
      setConfirmChangeClip(false);
      return true;
    }

    const currentClipIndex = clips.findIndex(isCurrentClip);

    // this poopy code is to hardcode a user feedback sequence when they adjust a clip
    setConfirmChangeClip(true);
    setTimeout(triggerLoadingStartSequence, 1000);
    setTimeout(triggerActiveLoadingButton, 900);
    setTimeout(triggerLoadingEndAnimation, 1600);
    // if(clips[currentClipIndex].selected != true){
    setTimeout(() => {
      clips[currentClipIndex].selected = true;
      return true;
    }, 1600);
    // }

    if (twitchId) {
      sendHubspotEvent(twitchId, 'SAVED_ADJUSTED_CLIP_EVENT', videoId);
    }

    return true;
  };

  const onSubmitBinaryFeedback = async (binaryFeedback: boolean) => {
    const clipData = getStartEndTimeFromClipId(selectedClipId, clips);
    const resp = await fetch('/api/submitClipFeedback', {
      method: 'POST',
      body: JSON.stringify({
        videoId,
        binaryFeedback,
        clip: { startTime: clipData[0], endTime: clipData[1] },
      }),
    });
    // const successMessage = formatMessage({
    // id: 'pages.editor.onSubmitClipFeedback.successMessage',
    // });
    // showSuccessNotification(successMessage);
    // setClipFeedbackText('');

    return resp.ok;
  };

  const handleBinaryFeedback = async (feedback: any, message: string) => {
    await onSubmitBinaryFeedback(feedback);
    showSuccessNotification(message);
  };

  const handleSubmitExport = async (cropConfigs) => {
    setShowExportController(false);

    const body = {
      ClipData: {
        videoId,
        upscale: true,
        clip: {
          startTime,
          endTime,
        },
      },
      Outputs: cropConfigs,
    };

    const resp = await fetch(MOBILE_EXPORT_URL, {
      method: 'POST',
      headers: getHeaders() || undefined,
      body: JSON.stringify(body),
    });

    if (resp.status === 200) {
      setAlert(
        <Alert
          message="Success! Your exported clip will be emailed to you shortly."
          type="success"
          closable
          onClose={() => setAlert(null)}
        />,
      );
    } else {
      setAlert(
        <Alert
          message="Oops! Something went wrong. Please try again."
          type="error"
          closable
          onClose={() => setAlert(null)}
        />,
      );
    }
  };

  return (
    <PageContainer
      content={formatMessage({
        id: 'pages.editor.instructions',
      })}
      extra={<ExportButton videoId={videoId} clips={clips?.filter((clip) => clip.selected)} />}
    >
      {clips.length !== 0 ? (
        showExportController ? (
          // export to mobile component screen here
          <ClipContext.Provider
            value={{ startTime, endTime, source: `https://twitch.tv/videos/${videoId}` }}
          >
            <ExportController
              videoUrl={`https://twitch.tv/videos/${videoId}`}
              onConfirm={handleSubmitExport}
              onCancel={() => setShowExportController(false)}
            />
          </ClipContext.Provider>
        ) : (
          [
            <Row gutter={[24, 24]} key="a">
              {alert && <Col span={24}>{alert}</Col>}
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
                <div style={{ padding: '1em', display: 'flex' }}>
                  <Tooltip title={'I like this clip'}>
                    <Button
                      size="large"
                      shape="circle"
                      icon={
                        <LikeTwoTone
                          twoToneColor="#52c41a"
                          onClick={() => handleBinaryFeedback(1, 'You liked this video')}
                        />
                      }
                    />
                  </Tooltip>
                  <Tooltip title={'I dislike this clip'}>
                    <Button
                      size="large"
                      shape="circle"
                      icon={
                        <DislikeTwoTone
                          twoToneColor="#eb2f96"
                          onClick={() => handleBinaryFeedback(0, 'You disliked this video')}
                        />
                      }
                    />
                  </Tooltip>
                  <Search
                    placeholder={'What did you think about this clip? '}
                    onChange={onChange}
                    value={clipFeedbackText}
                    enterButton={'Submit'}
                    onSearch={onSubmitClipFeedback}
                    style={{ paddingBottom: '1rem', paddingLeft: '.5em', paddingTop: '.15em' }}
                  />
                </div>
                <div></div>
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
                      changeInterval={intervalInMs}
                    />
                    {showClipHandles ? (
                      <Button
                        style={{ marginTop: '6rem', marginLeft: '35%', marginRight: '1%' }}
                        onClick={() => setShowClipHandles(!showClipHandles)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <div>
                        <Button
                          type="primary"
                          style={{ marginTop: '6rem', marginLeft: '35%', marginRight: '1%' }}
                          onClick={() => setShowClipHandles(!showClipHandles)}
                        >
                          Adjust Clip
                        </Button>
                        <Button type="default" onClick={() => handleShowOnClick()}>
                          Export To Mobile
                        </Button>
                      </div>
                    )}
                    {showClipHandles ? (
                      <Button
                        style={{ marginRight: '1%' }}
                        loading={confirmChangeClip}
                        onClick={saveAdjustedClip}
                      >
                        Save Changes
                      </Button>
                    ) : null}
                    {showClipHandles ? <Button onClick={seekToStartTime}>Preview</Button> : null}
                  </Col>
                </Row>
              </Col>
              <Col style={{ alignItems: 'flex-start' }} span={10}>
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
            </Row>,
          ]
        )
      ) : (
        'No clips found! Please select another VOD. '
      )}
    </PageContainer>
  );
};
