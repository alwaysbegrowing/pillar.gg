import React from 'react';
import { Button, Result } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { history } from 'umi';

const VodButton = () => {
  const handleClick = () => {
    history.push('/vods');
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Let's Go!
    </Button>
  );
};

const ExportInvitation = () => (
  <Result
    icon={<MehOutlined />}
    title="You don't seem to have any exports."
    subTitle={"Why don't you try editing some of your past streams?"}
    extra={<VodButton />}
  />
);

export default ExportInvitation;
