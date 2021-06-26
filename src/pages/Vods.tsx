import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React from 'react';
import { useVideos } from '../services/hooks/api';
import VodCard from '../components/VodCard';
import SelectUser from '../components/SelectUser';

const shouldRenderExtra = () => {
  const { NODE_ENV } = process.env;
  const code = new URLSearchParams(window.location.search).get('debug') || false;
  if (NODE_ENV === 'development' || code === 'true') {
    return <SelectUser />;
  }
  return null;
};

const Videos = () => {
  const { data: videos, isLoading, isError } = useVideos();

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  return (
    <PageContainer extra={shouldRenderExtra()}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={videos}
        renderItem={(video: any) => <VodCard {...video} />}
      />
    </PageContainer>
  );
};

export default Videos;
