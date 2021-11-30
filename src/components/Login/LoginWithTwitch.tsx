import { Button } from 'antd';
import React from 'react';
import { ReactComponent as TwitchSvg } from './twitch-brands.svg';
import Icon from '@ant-design/icons';
import { login } from '../../services/auth';

export const TwitchIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;

const LoginWithTwitch = () => (
  <Button onClick={login} icon={<TwitchIcon />} type="primary">
    Connect to Twitch
  </Button>
);

export default LoginWithTwitch;
