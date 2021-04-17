import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'antd';

// const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

export function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
      //   actions={[
      //     <Button onClick={() => play(item, i)}>{selected ? 'Playing' : 'View'}</Button>,
      //   ]}
      >
        {/* <div>{toTime(item.startTime)}</div>
              <div>{toTime(item.endTime)}</div> */}
        {id}
      </Card>
    </div>
  );
}
