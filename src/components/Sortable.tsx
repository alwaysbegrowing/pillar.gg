import React, { useState } from 'react';
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

import { SortableItem } from './SortableItem';

const formatKey = (timestamp: IndividualTimestamp) => {
  return `${timestamp.startTime}-${timestamp.endTime}`;
};

const App = ({ arr }: { arr: IndividualTimestamp[] }) => {
  const [items, setItems] = useState<IndividualTimestamp[]>(arr);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemIds = items.map((item: IndividualTimestamp) => formatKey(item)); // ["1", "2", "3"]

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        <List
          grid={{ gutter: 8 }}
          dataSource={items}
          renderItem={(item: any) => {
            const timeRange = formatKey(item);
            return (
              <List.Item>
                <SortableItem key={timeRange} id={timeRange} />
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
