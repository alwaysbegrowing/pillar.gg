import { List } from 'antd';
import React, { useEffect } from 'react';
import type { IndividualTimestamp } from '../services/hooks/api';
import { SortableClipCard } from './SortableClipCard';

const App = ({
  thumbnail,
  play,
  clipIdInfo,
  clipInfo,
  thumbnails,
}: {
  clipIdInfo: { selectedClipId: string; setSelectedClipId: any };
  play: (timestamp: number, clipId: string) => any;
  thumbnail: string;
  clipInfo: { clips: IndividualTimestamp[]; setClips: any };
  videoId: string;
  thumbnails: any[];
}) => {
  const { selectedClipId } = clipIdInfo;
  const { clips, setClips } = clipInfo;

  useEffect(() => {
    if (clips && selectedClipId == null) {
      const [firstClip] = clips;
      play(firstClip.startTime, firstClip.id);
    }
  }, [clips, play, selectedClipId]);

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
          return (
            <List.Item style={{ width: '100%' }}>
              <SortableClipCard
                play={() => play(timestamp.startTime, timestamp.id)}
                timestamp={timestamp}
                key={timestamp.id}
                verifiedTwitch={timestamp.verifiedTwitch}
                id={timestamp.id}
                i={i}
                /* TODO potential bug: if s3 upload failed and image does not exist in thumbnails array, this will probably error out */
                thumbnail={thumbnails === undefined ? thumbnail : thumbnails[timestamp.id]}
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
