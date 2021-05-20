import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Switch, Tooltip, Button, Badge } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import type { IndividualTimestamp } from '../services/hooks/api';
import { Divider } from 'antd';
import { useIntl } from 'umi';

const { Meta } = Card;
const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

export function SortableClipCard({
  id,
  thumbnail,
  timestamp,
  play,
  verifiedTwitch,
  selectedClipId,
  setClips,
  i,
}: {
  play: () => any;
  verifiedTwitch: boolean;
  selectedClipId: string;
  id: string;
  setClips: any;
  i: number;
  thumbnail: string;
  timestamp: IndividualTimestamp;
}) {
  const { formatMessage } = useIntl();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectedStyle = selectedClipId === id ? { backgroundColor: '#f9f0ff' } : {};

  const che = (isChecked: boolean) => {
    setClips((clips: IndividualTimestamp[]) => {
      const newClips = [...clips];
      newClips[i].selected = isChecked;
      return newClips;
    });
  };

  const card = (
    <Card
      style={selectedStyle}
      hoverable
      cover={<img alt="Twitch Thumbnail" src={thumbnail} />}
      actions={[
        <Tooltip title={formatMessage({ id: 'component.SortableClipCard.Card.Tooltip.title' })}>
          <Button size="small" onClick={() => play()} icon={<PlayCircleOutlined />}>
            {formatMessage({ id: 'component.SortableClipCard.Card.Tooltip.Button' })}
          </Button>
        </Tooltip>,

        <Switch
          onChange={che}
          checked={timestamp.selected}
          checkedChildren={formatMessage({
            id: 'component.SortableClipCard.Card.Switch.checkedChildren',
          })}
          unCheckedChildren={formatMessage({
            id: 'component.SortableClipCard.Card.Switch.unCheckedChildren',
          })}
        />,
      ]}
    >
      <Meta
        description={
          <>
            {toTime(timestamp.startTime)} <Divider type="vertical" /> {toTime(timestamp.endTime)}
          </>
        }
      />
    </Card>
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {verifiedTwitch && (
        <Badge.Ribbon
          text={formatMessage({ id: 'component.SortableClipCard.div.Badge.Ribbon.text' })}
        >
          {card}
        </Badge.Ribbon>
      )}
      {!verifiedTwitch && card}
    </div>
  );
}
