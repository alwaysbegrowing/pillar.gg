import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';

const twitchClientId = '2nakqoqdxka9v5oekyo6742bmnxt2o';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const Banner5 = (props) => {
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
    <div {...tagProps} {...dataSource.wrapper} onClick={twitchAuth}>
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
        </QueueAnim>
        <TweenOne animation={animType.one} key="title" {...dataSource.image}>
          <img src={dataSource.image.children} width="100%" alt="img" />
        </TweenOne>
      </div>
    </div>
  );
};

export default Banner5;
