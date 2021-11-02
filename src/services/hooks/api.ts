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

interface UseDBUserProps {
  data?: DbUser[];
  error?: boolean;
}

function useUser() {
  const { twitchId } = useContext(GlobalContext);

  const selfUrl = 'https://api.twitch.tv/helix/users';
  const otherUrl = `https://api.twitch.tv/helix/users?id=${twitchId}`;

  const url = twitchId ? otherUrl : selfUrl;
  const { data, error, mutate } = useSWR(url, fetcher);

  if (!error && data) {
    const userData = data?.data?.[0];
    FullStory.identify(userData.id, {
      display_name: userData.display_name,
      email: userData.email,
    });
  } else {
    FullStory.anonymize();
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

function useVideos() {
  const { data: userData, isError: isUseUserError } = useUser();
  const { data, error } = useSWR(
    () => `https://api.twitch.tv/helix/videos?first=20&type=archive&user_id=${userData.id}`,
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

export { useUser, useVideos, useVideo, useClips, useDbUsers };
