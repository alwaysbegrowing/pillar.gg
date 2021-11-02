import React, { useEffect } from 'react';
import { Spin } from 'antd';
// import { useUser } from '@/services/hooks/api';
// import * as FullStory from '@fullstory/browser';

// TOOO REMOVE this page and just show the /home page. In the /home page we can show the app skeleton giving the illusion that they aren't waiting
export default () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code') ?? '';

    fetch(`/api/user/login?code=${code}`)
      .then((response) => response.json())
      .then((result) => localStorage.setItem('access_token', result.access_token))
      .then(() => {
        // get twitch user data
        // { data, error } = useUser();

        // if (error) { throw error }
        // else {}
        // identify FullStory user

        window.close();
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: 100 }}>
      <Spin size="large" />
    </div>
  );
};
