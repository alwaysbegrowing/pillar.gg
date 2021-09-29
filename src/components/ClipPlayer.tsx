import React, { useCallback, useRef, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player/twitch';
import { ClipContext } from '@/services/contexts/ClipContext';
import { useTime } from '@/services/hooks/playtime';

const ClipPlayer = ({ style, height, width, onReady, play }) => {
  const videoRef = useRef<ReactPlayer>(null);
  const { startTime, endTime, source } = useContext(ClipContext);
  const { setSecPlayed, isClipOver } = useTime(play, startTime, endTime);

  const seek = useCallback(
    async (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime, 'seconds');
      }
    },
    [videoRef],
  );

  useEffect(() => {
    if (isClipOver) {
      seek(startTime);
      setSecPlayed(startTime);
    }
  }, [isClipOver, seek, setSecPlayed, startTime]);

  const onPlayerReady = () => {
    seek(startTime);
    if (onReady) {
      onReady();
    }
  };

  return (
    <ReactPlayer
      key={source}
      onReady={onPlayerReady}
      style={style}
      ref={videoRef}
      height={height || '100%'}
      width={width || '100%'}
      playing={play}
      muted={true}
      url={source}
      loop={true}
    />
  );
};

export default ClipPlayer;
