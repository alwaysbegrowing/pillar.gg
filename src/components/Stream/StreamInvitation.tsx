import React from 'react';
import StreamWithTwitch, { TwitchIcon } from '../Stream/StreamWithTwitch';
import { Result } from 'antd';

const StreamInvitation = () => (
  <Result
    icon={<TwitchIcon />}
    title="Please stream with Twitch"
    subTitle={
      'The selected Twitch account currently has no videos'
    }
    extra={<StreamWithTwitch />}
  />
);

export default StreamInvitation;