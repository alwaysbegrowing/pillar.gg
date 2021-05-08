import React, { useState, useRef, useCallback, useEffect } from 'react';
import type ReactPlayer from 'react-player/twitch';
import { useClips, useVideo, useUser } from '../services/hooks/api';
import { Button, Row, Col, Popconfirm, notification, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ClipList from '../components/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '../components/VideoPlayer';
import type { IndividualTimestamp } from '../services/hooks/api';

interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const sendClips = async (videoId: string, clips: IndividualTimestamp[]) => {
  const data = { videoId, clips };

  const resp = await fetch('https://5i9oqay4hh.execute-api.us-east-1.amazonaws.com/prod/clips', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return resp.ok;
};

const getStartEndTimeFromClipId = (clipId: string): number[] => clipId.split('-').map(Number);

export default () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData } = useUser();
  const { data, isLoading, isError } = useClips(id);
  const [clips, setClips] = useState<IndividualTimestamp[] | []>([]);
  const { data: videoData } = useVideo(id);
  const { thumbnail_url } = videoData || {};
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [secondsPlayed, setSecondsPlayed] = useState<number>(0);
  const [isCombineButtonDisabled, setIsCombineButtonDisabled] = useState<boolean>(false);
  const [selectedClipId, setSelectedClipId] = useState<string>('');
  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showSuccessNotificaiton = () => {
    notification.success({
      message: 'Success! ',
      description:
        'Your video has successfully started exporting!' +
        ' The link to download your video will be emailed to you in 5-10 minutes. ',
    });
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';

  const seek = useCallback(
    (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime);
      }
    },
    [videoRef],
  );

  const play = useCallback(
    (seekTime: number, clipId: string) => {
      seek(seekTime);
      setSecondsPlayed(seekTime);
      setPlaying(true);
      setSelectedClipId(clipId);
    },
    [seek, setSecondsPlayed, setPlaying, setSelectedClipId],
  );

  useEffect(() => {
    if (data?.brain) {
      const clipsDefaultChecked = data.brain.map((timestamp) => ({ ...timestamp, selected: true }));
      setClips((prev) => [...prev, ...clipsDefaultChecked]);
    }
    if (data?.ccc) {
      const append = data.ccc.map((d) => ({
        ...d,
        verifiedTwitch: true,
      }));
      setClips((prev) => [...prev, ...append]);
    }
  }, [data]);

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  const { email } = userData;

  const onProgress = ({ playedSeconds }: ProgressProps) => {
    setSecondsPlayed((seconds) => {
      if (Math.abs(playedSeconds - seconds) > 5) return seconds;
      if (playedSeconds > endTime) {
        setPlaying(false);
        return startTime;
      }
      return playedSeconds;
    });
  };

  const clipLength = Math.round(endTime - startTime);
  const clipTimePlayed = Math.round(secondsPlayed - startTime);

  const combineClips = async () => {
    if (clips) {
      const selectedClips = clips.filter((clip) => clip.selected);
      setIsCombineButtonDisabled(true);
      setConfirmLoading(true);
      const success = await sendClips(id, selectedClips);
      setConfirmLoading(false);
      setVisible(false);
      if (success) {
        showSuccessNotificaiton();
      } else {
        message.error('Error combining clips');
      }
    }
  };

  return (
    <PageContainer
      content="Hide clips you don't want in your compilation video. Click and drag
      clips to re-order them on the timeline. Click the Export Video button when you are ready. "
      extra={
        <Popconfirm
          title={
            <div>
              <div>Are you ready to export your video?</div>
              <div>
                {`You will receive an email at ${email} with the combined video once it has been processed.`}
              </div>
              <div>For now, you can only do this once per VOD.</div>
            </div>
          }
          visible={visible}
          onConfirm={combineClips}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
          okText="Export"
          cancelText="Nevermind"
        >
          <Button
            style={{ marginLeft: 24 }}
            type="primary"
            disabled={isCombineButtonDisabled}
            icon={<DownloadOutlined />}
            onClick={showPopconfirm}
          >
            Combine Selected Clips
          </Button>
          {}
        </Popconfirm>
      }
    >
      <Row justify="center" gutter={24}>
        <Col span={10} style={{ marginBottom: 24 }}>
          <VideoPlayer
            videoRef={videoRef}
            playing={playing}
            setPlaying={setPlaying}
            progress={clipTimePlayed}
            onProgress={onProgress}
            controlKeys
            duration={clipLength}
            url={`https://twitch.tv/videos/${id}`}
          />
        </Col>
        <Col span={24}>
          {clips.length && (
            <ClipList
              clipInfo={{ clips, setClips }}
              selectedClipId={selectedClipId}
              play={play}
              thumbnail={thumbnail}
            />
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};
