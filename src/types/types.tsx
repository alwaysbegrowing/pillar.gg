import type { LegacyRef } from 'react';
import type TwitchPlayer from 'react-player/twitch';

export interface VideoProps {
  url: string;
  duration: number;
  progress: number;
  videoRef: LegacyRef<TwitchPlayer>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReady: any;
}
