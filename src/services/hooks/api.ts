import { useEffect, useContext, useMemo } from 'react';
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

function useUser() {
  const { twitchId } = useContext(GlobalContext);

  const selfUrl = 'https://api.twitch.tv/helix/users';
  const otherUrl = `https://api.twitch.tv/helix/users?id=${twitchId}`;

  const url = twitchId ? otherUrl : selfUrl;
  const { data, error, mutate } = useSWR(url, fetcher);
  const access_token = localStorage.getItem('access_token');
  useEffect(() => {
    mutate();
  }, [access_token, mutate]);
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

export interface IndividualTimestamp {
  startTime: number;
  endTime: number;
  selected?: boolean;
  verifiedTwitch?: boolean;
}

interface Algorithm {
  algo1: IndividualTimestamp[];
  algo2?: IndividualTimestamp[];
  algo3?: IndividualTimestamp[];
  algo4?: IndividualTimestamp[];
  algo5?: IndividualTimestamp[];
  brain: IndividualTimestamp[];
}

export interface IndividualThumbnail {
  string: any;
}

interface ThumbnailData {
  thumbnail: IndividualThumbnail;
}

interface TimestampStructure {
  videoId: string;
  _id: string;
  clips: Algorithm;
  ccc: IndividualTimestamp[];
  thumbnails: ThumbnailData[];
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
  const alldata = useMemo(() => ({ ...data?.clips, ccc: data?.ccc, thumbnails: data?.thumbnails }), [JSON.stringify(data)]);

  return {
    data: alldata,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser, useVideos, useVideo, useClips, useDbUsers };
