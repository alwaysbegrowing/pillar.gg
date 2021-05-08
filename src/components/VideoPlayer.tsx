import {
  CaretRightOutlined,
  NotificationOutlined,
  PauseOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Row, Slider, Space, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
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
  onProgress: any;
  videoRef: ReactPlayer;
  controlKeys: boolean;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
const Video = ({
  url,
  duration,
  progress,
  onProgress,
  videoRef,
  controlKeys,
  playing,
  setPlaying,
}: VideoProps) => {
  const [muted, setMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleEnter = useCallback(
    (event) => {
      const { code } = event;
      if (code === 'Space' && controlKeys) {
        event.preventDefault();
        setPlaying((isPlaying) => !isPlaying);
      }
    },
    [setPlaying, controlKeys],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [controlKeys, handleEnter]);

  useEffect(() => {
    setIsLoading(false);
  }, [url]);

  const togglePlaying = () => {
    setPlaying((isPlaying) => !isPlaying);
  };
  const toggleMuted = () => {
    setMuted((isMuted) => !isMuted);
  };

  return (
    <Spin spinning={!isLoading}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={styles.playerWrapper}
      >
        <ReactPlayer
          onReady={() => setIsLoading(true)}
          style={styles.reactPlayer}
          ref={videoRef}
          height="100%"
          width="100%"
          playing={playing}
          muted={muted}
          onProgress={onProgress}
          url={url}
        />
        <div
          style={{
            width: '100%',
            bottom: 0,
            position: 'absolute',
            display: hover || !playing ? 'block' : 'none',
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        >
          <Slider
            style={{
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 0,
              paddingTop: 4,
              paddingBottom: 4,
            }}
            max={duration}
            value={progress}
          />

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
              <div style={{ fontSize: 12, color: 'white' }}>{`${progress} / ${duration}`}</div>
            </Space>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default Video;
