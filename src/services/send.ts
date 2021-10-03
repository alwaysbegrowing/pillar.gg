import type { IndividualTimestamp } from '../services/hooks/api';
import { getHeaders } from '@/services/fetcher';

export const sendClips = async (
  videoId: string,
  clips: IndividualTimestamp[],
  uploadToYoutube = false,
) => {
  const data = { videoId, clips, uploadToYoutube };
  const prodUrl = 'https://lfh9xm104e.execute-api.us-east-1.amazonaws.com/prod/clips';
  // const qaUrl = "https://jbme5m4076.execute-api.us-east-1.amazonaws.com/prod/clips"
  const resp = await fetch(prodUrl, {
    method: 'POST',
    headers: getHeaders() || undefined,
    body: JSON.stringify(data),
  });

  return resp.ok;
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
