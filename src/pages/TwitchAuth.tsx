import { useEffect } from 'react';
import { history } from 'umi';

export default () => {
  useEffect(() => {
    const login = async () => {
      const code = new URLSearchParams(window.location.search).get('code') || '';
      const resp = await fetch(`/api/user/login?code=${code}`);
      const result = await resp.json();
      localStorage.setItem('access_token', result.access_token);
      history.push('/home');
    };
    login();
  }, []);

  return 'loading...';
};
