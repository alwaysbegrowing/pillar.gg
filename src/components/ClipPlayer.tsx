import React, { useCallback, useRef, useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/twitch';
import { ClipContext } from '@/services/contexts/ClipContext';
import { useTime } from '@/services/hooks/playtime';

const ClipPlayer = ({ style, height, width, onReady }) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { startTime, endTime, source } = useContext(ClipContext);
  const { setSecPlayed, isClipOver } = useTime(isReady && isPlaying, startTime, endTime);

  const seek = useCallback(
    async (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime, 'seconds');
        setIsPlaying(true);
      }
    },
    [videoRef],
  );

  useEffect(() => {
    console.log(videoRef.current);
    if (isClipOver) {
      seek(startTime);
      setSecPlayed(startTime);
    }
  }, [isClipOver, seek, setSecPlayed, startTime]);

  return (
    <ReactPlayer
      key={source}
      onReady={(player) => {
        setIsReady(true);
        seek(startTime);
        if (onReady) {
          onReady(player);
        }
      }}
      style={style}
      ref={videoRef}
      height={height || '100%'}
      width={width || '100%'}
      playing={isPlaying}
      muted={true}
      url={source}
      loop={true}
    />
  );
};

export default ClipPlayer;
