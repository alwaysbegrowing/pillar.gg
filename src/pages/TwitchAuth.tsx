import React, { useEffect } from 'react';
import { Spin } from 'antd';

// TOOO REMOVE this page and just show the /home page. In the /home page we can show the app skeleton giving the illusion that they aren't waiting
export default () => {
  useEffect(() => {
    const login = async () => {
      // get auth code
      const code = new URLSearchParams(window.location.search).get('code') || '';

      // get access token
      const loginResponse = await fetch(`/api/user/login?code=${code}`);
      const loginResult = await loginResponse.json();
      localStorage.setItem('access_token', loginResult?.access_token ?? '');
      localStorage.setItem('refresh_token', loginResult?.refresh_token ?? '');
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
