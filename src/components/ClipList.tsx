import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemIds = clips.map((item: IndividualTimestamp) => formatKey(item)); // ["1", "2", "3"]

  useEffect(() => {
    if (clips) {
      const [firstTimeStamp] = clips;
      const timeRange = formatKey(firstTimeStamp);
      play(firstTimeStamp.startTime, timeRange);
    }
  }, [clips, play]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        <List
          grid={{ gutter: 8 }}
          dataSource={clips}
          renderItem={(timestamp: IndividualTimestamp, i: number) => {
            const timeRange = formatKey(timestamp);
            return (
              <List.Item>
                <SortableClipCard
                  play={() => play(timestamp.startTime, timeRange)}
                  timestamp={timestamp}
                  key={timeRange}
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
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setClips((oldItems: IndividualTimestamp[]) => {
        const oldIndex = oldItems.findIndex((oldItem) => formatKey(oldItem) === active.id);
        const newIndex = oldItems.findIndex((oldItem) => formatKey(oldItem) === over.id);

        return arrayMove(oldItems, oldIndex, newIndex);
      });
    }
  }
};

export default App;
