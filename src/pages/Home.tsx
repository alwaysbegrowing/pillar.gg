import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Menu, Dropdown, Button } from 'antd';
// import {useModel } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';
import { random } from 'lodash';

// import styles from './Home.less';

const Home = () => {
  const [titleList, setTitleList] = useState<any[]>([]);
  // const { initialState, setInitialState } = useModel('@@initialState');
  const [selectedVod, setSelectedVod] = useState<any>();
  const [dropdownText, setDropdownText] = useState<any>('Select a VOD');
  const [clipProcessingState, setClipProcessingState] = useState<any>({ status: 'NONE' });

  useEffect(() => {
    fetch('/api/twitch/getVodList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // user_id: initialState!.currentUser!.user_id
        // mock using ludwig's user_id to get good data
        user_id: '5fce7ed8b1514498a4e5e679',
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        var titles: Array<string> = [];
        json.videos.forEach((video) => {
          console.log(video);
          titles.push(video);
        });
        setTitleList(titles);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const checkVod = () => {
    // make post request
    // TODO should probably mvoe this endpoint to /api/service
    console.log(selectedVod);
    fetch('/api/twitch/checkForClips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedVod),
    })
      .then((res) => res.json())
      .then((json) => {
        setClipProcessingState(json);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const submitVod = () => {
    // make post request
    fetch('/api/service/submitVodToQueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedVod),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onClick = ({ key }) => {
    console.log(`Click on item. ` + key);

    // create queue object
    let results = titleList.filter((obj) => {
      return obj.broadcast_id == key;
    });

    let queue_obj = {
      streamer: results[0].channel.name,
      url: results[0].url,
      platform_video_id: results[0].broadcast_id,
    };
    console.log(queue_obj);
    setSelectedVod(queue_obj);
    setClipProcessingState({status: "NONE"})

    // update text in Dropdown menu
    setDropdownText(results[0].title);
  };

  const displayClips = () => {
    console.log(clipProcessingState);
    return (
      <div style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {clipProcessingState.data.map((item) => (
          <Card
            extra={
              <a target="_blank" href={item.s3_url}>
                {'Download'}
              </a>
            }
            style={{ width: 340, padding: 15 }}
            title={'loremIpsum'}
          >
            <video controls width="320" height="240">
              <source src={item.s3_url} type="video/mp4" />
            </video>
          </Card>
        ))}
      </div>
    );
  };

  function setMenu() {
    let submenu = titleList.map((vod_obj) => (
      <Menu.Item key={vod_obj.broadcast_id}>{vod_obj.title}</Menu.Item>
    ));
    let menu = <Menu onClick={onClick}>{submenu}</Menu>;
    return menu;
  }

  return (
    <PageContainer>
      <Card>
        <Dropdown overlay={setMenu()}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {dropdownText} <DownOutlined />
          </a>
        </Dropdown>
        <p> </p>
        {clipProcessingState.status === 'NONE' && (
          <Button onClick={checkVod} type="primary">
            Check VOD
          </Button>
        )}
        {clipProcessingState.status === 'FINISHED' && (
          <div>
            <h2>Here are your clips!</h2> {displayClips()}{' '}
          </div>
        )}
        {clipProcessingState.status === 'DOES_NOT_EXIST' && (
          <div>
            <h2>We don't have any data on this stream yet. </h2> Select another stream, or submit
            this stream for processing.{' '}
            <Button onClick={submitVod} type="primary">
              Process Stream
            </Button>{' '}
          </div>
        )}
        {clipProcessingState.status === 'CLIP_IS_PROCESSING' && (
          <div>
            <h2>Clips are processing. ETA: 10 minutes</h2>
            <Button onClick={checkVod} type="primary">
              Check Again
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Home;
