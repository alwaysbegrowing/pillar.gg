import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Menu, Dropdown, Button } from 'antd';
// import {useModel } from 'umi';
import { DownOutlined } from '@ant-design/icons';

// import styles from './Home.less';

const Home = () => {


  const [titleList, setTitleList] = useState<any[]>([]);
  // const { initialState, setInitialState } = useModel('@@initialState');
  const [selectedVod, setSelectedVod] = useState<any>();
  const [dropdownText, setDropdownText] = useState<any>("Select a VOD");

  useEffect(() => {
    fetch('/api/twitch/getVodList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // user_id: initialState!.currentUser!.user_id
        // mock using ludwig's user_id to get good data
        user_id: '5fce7ed8b1514498a4e5e679'
      }),
    })
      .then(res =>
        res.json()
      )
      .then(json => {
        var titles: Array<string> = [];
        json.videos.forEach((video) => {
          console.log(video)
          titles.push(video)
        });
        setTitleList(titles);
      })
      .catch(err => {
        console.log(err.message)
      });
  }, []);

  const submitVod = () => {
    // make post request
    fetch('/api/service/submitVodToQueue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedVod),
    })
      .then(res =>
        res.json()
      )
      .then(json => {
        console.log(json)
      })
      .catch(err => {
        console.log(err.message)
      });



  }

  const onClick = ({ key }) => {
    console.log(`Click on item. ` + key);

    // create queue object
    let results = titleList.filter(obj => { return obj.broadcast_id == key; });
    let queue_obj = { "streamer": results[0].channel.name, "url": results[0].url }
    console.log(queue_obj);
    setSelectedVod(queue_obj)

    // update text in Dropdown menu
    setDropdownText(results[0].title);
  };

  function setMenu() {
    let submenu = titleList.map((vod_obj) =>
      <Menu.Item key={vod_obj.broadcast_id}>
        {vod_obj.title}
      </Menu.Item>
    );
    let menu = <Menu onClick={onClick}>{submenu}</Menu>
    return (menu);
  }

  return (
    <PageContainer>
      <Card>
        <Dropdown overlay={setMenu()}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {dropdownText} <DownOutlined />
          </a>
        </Dropdown>
        <p> </p>
        <Button onClick={submitVod} type="primary">Get Clips</Button>
      </Card>
    </PageContainer>
  );
}

export default Home;

