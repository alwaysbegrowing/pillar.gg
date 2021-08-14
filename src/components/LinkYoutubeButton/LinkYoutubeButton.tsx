import React from 'react';
import { useUser } from '@/services/hooks/api';

const verifyYoutube = async (id: number) => {
  const resp = await fetch(`/api/youtube/isAuthValid?state=${id}`);
  if (resp.status === 401) {
    window.open(`/api/youtube/callback?state=${id}`, '_blank');
  }
  if (resp.status === 200) {
    console.log('user is already authed with YT!')
  }
};

export default function LinkYoutubeButton() {
  const { data } = useUser();
  return (
    <button onClick={() => verifyYoutube(data?.id)} type="button">
      Upload to Youtube
    </button>
  );
}
