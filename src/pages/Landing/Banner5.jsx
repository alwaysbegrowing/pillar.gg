import React, {useState, useEffect} from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { history, useModel } from 'umi';
import { getChildrenToRender } from './utils';
import TwitchAuthPortal from '../../components/AuthPortal/TwitchAuthPortal';

// This class contains the "Connect With Twitch" button that triggers Twitch OAuth
const Banner5 = (props) => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const [ openTwitchAuthPortal, setPortalStatus ] = useState(false);

  function toggleAuthPortal() {
     setPortalStatus(true);
  }

  useEffect(() => {
    if (initialState.currentUser) {
      history.push('/home');
    }
    window.onmessage = (event) => {
      if (event.data.success) {
        fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: event.data.code,
          redirect: 'follow',
        })
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            const currentUser = {
              avatar: result.avatar,
              name: result.name,
              user_id: result.user_id,
              access: result.access,
              youtubeLinked: result.youtubeLinked
            }
            localStorage.setItem('twitch_access_token', result.twitch_access_token);
            setInitialState({...initialState, currentUser});
            history.push('/home');
          }
        });
      }
    };
  })

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
    <div {...tagProps} {...dataSource.wrapper} onClick={() => toggleAuthPortal()}>
      {openTwitchAuthPortal && <TwitchAuthPortal />}
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
}

export default Banner5;
