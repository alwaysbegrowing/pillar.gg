import { useState, useEffect } from 'react';

const msToSec = (ms: number) => ms / 1000;
export const useTime = (isPlaying: boolean, startTime: number) => {
  const intervalInMs = 15;
  const [msPlayed, setMsPlayed] = useState(0);

  const playedSeconds = msPlayed - startTime;

  useEffect(() => {
    const myTimer = () => {
      if (isPlaying) {
        setMsPlayed((t) => t + msToSec(intervalInMs));
      }
    };
    const intervalId = setInterval(myTimer, intervalInMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);
  return { msPlayed, setMsPlayed, playedSeconds };
};
