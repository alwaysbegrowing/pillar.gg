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
import type { SortableClipCardProps } from '@/types/componentTypes';
import styled from 'styled-components';

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

const CardWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.15rem;
  background-color: ${(props) => (props.isSelected ? '#d3adf7' : '')};
`;

const CardNumberWrapper = styled.div`
  padding-right: 1rem;
  align-self: center;
`;

const PlayIconWrapper = styled.div`
  padding-right: 0.6rem;
  align-self: center;
`;

const TimestampsWrapper = styled.div`
  display: flex;
  font-size: 14;
`;

export function SortableClipCard({
  id,
  thumbnail,
  timestamp,
  play,
  sourceAttribution,
  selectedClipId,
  setClips,
  cardNumber,
  videoId,
  isSelected,
}: SortableClipCardProps) {
  const { data: twitchData } = useUser();
  const { id: twitchId } = twitchData || {};
  const { formatMessage } = useIntl();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const changeClip = (isChecked: boolean) => {
    setClips((clips: IndividualTimestamp[]) => {
      const newClips = [...clips];
      newClips[cardNumber].selected = isChecked;
      return newClips;
    });
  };

  const CardNumber = () =>
    isSelected ? (
      <PlayIconWrapper>
        <CaretRightOutlined />
      </PlayIconWrapper>
    ) : (
      <CardNumberWrapper>
        <Text type="secondary">{cardNumber + 1}</Text>
      </CardNumberWrapper>
    );

  const handleClick = () => {
    play();
    sendHubspotEvent(twitchId, 'CLICKED_CLIP_EVENT', videoId, { selectedClipId });
  };

  const Timestamps = () => (
    <TimestampsWrapper>
      {toTime(timestamp.startTime)} <Divider type="vertical" /> {toTime(timestamp.endTime)}
    </TimestampsWrapper>
  );

  const card = (
    <CardWrapper isSelected={isSelected} onClick={handleClick}>
      <CardNumber />
      <List.Item.Meta
        avatar={
          <img
            alt="Twitch Thumbnail"
            src={thumbnail}
            style={{ width: '12rem', height: '6.66rem' }}
          />
        }
        title={<Timestamps />}
        description={
          <Switch
            onChange={changeClip}
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
    </CardWrapper>
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {sourceAttribution && <Badge.Ribbon text={sourceAttribution}>{card}</Badge.Ribbon>}
      {!sourceAttribution && card}
    </div>
  );
}
