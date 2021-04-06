import { useEffect, useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { GlobalContext } from '../../ContextWrapper';

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
  const { data, error } = useSWR('/api/users', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useVideos() {
  const { data: userData } = useUser();
  // gorc id 108268890
  // liihs id 73626243
  // const userData = { id: 73626243 };
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

function useClips(clipId: number | string | undefined) {
  const { data, error } = useSWR(clipId ? () => `/api/timestamps/${clipId}` : null, fetcher);

  return {
    data: data?.clips1,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser, useVideos, useClips, useDbUsers };
