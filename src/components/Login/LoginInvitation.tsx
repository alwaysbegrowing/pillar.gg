import React from 'react';
import LoginWithTwitch, { TwitchIcon } from './LoginWithTwitch';
import { Result } from 'antd';

const LoginInvitation = () => (
  <Result
    icon={<TwitchIcon />}
    title="Please Connect your Twitch Account"
    subTitle={
      'Your twitch account is needed to see which VODs you have access to & to export your clips'
    }
    extra={<LoginWithTwitch />}
  />
);

export default LoginInvitation;
