import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useUser } from '../../services/hooks/api';
import { history } from 'umi';

const twitchClientId = 'phpnjz4llxez4zpw3iurfthoi573c8';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const Banner5 = () => {
  const { data: userData } = useUser();

  const { display_name } = userData || {};
  const buttonText = display_name ? `Log in as ${display_name}` : 'Authenticating through Twitch...';

  const twitchAuth = () => {
    history.push('/vods/1090059618')
    // localStorage.setItem('vod_redirect_url', window.location.pathname);
    // if (userData) {
      // history.push('/vods');
    // } else {
      // window.open(
        // `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
        // '_self',
      // );
    // }
  };

  useEffect(() => twitchAuth());
  return (
    <Button block size="large" type="primary" onClick={twitchAuth}>
      {buttonText}
    </Button>
  );
};

export default Banner5;
