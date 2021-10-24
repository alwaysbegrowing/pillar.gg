import { Button } from 'antd';
import React from 'react';

const twitchClientId = 'jmyfr3xqjeyjkvzmnbyiexsf5864c1';
const redirectURI = `${window.location.origin}/TwitchAuth`;
const twitchLogin = () =>
  window.open(
    `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
    '_self',
  );
const LoginWithTwitch = () => (
  <Button onClick={twitchLogin} type="primary">
    Connect to Twitch
  </Button>
);

export default LoginWithTwitch;
