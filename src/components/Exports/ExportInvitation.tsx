import React from 'react';
import { Button, Result } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useVideos } from '@/services/hooks/api';

const VodButton = () => {
  const { data, isLoading, isError } = useVideos();

  const handleClick = () => {
    if (isLoading || isError || data.length === 0) {
      history.push('/vods');
    }

    const { id: videoId } = data[0];

    history.push(`/vods/${videoId}`);
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
