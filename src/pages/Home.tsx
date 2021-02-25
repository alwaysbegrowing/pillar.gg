import React, {useState, useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Menu, Dropdown } from 'antd';
// import {useModel } from 'umi';
import { DownOutlined } from '@ant-design/icons';

// import styles from './Home.less';

const Home = () => {


  const [titleList, setTitleList ] = useState<string[]>([]);
  // const { initialState, setInitialState } = useModel('@@initialState');

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
      var titles:Array<string> = [];
      json.videos.forEach((video: {title:string}) => {
        titles.push(video.title)
      });
      setTitleList(titles);
    })
    .catch(err => {
      console.log(err.message)
    });
  },[]);

  function setMenu(){
    let submenu = titleList.map((title) =>
        <Menu.Item>
          {title}
        </Menu.Item>
    );
    let menu = <Menu>{submenu}</Menu>
    return(menu);
  }

    return (
      <PageContainer>
        <Card>
          <Dropdown overlay={setMenu()}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Select a VOD <DownOutlined />
            </a>
          </Dropdown>
        </Card>
      </PageContainer>
    );
  }

export default Home;

