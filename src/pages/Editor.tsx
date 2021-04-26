import React, { useState, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player/twitch';
import { useClips, useVideo } from '../services/hooks/api';
import { List, Button, Row, Col, PageHeader, Slider, Progress } from 'antd';
import { Card } from 'antd';
import { ControlOutlined, DownloadOutlined } from '@ant-design/icons';
import Sortable from '../components/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '../components/VideoPlayer';
interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const getStartEndTimeFromClipId = (clipId: string): number[] => clipId.split('-').map(Number);

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);

  const { data: videoData } = useVideo(id);
  const { thumbnail_url } = videoData || {};
  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';

  const videoRef = useRef<ReactPlayer>(null);

  const seek = useCallback(
    (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime);
      }
    },
    [videoRef],
  );

  const getTime = useCallback(() => {
    if (videoRef.current?.getCurrentTime) {
      return videoRef.current.getCurrentTime();
    }
    return null;
  }, [videoRef]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [secondsPlayed, setSecondsPlayed] = useState<number>(0);

  const [selectedClipId, setSelectedClipId] = useState<string>('');

  const play = useCallback(
    (seekTime: number, clipId: string) => {
      seek(seekTime);
      setSecondsPlayed(seekTime);
      setPlaying(true);
      setSelectedClipId(clipId);
    },
    [seek, setSecondsPlayed, setPlaying, setSelectedClipId],
  );

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId);

  const onProgress = ({ playedSeconds }: ProgressProps) => {
      setSecondsPlayed(playedSeconds);
  };
  const clipPercent = (progress, startTime, endTime) => {
    if (!progress || !startTime || !endTime) return 0;
    const elapsed = progress - startTime;
    const left = endTime - progress;
    const percent = (elapsed / (elapsed + left)) * 100;
    if (percent > 100) {
      setPlaying(false);
      setSecondsPlayed(endTime);
    }
    return percent;
  };

  // const onProgress = ({ playedSeconds }: ProgressProps) => {
  //   // console.log(playedSeconds )
  //   setSecondsPlayed(playedSeconds);
  // };
  const progress = clipPercent(secondsPlayed, startTime, endTime);
  const clipLength = Math.floor(endTime - startTime);
  const clipTimePlayed = Math.floor(secondsPlayed - startTime);
  return (
    <PageContainer
      // title='Select Clips'
      // extra={
      //   <Button type="primary" icon={<DownloadOutlined />}>
      //     Create Highlight Compilation
      //   </Button>
      // }
      content="Switch on the clips that you would like to use in your compilation video. Click and drag
      clips to re-order them."
      extra={
        <Button
          onClick={() => setPlaying(false)}
          style={{ marginLeft: 24 }}
          type="primary"
          icon={<DownloadOutlined />}
        >
          Combine Selected Clips
        </Button>
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
          {data.algo1 && (
            <Sortable
              selectedClipId={selectedClipId}
              play={play}
              thumbnail={thumbnail}
              arr={data.algo1}
            />
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};
