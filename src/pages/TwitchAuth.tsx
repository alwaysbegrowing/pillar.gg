import React, { useEffect } from 'react';
import { Spin } from 'antd';
import * as FullStory from '@fullstory/browser';
import { twitchClientId } from '@/services/fetcher';

// TOOO REMOVE this page and just show the /home page. In the /home page we can show the app skeleton giving the illusion that they aren't waiting
export default () => {
  useEffect(() => {
    const login = async () => {
      // get auth code
      const code = new URLSearchParams(window.location.search).get('code') || '';

      // get access token
      const loginResponse = await fetch(`/api/user/login?code=${code}`);
      const loginResult = await loginResponse.json();
      const accessToken = loginResult?.access_token;
      localStorage.setItem('access_token', accessToken ?? '');

      if (accessToken) {
        // get user info
        const userResponse = await fetch('https://api.twitch.tv/helix/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-ID': twitchClientId,
          },
        });
        const { data } = await userResponse.json();
        const userData = data?.[0];

        if (userData) {
          FullStory.identify(userData.id, {
            display_name: userData.display_name,
            email: userData.email,
          });
        }
      }

      window.close();
    };

    login();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: 100 }}>
      <Spin size="large" />
    </div>
  );
};
