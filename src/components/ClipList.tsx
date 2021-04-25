import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { IndividualTimestamp } from '../services/hooks/api';

import { List } from 'antd';

import { SortableItem } from './SortableClipCard';

const formatKey = (timestamp: IndividualTimestamp) => {
  return `${timestamp.startTime}-${timestamp.endTime}`;
};

const App = ({
  arr,
  thumbnail,
  play,
  selectedClipId,
}: {
  selectedClipId: string;
  play: (timestamp: number, clipId: string) => any;
  arr: IndividualTimestamp[];
  thumbnail: string;
}) => {
  const [items, setItems] = useState<IndividualTimestamp[]>(arr);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemIds = items.map((item: IndividualTimestamp) => formatKey(item)); // ["1", "2", "3"]
  useEffect(() => {
    const [firstTimeStamp] = arr;
    const timeRange = formatKey(firstTimeStamp);

    play(firstTimeStamp.startTime, timeRange);
  }, [arr, play]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        <List
          grid={{ gutter: 8 }}
          dataSource={items}
          renderItem={(timestamp: IndividualTimestamp) => {
            const timeRange = formatKey(timestamp);
            return (
              <List.Item>
                <SortableItem
                  play={() => play(timestamp.startTime, timeRange)}
                  timestamp={timestamp}
                  key={timeRange}
                  id={timeRange}
                  thumbnail={thumbnail}
                  selectedClipId={selectedClipId}
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
      setItems((oldItems) => {
        const oldIndex = oldItems.findIndex((oldItem) => formatKey(oldItem) === active.id);
        const newIndex = oldItems.findIndex((oldItem) => formatKey(oldItem) === over.id);

        return arrayMove(oldItems, oldIndex, newIndex);
      });
    }
  }
};

export default App;
