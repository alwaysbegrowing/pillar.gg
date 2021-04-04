import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips } from '../services/hooks/api';
import { List, Button, Row } from 'antd';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useParams } from 'umi';

interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface ClipProps {
  id: number;
  startTime: number;
  endTime: number;
}

const seek = (ref: any, seekTime: number) => {
  if (ref.current) {
    ref.current.seekTo(seekTime);
  }
};

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [clipIndex, setClipIndex] = useState<number>(0);

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  const play = (item: ClipProps, i: number) => {
    const { startTime } = item;
    seek(videoRef, startTime);
    setClipIndex(i);
    setPlaying(true);
  };
  const onProgress = ({ playedSeconds }: ProgressProps) => {
    const secondsLeftOnClip = data[clipIndex].endTime - playedSeconds;
    if (secondsLeftOnClip <= 1) {
      if (clipIndex + 1 === data.length) {
        setPlaying(false);
      } else {
        seek(videoRef, data[clipIndex + 1].startTime);
        setClipIndex((index) => index + 1);
      }
    }
  };
  return (
    <div>
      <Row justify="center">
        <ReactPlayer
          controls
          playing={playing}
          onReady={() => {
            seek(videoRef, data[0].startTime);
          }}
          // not working https://github.com/cookpete/react-player/issues/1206
          progressInterval={100}
          onProgress={onProgress}
          ref={videoRef}
          url={`https://twitch.tv/videos/${id}`}
        />
      </Row>

      <Row justify="center" style={{ marginTop: 24 }}>
        <List
          grid={{ gutter: 8 }}
          dataSource={data}
          renderItem={(item: any, i) => {
            const selected = clipIndex === i && playing;
            return (
              <List.Item>
                <Card title={`Clip ${i + 1}`}>
                  <Button onClick={() => play(item, i)}>{selected ? 'Playing' : 'View'}</Button>
                </Card>
              </List.Item>
            );
          }}
        />
      </Row>
      <Row justify="center">
        <Button type="primary" icon={<DownloadOutlined />}>
          Download Clips
        </Button>
      </Row>
    </div>
  );
};
