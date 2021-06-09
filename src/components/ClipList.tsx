import { List } from 'antd';
import React, { useEffect } from 'react';
import type { IndividualTimestamp } from '../services/hooks/api';
import { SortableClipCard } from './SortableClipCard';

const formatKey = (timestamp: IndividualTimestamp) => {
  return `${timestamp.startTime}-${timestamp.endTime}`;
};

const App = ({
  thumbnail,
  play,
  selectedClipId,
  clipInfo,
}: {
  selectedClipId: string;
  play: (timestamp: number, clipId: string) => any;
  thumbnail: string;
  clipInfo: { clips: IndividualTimestamp[]; setClips: any };
}) => {
  const { clips, setClips } = clipInfo;

  useEffect(() => {
    if (clips) {
      const [firstTimeStamp] = clips;
      const timeRange = formatKey(firstTimeStamp);
      play(firstTimeStamp.startTime, timeRange);
    }
  }, [clips, play]);

  return (
    <div
      style={{
        height: 600,
        width: '100%',
        overflowY: 'scroll',
        backgroundColor: 'white',
        padding: '1rem',
      }}
    >
      {clips.length} Clips Found:
      <List
        grid={{ gutter: 8, column: 1 }}
        dataSource={clips}
        itemLayout="vertical"
        renderItem={(timestamp: IndividualTimestamp, i: number) => {
          const timeRange = formatKey(timestamp);
          return (
            <List.Item style={{ width: '100%' }}>
              <SortableClipCard
                play={() => play(timestamp.startTime, timeRange)}
                timestamp={timestamp}
                key={timeRange}
                verifiedTwitch={timestamp.verifiedTwitch}
                id={timeRange}
                i={i}
                thumbnail={thumbnail}
                selectedClipId={selectedClipId}
                setClips={setClips}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default App;
