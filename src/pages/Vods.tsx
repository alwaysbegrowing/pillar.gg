import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React from 'react';
import { useVideos } from '@/services/hooks/api';
import VodCard from '@/components/VodCard/VodCard';
import SelectUser from '@/components/SelectUser';
import LoginInvitation from '@/components/Login/LoginInvitation';

import { isDebugMode } from '@/utils/utils';

const Vods = () => {
  const { data: videos, isLoading, isError } = useVideos();
  if (isLoading) return 'loading...';
  if (isError) {
    if (isError.status === 401 || isError.status === 404) {
      return <LoginInvitation />;
    }
    return 'error';
  }
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
