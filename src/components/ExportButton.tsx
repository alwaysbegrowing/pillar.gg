import { Menu, Dropdown, Button } from 'antd';
import {
  DownOutlined,
  ExportOutlined,
  MailOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useUser } from '@/services/hooks/api';






const ExportButton = ({onClick}: any) => {
  const { data } = useUser();


  const verifyYoutube = async (id: number) => {
    const resp = await fetch(`/api/youtube/isAuthValid?state=${id}`);
    if (resp.status === 401) {
      window.open(`/api/youtube/callback?state=${id}`, '_blank');
    }
    if (resp.status === 200) {
        onClick()
    }
  };

  function handleMenuClick(e: any) {
    if (e.key === 'youtube') {
      verifyYoutube(data?.id);
    }

    if (e.key === 'email') {
        console.log('email clicked')
        onClick()
      }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="youtube" icon={<YoutubeOutlined />}>
        Export to Youtube
      </Menu.Item>
      <Menu.Item key="email" icon={<MailOutlined />}>
        Export to Email
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type="primary" icon={<ExportOutlined />}>
        Export Compilation <DownOutlined />
      </Button>
    </Dropdown>
  );

  //     <Button
  //     style={{ marginLeft: 24 }}
  //     type="primary"
  //     disabled={isCombineButtonDisabled}
  //     icon={<DownloadOutlined />}
  //     onClick={showPopconfirm}
  //   >
  //     {formatMessage({
  //       id: 'pages.editor.combineClipsButton',
  //     })}
  //   </Button>

  //   <LinkYoutubeButton/>
};


export default ExportButton;
