import type { IndividualTimestamp } from '../services/hooks/api';
import { getHeaders } from '@/services/fetcher';
import { MOBILE_EXPORT_URL, CLIP_EXPORT_URL } from '@/constants/apiUrls';

export const sendClips = async (
  videoId: string,
  clips: IndividualTimestamp[],
  uploadToYoutube = false,
) => {
  const data = { videoId, clips, uploadToYoutube };
  const resp = await fetch(CLIP_EXPORT_URL, {
    method: 'POST',
    headers: getHeaders() || undefined,
    body: JSON.stringify(data),
  });

  return resp.ok;
};

interface ClipTimes {
  startTime: number;
  endTime: number;
}

interface CropConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  res_x: number;
  res_y: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface CropConfigs {
  [key: string]: CropConfig;
}

export const sendMobileClip = async (
  videoId: string,
  clip: ClipTimes,
  cropConfigs: CropConfigs,
  upscale: boolean = true,
) => {
  const body: any = {
    ClipData: {
      videoId,
      upscale,
      clip,
    },
    Outputs: cropConfigs,
  };

  const resp = await fetch(MOBILE_EXPORT_URL, {
    method: 'POST',
    headers: getHeaders() || undefined,
    body: JSON.stringify(body),
  });

  return resp;
};

export const sendHubspotEvent = async (
  twitchId: string | number,
  eventName: string = 'MAJOR_EVENT',
  videoId: string | number = '',
  additionalProperties: any = {},
) => {
  const apiUrl = `/api/hubspot/event`;

  const resp = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      contactProperties: {
        ...additionalProperties,
        videoId,
      },
      eventName,
      twitchId,
    }),
    headers: getHeaders() || undefined,
  });

  return resp.ok;
};
