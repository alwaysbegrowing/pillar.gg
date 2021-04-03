import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';


// gorc id 108268890
// liihs id 73626243
const initialData = {
  data: [
    {
      broadcaster_type: '',
      created_at: '2016-07-05T19:34:03.369972Z',
      description: 'Check out pillar.gg for automatic stream compilations ',
      display_name: 'gorc_test',
      email: 'rratcliffe57@gmail.com',
      id: '108268890',
      login: 'lii',
      offline_image_url: '',
      profile_image_url:
        'https://static-cdn.jtvnw.net/jtv_user_pictures/f83f925f-753b-419c-ae11-e91ce7b40b19-profile_image-300x300.png',
      type: '',
      view_count: 13,
    },
  ],
};

const mockOptions = {
  initialData,
  revalidateOnConnect: false,
  revalidateOnFocus: false,
};

function useUser() {
  const { data, error, mutate } = useSWR('https://api.twitch.tv/helix/users', fetcher, mockOptions);
  // const access_token = localStorage.getItem('access_token');
  // useEffect(() => {
  //   mutate();
  // }, [access_token, mutate]);
  return {
    data: data?.data?.[0],
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

function useClips(clipId: number) {
  const { data, error } = useSWR(() => `/api/timestamps/${clipId}`, fetcher);

  return {
    data: data?.clips1,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser, useVideos, useClips };
