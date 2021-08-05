import { PageContainer } from '@ant-design/pro-layout';
import { List } from 'antd';
import React, { useState } from 'react';
import { useVideos } from '../services/hooks/api';
import VodCard from '../components/VodCard';
import SelectUser from '../components/SelectUser';
import { fetcher } from '@/services/fetcher';

// number of vods to go back
// and check for CCC
const CCC_VOD_CHECK = 5;

const shouldRenderExtra = () => {
  const { NODE_ENV } = process.env;
  const code = new URLSearchParams(window.location.search).get('debug') || false;
  if (NODE_ENV === 'development' || code === 'true') {
    return <SelectUser />;
  }
  return null;
};

const Videos = () => {
  const [ranCCCFinder, setCCCFinder] = useState(false);
  const { data: videos, isLoading, isError } = useVideos();

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  if (!isLoading && !isError && !ranCCCFinder) {
    videos.slice(0, CCC_VOD_CHECK).forEach((video: { id: any }) => {
      if (video?.id) {
        fetcher(`/api/ccc/${video.id}`);
      }
    });
    setCCCFinder(true);
  }

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
