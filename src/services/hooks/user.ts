import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';

function useUser() {
  const { data, error, mutate } = useSWR('https://api.twitch.tv/helix/users', fetcher);
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

export { useUser };
