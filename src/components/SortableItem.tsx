import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Avatar, Switch } from 'antd';
import {
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import type { IndividualTimestamp } from '../services/hooks/api';
import { Divider } from 'antd';

const { Meta } = Card;
const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

export function SortableItem({
  id,
  thumbnail,
  timestamp,
  play,
}: {
  play: () => any;
  id: string;
  thumbnail: string;
  timestamp: IndividualTimestamp;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const clipLength = timestamp.endTime - timestamp.startTime;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
      // style={{backgroundColor: 'red'}}
        hoverable
        // make clips variable width based on their length
        // style={{ width: clipLength * 8 }}
        // cover={<img alt="Twitch Thumbnail" src={thumbnail} />}
        // actions={[
        //   <>
        //   <PlusOutlined /> 5s
        //   <MinusOutlined />
        //   </>,
        //   <PlayCircleOutlined key="setting" />,
        //   <DeleteOutlined key="setting" />,
        //   <>
        //   <PlusOutlined /> 5s
        //   <MinusOutlined />
        //   </>
        // ]}
        actions={[<PlayCircleOutlined onClick={() => play()} key="play" />,  <Switch checkedChildren="Use" unCheckedChildren="Hide"/>]}
      >
        <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          // title="Card title"
          description={
            <>
              {toTime(timestamp.startTime)} <Divider type="vertical" /> {toTime(timestamp.endTime)}
            </>
          }
        />
      </Card>
    </div>
  );
}
