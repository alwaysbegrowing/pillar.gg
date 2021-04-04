import React, { useEffect } from 'react';
import { history } from 'umi';
import { Spin } from 'antd';

// TOOO REMOVE this page and just show the /home page. In the /home page we can show the app skeleton giving the illusion that they aren't waiting
export default () => {
  useEffect(() => {
    const login = async () => {
      const code = new URLSearchParams(window.location.search).get('code') || '';
      const resp = await fetch(`/api/user/login?code=${code}`);
      const result = await resp.json();
      localStorage.setItem('access_token', result.access_token);
      history.push('/videos');
    };
    login();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: 100 }}>
      <Spin size="large" />
    </div>
  );
};
