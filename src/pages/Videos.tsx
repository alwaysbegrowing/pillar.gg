import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React from 'react';
import { useVideos } from '../services/hooks/api';
import VideoCard from '../components/VideoCard';

const Videos = () => {
  const { data: videos, isLoading, isError } = useVideos();

  // used only for prefetching clip data on button hover

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  return (
    <PageContainer>
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
