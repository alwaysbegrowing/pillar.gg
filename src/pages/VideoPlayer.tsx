import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips, useVideo } from '../services/hooks/api';
import { List, Button, Row, PageHeader } from 'antd';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Sortable from '../components/Sortable';
import { PageContainer } from '@ant-design/pro-layout';

import { useParams } from 'umi';

// interface ProgressProps {
//   played: number;
//   playedSeconds: number;
//   loaded: number;
//   loadedSeconds: number;
// }

interface ClipProps {
  id: number;
  startTime: number;
  endTime: number;
}

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);
const ClipRow = ({ play, algorithmClips, clipIndex, playing }: any) => (
  <Row justify="center" style={{ marginTop: 24 }}>
    <List
      grid={{ gutter: 8 }}
      dataSource={algorithmClips}
      renderItem={(item: any, i) => {
        const selected = clipIndex === i && playing;
        return (
          <List.Item>
            <Card
              // title={`Clip ${i + 1}`}
              actions={[
                <Button onClick={() => play(item, i)}>{selected ? 'Playing' : 'View'}</Button>,
              ]}
            >
              <div>{toTime(item.startTime)}</div>
              <div>{toTime(item.endTime)}</div>
            </Card>
          </List.Item>
        );
      }}
    />
    <Button style={{ marginLeft: 8 }} icon={<DownloadOutlined />}>
      Download
    </Button>
  </Row>
);

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);

  const { data: videoData } = useVideo(id);
  const { thumbnail_url } = videoData || {};
  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '108').replace('%{height}', '60')
    : '';



  const videoRef = useRef<ReactPlayer>(null);

  const seek = (seekTime: number) => {
    if (videoRef.current?.seekTo) {
      videoRef.current.seekTo(seekTime);
    }
  };

  const [playing, setPlaying] = useState<boolean>(false);
  const [clipIndex, setClipIndex] = useState<number>(0);

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  const play = (seekTime: number) => {
    seek(seekTime);
    setPlaying(true);
  };
  // const onProgress = ({ playedSeconds }: ProgressProps) => {
  //   const secondsLeftOnClip = data[clipIndex].endTime - playedSeconds;
  //   if (secondsLeftOnClip <= 1) {
  //     if (clipIndex + 1 === data.length) {
  //       setPlaying(false);
  //     } else {
  //       seek(videoRef, data[clipIndex + 1].startTime);
  //       setClipIndex((index) => index + 1);
  //     }
  //   }
  // };
  return (

    <PageContainer extra={<Button type='primary' icon={<DownloadOutlined />}>
    Create Highlight Compilation
  </Button>}>

      <Row >
        <ReactPlayer
          controls
          playing={playing}
          onReady={() => {
            seek(Object.values(data)[0].startTime);
          }}
          // not working https://github.com/cookpete/react-player/issues/1206
          progressInterval={100}
          // onProgress={onProgress}
          ref={videoRef}
          url={`https://twitch.tv/videos/${id}`}
        />
      </Row>
      <Row style={{marginTop: 24}}>
      {data.algo1 && <Sortable play={play} thumbnail={thumbnail} arr={data.algo1} />}
      </Row>
      
   
      </PageContainer>

  );
};
