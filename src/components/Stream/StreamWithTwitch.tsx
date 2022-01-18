import { Button } from 'antd';
import React from 'react';
import { ReactComponent as TwitchSvg } from '../Login/twitch-brands.svg';
import Icon from '@ant-design/icons';

export const TwitchIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;

const StreamWithTwitch = () => (
  <Button href="https://www.twitch.tv/" icon={<TwitchIcon />} type="primary">
    Stream on Twitch
  </Button>
);

export default StreamWithTwitch;