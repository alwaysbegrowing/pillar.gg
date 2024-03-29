import { useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { GlobalContext } from '../../ContextWrapper';
import * as FullStory from '@fullstory/browser';

interface DbUser {
  display_name: string;
  twitch_id: number;
  _id: string;
}

interface DbModerator {
  user_name: string;
  twitch_id: number;
  mod_for: [{ id: number; display_name: string }];
  _id: string;
}

interface UseDBUserProps {
  data?: DbUser[];
  error?: boolean;
}

interface UseModeratorProps {
  data?: DbModerator;
  error?: boolean;
}

function useUser() {
  const { twitchId } = useContext(GlobalContext);

  const selfUrl = 'https://api.twitch.tv/helix/users';
  const otherUrl = `https://api.twitch.tv/helix/users?id=${twitchId}`;

  const url = twitchId ? otherUrl : selfUrl;
  const { data, error, mutate } = useSWR(url, fetcher);

  if (!error && data) {
    const userData = data.data?.[0];
    FullStory.identify(userData.id, {
      display_name: userData.display_name,
      email: userData.email,
    });
  }

  return {
    data: data?.data?.[0],
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}

function useDbUsers() {
  const { data, error }: UseDBUserProps = useSWR('/api/users', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useModerators() {
  const { data: userData, isError: userError } = useUser();

  const { data, error }: UseModeratorProps = useSWR(
    userData ? `/api/moderators/${userData.id}` : null,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data && !userError,
    isError: error || userError,
  };
}

export interface VideoOptions {
  after?: string;
  before?: string;
  first?: number;
  language?: string;
  period?: string;
  sort?: string;
  type?: string;
}

function useVideos(options: VideoOptions = {}) {
  const { after, before, first, language, period, sort, type } = options;
  const afterString = after ? `&after=${after}` : '';
  const beforeString = before ? `&before=${before}` : '';
  const firstString = first ? `&first=${first}` : '&first=100';
  const languageString = language ? `&language=${language}` : '';
  const periodString = period ? `&period=${period}` : '';
  const sortString = sort ? `&sort=${sort}` : '';
  const typeString = type ? `&type=${type}` : '&type=archive';
  const { data: userData, isError: isUseUserError } = useUser();
  const { data, error } = useSWR(
    () =>
      `https://api.twitch.tv/helix/videos?user_id=${userData.id}${afterString}${beforeString}${firstString}${languageString}${periodString}${sortString}${typeString}`,
    fetcher,
  );
  console.log({ error });

  return {
    data: data?.data,
    isLoading: !error && !data && !isUseUserError,
    isError: error || isUseUserError,
  };
}

function useVideo(id: string | number) {
  const { data, error } = useSWR(
    () => `https://api.twitch.tv/helix/videos?first=20&type=archive&id=${id}`,
    fetcher,
  );

  return {
    data: data?.data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
}

export interface Banner {
  sourceAttribution: string;
  color: string;
}

export interface IndividualTimestamp {
  banner?: Banner;
  startTime: number;
  endTime: number;
  selected?: boolean;
  thumbnail_url: string;
  type: 'ai' | 'manual' | 'ccc';
  verifiedTwitch?: boolean;
  id: string;
  title?: string;
  view_count?: number;
  duration?: number;
  creator_name?: string;
}

interface TimestampStructure {
  videoId: string;
  _id: string;
  clips: IndividualTimestamp[];
}

interface UseClipsDataProps {
  data?: TimestampStructure;
  error?: boolean;
}

function useClips(clipId: number | string | undefined) {
  const { data, error }: UseClipsDataProps = useSWR(
    clipId ? () => `/api/timestamps/${clipId}` : null,
    fetcher,
  );

  return {
    data: data?.clips,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser, useVideos, useVideo, useClips, useDbUsers, useModerators };
