import type { ClipListProps } from '@/types/types';
import { List } from 'antd';
import React from 'react';
import type { IndividualTimestamp } from '@/services/hooks/api';
import { SortableClipCard } from './SortableClipCard';
import styled from 'styled-components';

const ClipListWrapper = styled.div`
  height: 600;
  width: 100%;
  overflow-y: scroll;
  background-color: white;
  padding: 1rem;
`;

const ClipList = ({
  thumbnail,
  play,
  clipIdInfo,
  clipInfo,
  thumbnails,
  videoId,
}: ClipListProps) => {
  const { selectedClipId } = clipIdInfo;
  const { clips, setClips } = clipInfo;

  const renderListItem = (timestamp: IndividualTimestamp, i: number) => {
    return (
      <List.Item style={{ width: '100%' }}>
        <SortableClipCard
          play={() => play(timestamp.startTime, timestamp.id)}
          timestamp={timestamp}
          key={timestamp.id}
          sourceAttribution={timestamp.sourceAttribution}
          id={timestamp.id}
          i={i}
          videoId={videoId}
          /* TODO potential bug: if s3 upload failed and image does not exist in thumbnails array, this will probably error out */
          thumbnail={thumbnails === undefined ? thumbnail : thumbnails[timestamp.id]}
          selectedClipId={selectedClipId}
          setClips={setClips}
        />
      </List.Item>
    );
  };

  return (
    <ClipListWrapper>
      {clips.length} Clips Found:
      <List
        grid={{ gutter: 8, column: 1 }}
        dataSource={clips}
        itemLayout="vertical"
        renderItem={renderListItem}
      />
    </ClipListWrapper>
  );
};

export default ClipList;
