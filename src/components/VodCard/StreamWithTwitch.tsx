import { Button } from 'antd';
import React from 'react';
import { ReactComponent as TwitchSvg } from '../Login/twitch-brands.svg';
import Icon from '@ant-design/icons';

export const TwitchIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;

const StreamWithTwitch = () => (
  <Button icon={<TwitchIcon />} type="primary">
    Stream with Twitch
  </Button>
);

export default StreamWithTwitch;