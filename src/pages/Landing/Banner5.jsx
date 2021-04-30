import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useUser } from '../../services/hooks/api';
import { history } from 'umi';

const twitchClientId = '2nakqoqdxka9v5oekyo6742bmnxt2o';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const Banner5 = () => {
  const { data: userData } = useUser();

  const { display_name } = userData || {};
  const buttonText = display_name ? `Log in as ${display_name}` : 'Log in with Twitch';

  const twitchAuth = () => {
    if (userData) {
      history.push('/videos');
    } else {
      window.open(
        `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
        '_self',
      );
    }
  };

  useEffect(() => twitchAuth());
  return (
    <Button block size="large" type="primary" onClick={twitchAuth}>
      {buttonText}
    </Button>
  );
};

export default Banner5;
