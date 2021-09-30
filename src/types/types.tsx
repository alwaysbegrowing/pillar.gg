import type { IndividualTimestamp } from '@/services/hooks/api';
import type { LegacyRef } from 'react';
import type TwitchPlayer from 'react-player/twitch';

export interface VideoPlayerProps {
  url: string;
  duration: number;
  progress: number;
  videoRef: LegacyRef<TwitchPlayer>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReady: any;
}

export interface ClipListProps {
  clipIdInfo: { selectedClipId: string; setSelectedClipId: any };
  play: (timestamp: number, clipId: string) => any;
  thumbnail: string;
  clipInfo: { clips: IndividualTimestamp[]; setClips: any };
  videoId: string;
  thumbnails?: any[];
}
