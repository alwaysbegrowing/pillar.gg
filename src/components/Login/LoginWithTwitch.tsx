import { Button } from 'antd';
import React from 'react';
import { ReactComponent as TwitchSvg } from './twitch-brands.svg';
import Icon from '@ant-design/icons';
import { twitchClientId } from '@/services/fetcher';

export const TwitchIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;
const redirectURI = `${window.location.origin}/TwitchAuth`;

const openTwitchInNewTab = () =>
  window.open(
    `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read%20moderation:read`,
    '_blank',
  );
const LoginWithTwitch = () => (
  <Button onClick={openTwitchInNewTab} icon={<TwitchIcon />} type="primary">
    Connect to Twitch
  </Button>
);

export default LoginWithTwitch;
