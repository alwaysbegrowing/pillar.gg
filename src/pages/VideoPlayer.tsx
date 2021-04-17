import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips, useVideo } from '../services/hooks/api';
import { List, Button, Row, Col, PageHeader, Slider, Progress } from 'antd';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Sortable from '../components/Sortable';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './VideoPlayer.less';
import { useParams } from 'umi';

interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const getStartEndTimeFromClipId = (clipId: string) => clipId.split('-');

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);

  const { data: videoData } = useVideo(id);
  const { thumbnail_url } = videoData || {};
  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';

  const videoRef = useRef<ReactPlayer>(null);

  const seek = (seekTime: number) => {
    if (videoRef.current?.seekTo) {
      videoRef.current.seekTo(seekTime);
    }
  };

  const [playing, setPlaying] = useState<boolean>(false);
  const [secondsPlayed, setSecondsPlayed] = useState<number>(0);

  const [selectedClipId, setSelectedClipId] = useState<string>('');
  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';
  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId);
  // const offset = endTime - startTime;

  const clipPercent = (progress, startTime, endTime) => {
    if (!progress || !startTime || !endTime) return 0;
    const elapsed = progress - startTime;
    const left = endTime - progress;
    const percent = (elapsed / (elapsed + left)) * 100;
    if (percent > 100) {
      setPlaying(false);
      setSecondsPlayed(endTime)
    }
    return percent;
  };

  const play = (seekTime: number, clipId: string) => {
    seek(seekTime);
    setSecondsPlayed(seekTime);
    setPlaying(true);
    setSelectedClipId(clipId);
  };
  const onProgress = ({ playedSeconds }: ProgressProps) => {
    // console.log(playedSeconds )
    setSecondsPlayed(playedSeconds);
  };
  return (
    <PageContainer
      title={false}
      // extra={
      //   <Button type="primary" icon={<DownloadOutlined />}>
      //     Create Highlight Compilation
      //   </Button>
      // }
      // content="Select the clips that you would like to use in your compilation video. Click and drag clips to re-order them."
      footer={
        <>
          Switch on the clips that you would like to use in your compilation video. Click and drag
          clips to re-order them.
          <Button
            onClick={() => setPlaying(false)}
            style={{ marginLeft: 24 }}
            type="primary"
            icon={<DownloadOutlined />}
          >
            Combine Selected Clips
          </Button>
        </>
      }
    >
      <Row justify="center" gutter={24}>
        <Col span={10} style={{ marginBottom: 24 }}>
          <div onClick={() => console.log('clicky')} className={styles.wrapper}>
            <ReactPlayer
              className={styles.player}
              width="100%"
              height="100%"
              // controls
              playing={playing}
              // onReady={() => {
              //   seek(Object.values(data)[0].startTime);
              // }}
              // playsinline
              muted={false}
              // not working https://github.com/cookpete/react-player/issues/1206
              progressInterval={100}
              onProgress={onProgress}
              ref={videoRef}
              url={`https://twitch.tv/videos/${id}`}
            />
          </div>
          <div>

            <Slider value={clipPercent(secondsPlayed, startTime, endTime)} />
          </div>
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
