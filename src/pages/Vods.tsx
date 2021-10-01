import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React from 'react';
import { useVideos } from '../services/hooks/api';
import VodCard from '../components/VodCard';
import SelectUser from '../components/SelectUser';
import { isDebugMode } from '@/utils/utils';

const Vods = () => {
  const { data: videos, isLoading, isError } = useVideos();

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  return (
    <PageContainer extra={isDebugMode() ? <SelectUser /> : null}>
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

export default Vods;
