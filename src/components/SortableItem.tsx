import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;
// const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

export function SortableItem({ id, thumbnail }: { id: string, thumbnail: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
     <Card
    style={{ width: 150 }}
    cover={
      <img
        alt='Twitch Thumbnail'
        src={thumbnail}
      />
    }
    actions={[
      <DeleteOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    {/* <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="Card title"
      description="This is the description"
    /> */}
  </Card>,
    </div>
  );
}
