import type { IndividualTimestamp } from '@/services/hooks/api';
import type { LegacyRef } from 'react';
import type TwitchPlayer from 'react-player/twitch';
import type Stages from '@/components/MobileExporter/Stages';
import type { Banner } from '@/services/hooks/api';

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
  clipInfo: { clips: IndividualTimestamp[]; setClips: any };
  videoId: string;
}

export interface SortableClipCardProps {
  play: () => any;
  banner?: Banner;
  selectedClipId: string;
  id: string;
  setClips: any;
  cardNumber: number;
  thumbnail: string;
  timestamp: IndividualTimestamp;
  videoId: string | number;
  isSelected: boolean;
}

export interface VodCardProps {
  thumbnail_url: string;
  title: string;
  description: string;
  duration: number;
  view_count: number;
  url: string;
  published_at: any;
  id: number;
}

export interface PromptProps {
  title: string;
  text: string;
  buttonText: string;
  onNext: () => any;
}

export interface TemplateCardProps {
  template: { name: string; description: string };
  onClick: () => any;
}

export interface TemplateSelectorProps {
  onSelect: (template: any) => any;
  stage: Stages;
}
