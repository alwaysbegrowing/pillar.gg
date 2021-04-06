import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React from 'react';
import { useVideos } from '../services/hooks/api';
import VideoCard from '../components/VideoCard';
import SelectUser from '../components/SelectUser';

const Videos = () => {
  const { data: videos, isLoading, isError } = useVideos();

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  return (
    <PageContainer extra={<SelectUser />}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={videos}
        renderItem={(video: any) => <VideoCard {...video} />}
      />
    </PageContainer>
  );
};

export default Videos;
