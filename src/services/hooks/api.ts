import { useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { GlobalContext } from '../../ContextWrapper';

interface DbUser {
  display_name: string;
  twitch_id: number;
  _id: string;
}

interface UseDBUserProps {
  data?: DbUser[];
  error?: boolean;
}

const twitchClientId = 'jmyfr3xqjeyjkvzmnbyiexsf5864c1';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const onErrorRetry = (error: any) => {
  if (error.data.status === 401 || error.data.status === 403) {
    return window.open(
      `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
      '_self',
    );
  }
  return null;
};

function useUser() {
  const { twitchId } = useContext(GlobalContext);

  const selfUrl = 'https://api.twitch.tv/helix/users';
  const otherUrl = `https://api.twitch.tv/helix/users?id=${twitchId}`;

  const url = twitchId ? otherUrl : selfUrl;
  const { data, error } = useSWR(url, fetcher, { onErrorRetry });

  return {
    data: data?.data?.[0],
    isLoading: !error && !data,
    isError: error,
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
  const { data: userData } = useUser();
  const { data, error } = useSWR(
    () => `https://api.twitch.tv/helix/videos?first=20&type=archive&user_id=${userData.id}`,
    fetcher,
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
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
