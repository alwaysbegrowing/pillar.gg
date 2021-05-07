import { Spin } from 'antd';
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
  onProgress: any;
  videoRef: ReactPlayer;
  controlKeys: boolean;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
const Video = ({ url, onProgress, videoRef, playing }: VideoProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [url]);

  return (
    <Spin spinning={!isLoading}>
      <div style={styles.playerWrapper}>
        <ReactPlayer
          onReady={() => setIsLoading(true)}
          style={styles.reactPlayer}
          ref={videoRef}
          height="100%"
          width="100%"
          playing={playing}
          controls
          onProgress={onProgress}
          url={url}
        />
      </div>
    </Spin>
  );
};

export default Video;
