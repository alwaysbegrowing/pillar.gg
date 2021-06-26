import {
  CaretRightOutlined,
  NotificationOutlined,
  PauseOutlined,
  SoundOutlined
} from '@ant-design/icons';
import { Row, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/twitch';

const styles = {
  playerWrapper: {
    paddingTop: '56.25%',
  },

  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  icon: {
    color: '#f1f7fe',
  },
};
interface VideoProps {
  url: string;
  duration: number;
  progress: number;
  videoRef: ReactPlayer;
  controlKeys: boolean;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReady: any;
  onPlay: any;
  onBuffer: any;
  selectedClipId: string;
}
const Video = ({
  url,
  duration,
  progress,
  videoRef,
  playing,
  setPlaying,
  onReady,
  selectedClipId
  
}: VideoProps) => {
  const [muted, setMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  const togglePlaying = () => {
    setPlaying((isPlaying) => !isPlaying);
  };
  const toggleMuted = () => {
    setMuted((isMuted) => !isMuted);
  };

  const onPlayReady = () => {
    onReady();
    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <div style={styles.playerWrapper}>
        {/* @ts-ignore */}
        <ReactPlayer
        key={selectedClipId}
          onReady={onPlayReady}
          style={styles.reactPlayer}
          ref={videoRef}
          height="100%"
          width="100%"
          playing={playing}
          muted={muted}
          url={url}
        />
        <div
          style={{
            width: '100%',
            bottom: 0,
            position: 'absolute',
            display: 'block',
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        >

          <Row justify="space-between" style={{ marginLeft: 16, marginRight: 16, marginBottom: 8 }}>
            <Space size="middle">
              {playing ? (
                <PauseOutlined style={styles.icon} onClick={togglePlaying} />
              ) : (
                <CaretRightOutlined style={styles.icon} onClick={togglePlaying} />
              )}
              {muted ? (
                <NotificationOutlined style={styles.icon} onClick={toggleMuted} />
              ) : (
                <SoundOutlined style={styles.icon} onClick={toggleMuted} />
              )}
              <div style={{ fontSize: 12, color: 'white' }}>{`${Math.round(
                progress,
              )} / ${duration}`}</div>
            </Space>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default Video;
