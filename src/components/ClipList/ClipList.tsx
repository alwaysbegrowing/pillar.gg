import type { ClipListProps } from '@/types/componentTypes';
import { List, ConfigProvider, Empty } from 'antd';
import React from 'react';
import type { IndividualTimestamp } from '@/services/hooks/api';
import { SortableClipCard } from './SortableClipCard';
import styled from 'styled-components';

import { Typography } from 'antd';

const { Title } = Typography;

const ClipListWrapper = styled.div`
  height: calc(100vh - 200px);
  overflow-y: scroll;
`;
const ClipList = ({ play, clipIdInfo, clipInfo, videoId }: ClipListProps) => {
  const { selectedClipId } = clipIdInfo;
  const { clips, setClips } = clipInfo;

  const renderListItem = (timestamp: IndividualTimestamp, index: number) => {
    return (
      <SortableClipCard
        play={() => play(timestamp.startTime, timestamp.id)}
        timestamp={timestamp}
        key={timestamp.id}
        banner={timestamp.banner}
        id={timestamp.id}
        cardNumber={index}
        videoId={videoId}
        /* TODO potential bug: if s3 upload failed and image does not exist in thumbnails array, this will probably error out */
        thumbnail={timestamp.thumbnail_url}
        selectedClipId={selectedClipId}
        setClips={setClips}
        isSelected={selectedClipId === timestamp.id}
      />
    );
  };

  return (
    <ClipListWrapper>
      <ConfigProvider renderEmpty={() => <Empty description="No Clips found" />}>
        <List
          header={<Title level={5}>{`${clips.length} Clips Found`}</Title>}
          dataSource={clips}
          itemLayout="vertical"
          renderItem={renderListItem}
        />
      </ConfigProvider>
    </ClipListWrapper>
  );
};

export default ClipList;
