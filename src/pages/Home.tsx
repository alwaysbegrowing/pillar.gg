import React, {useState, useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import {useModel } from 'umi';
// import styles from './Home.less';
import YoutubeAuthPortal from '../components/AuthPortal/YoutubeAuthPortal';
import LinkYoutubeButton from '../components/LinkYoutubeButton/LinkYoutubeButton';

const Home = () => {

  const [openYoutubeAuthPortal, toggleYoutubeAuthPortal] = useState(false);
  const [shouldShowLinkButton, toggleLinkButton] = useState(true);
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    console.log(initialState?.currentUser);
    getYoutubeSyncStatus();
    window.onmessage = (event: any) => {
      if (event.data.success) {
        fetch('/api/youtube/postUserYTToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: initialState!.currentUser!.user_id,
            code: event.data.code,
          }),
        })
        .then((res) => {
          if(res.status === 200) {
            let currentUser = initialState?.currentUser;
            if(currentUser?.youtubeLinked === false) {
              currentUser.youtubeLinked = true;
              // non-null assertation operator is appropriate because
              // this page can't be reached without initial state being set
              setInitialState({...initialState!, currentUser});
            }
          }
        });
      }
    };
  })

  useEffect(() => {
    toggleYoutubeAuthPortal(false);
  }, [openYoutubeAuthPortal])

  function getYoutubeSyncStatus() {
    // button will not show if current user has youtube account linked
    if(initialState?.currentUser?.youtubeLinked) {
      toggleLinkButton(false);
    }
    else {
      toggleLinkButton(true);
    }
  }

  function toggleAuthPortal() {
    toggleYoutubeAuthPortal(true);
  }

    return (
      <PageContainer>
        <Card>
          <h1>Welcome to ClipClock</h1>
            { shouldShowLinkButton && <LinkYoutubeButton onClick={() => toggleAuthPortal()} /> }
          {openYoutubeAuthPortal && <YoutubeAuthPortal />}
        </Card>
      </PageContainer>
    );
  }

export default Home;
