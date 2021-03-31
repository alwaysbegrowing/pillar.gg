import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';
import { Button } from 'antd';
import { useModel } from 'umi';

const twitchClientId = '2nakqoqdxka9v5oekyo6742bmnxt2o';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const Banner5 = (props) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const { display_name } = currentUser;
  const buttonText = display_name ? `Log in as ${display_name}` : 'Log in with Twitch';

  const twitchAuth = () => {
    window.open(
      `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
      '_self',
    );
  };
  const { ...tagProps } = props;
  const { dataSource } = tagProps;

  delete tagProps.dataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: 'bottom',
    one: {
      y: '+=30',
      opacity: 0,
      type: 'from',
      ease: 'easeOutQuad',
    },
  };

  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.childWrapper}
          componentProps={{
            md: dataSource.childWrapper.md,
            xs: dataSource.childWrapper.xs,
          }}
        >
          {dataSource.childWrapper.children.map(getChildrenToRender)}
          <Button block size="large" type="primary" onClick={twitchAuth}>
            {buttonText}
          </Button>
        </QueueAnim>
        <TweenOne animation={animType.one} key="title" {...dataSource.image}>
          <img src={dataSource.image.children} width="100%" alt="img" />
        </TweenOne>
      </div>
    </div>
  );
};

export default Banner5;
