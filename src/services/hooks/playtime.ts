import { useState, useEffect } from 'react';

const msToSec = (ms: number) => ms / 1000;
export const useTime = (isPlaying: boolean, startTime: number) => {
  const intervalInMs = 14;
  const [secPlayed, setSecPlayed] = useState(0);

  const playedSeconds = secPlayed - startTime;

  useEffect(() => {
    const myTimer = () => {
      if (isPlaying) {
        setSecPlayed((t) => t + msToSec(intervalInMs));
      }
    };
    const intervalId = setInterval(myTimer, intervalInMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);
  return { secPlayed, setSecPlayed, playedSeconds };
};
