import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List, Badge, Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import type { IndividualTimestamp } from '@/services/hooks/api';
import { useUser } from '@/services/hooks/api';
import { Divider } from 'antd';
import { useIntl } from 'umi';
import Text from 'antd/lib/typography/Text';
import { sendHubspotEvent } from '@/services/send';

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

const itemStyle = {
  display: 'flex',
  boxSizing: 'border-box',
  padding: '1rem',
  borderRadius: '0.15rem',
};

const selectedItemStyle = {
  ...itemStyle,
  backgroundColor: '#D3ADF7',
};

const numberStyle = {
  paddingRight: '1rem',
  alignSelf: 'center',
};

const playIconStyle = {
  paddingRight: '0.6rem',
  alignSelf: 'center',
};

export function SortableClipCard({
  id,
  thumbnail,
  timestamp,
  play,
  sourceAttribution,
  selectedClipId,
  setClips,
  i,
  videoId,
}: {
  play: () => any;
  sourceAttribution?: string;
  selectedClipId: string;
  id: string;
  setClips: any;
  i: number;
  thumbnail: string;
  timestamp: IndividualTimestamp;
  videoId: string | number;
}) {
  const { data: twitchData } = useUser();
  const { id: twitchId } = twitchData || {};
  const { formatMessage } = useIntl();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectedStyle = selectedClipId === id ? selectedItemStyle : itemStyle;

  const che = (isChecked: boolean) => {
    setClips((clips: IndividualTimestamp[]) => {
      const newClips = [...clips];
      newClips[i].selected = isChecked;
      return newClips;
    });
  };

  const CardNumber = () => {
    if (selectedClipId === id) {
      return (
        <div style={playIconStyle}>
          <CaretRightOutlined />
        </div>
      );
    }
    return (
      <div style={numberStyle}>
        <Text type="secondary">{i + 1}</Text>
      </div>
    );
  };

  const handleClick = () => {
    play();
    sendHubspotEvent(twitchId, 'CLICKED_CLIP_EVENT', videoId, { selectedClipId });
  };

  const card = (
    <div style={selectedStyle} onClick={handleClick}>
      <CardNumber />
      <div>
        <List.Item.Meta
          avatar={
            <img
              alt="Twitch Thumbnail"
              src={thumbnail}
              style={{ width: '12rem', height: '6.66rem' }}
            />
          }
          title={
            <div style={{ display: 'flex', fontSize: 14 }}>
              {toTime(timestamp.startTime)} <Divider type="vertical" /> {toTime(timestamp.endTime)}
            </div>
          }
          description={
            <Switch
              onChange={che}
              checked={timestamp.selected}
              checkedChildren={formatMessage({
                id: 'component.SortableClipCard.Card.Switch.checkedChildren',
              })}
              unCheckedChildren={formatMessage({
                id: 'component.SortableClipCard.Card.Switch.unCheckedChildren',
              })}
            />
          }
        />
      </div>
    </div>
    // <Card
    //   style={selectedStyle}
    //   hoverable
    //   cover={<img alt="Twitch Thumbnail" src={thumbnail} />}
    //   actions={[
    //     <Tooltip title={formatMessage({ id: 'component.SortableClipCard.Card.Tooltip.title' })}>
    //       <Button size="small" onClick={() => play()} icon={<PlayCircleOutlined />}>
    //         {formatMessage({ id: 'component.SortableClipCard.Card.Tooltip.Button' })}
    //       </Button>
    //     </Tooltip>,
    //
    //     <Switch
    //       onChange={che}
    //       checked={timestamp.selected}
    //       checkedChildren={formatMessage({
    //         id: 'component.SortableClipCard.Card.Switch.checkedChildren',
    //       })}
    //       unCheckedChildren={formatMessage({
    //         id: 'component.SortableClipCard.Card.Switch.unCheckedChildren',
    //       })}
    //     />,
    //   ]}
    // >
    //   <Meta
    //     description={
    //       <>
    //         {toTime(timestamp.startTime)} <Divider type="vertical" /> {toTime(timestamp.endTime)}
    //       </>
    //     }
    //   />
    // </Card>
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {sourceAttribution && <Badge.Ribbon text={sourceAttribution}>{card}</Badge.Ribbon>}
      {!sourceAttribution && card}
    </div>
  );
}
