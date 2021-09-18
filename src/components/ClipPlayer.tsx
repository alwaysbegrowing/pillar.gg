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
      setIsPlaying(true);
      // this pointless line is to hack a fix twitch bug where you can't seek while paused
      // this is the same reason we are calling setPlaying before seeking
      // https://github.com/cookpete/react-player/issues/924
      await new Promise((resolve) => setTimeout(resolve, 10));
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
