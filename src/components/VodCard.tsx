import { CalendarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, List, Space } from 'antd';
import formatDistance from 'date-fns/formatDistance';
import React from 'react';
import { history } from 'umi';
import { useClips } from '../services/hooks/api';
import { useIntl } from 'umi';

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ViewVideoButton = ({ id }: { id: number | string }) => (
  <Button onClick={() => history.push(`/vods/${id}`)}>
    {useIntl().formatMessage({ id: 'component.VodCard.ViewVideoButton' })}
  </Button>
);

const ProcessingButton = () => (
  <Button loading={true}>
    {useIntl().formatMessage({ id: 'component.VodCard.ProcessingButton' })}
  </Button>
);

interface VodCardProps {
  thumbnail_url: string;
  title: string;
  description: string;
  duration: number;
  view_count: number;
  url: string;
  published_at: any;
  id: number;
}

const VodCard = ({
  thumbnail_url,
  title,
  description,
  duration,
  view_count,
  url,
  published_at,
  id,
}: VodCardProps) => {
  const { data } = useClips(id);
  const thumbnail = thumbnail_url.replace('%{width}', '216').replace('%{height}', '120');
  const simpleTime = formatDistance(new Date(published_at), new Date(), { addSuffix: true });

  return (
    <Card>
      <List.Item
        key={title}
        actions={[
          <IconText icon={ClockCircleOutlined} text={duration} key="list-vertical-star-o" />,
          <IconText
            icon={EyeOutlined}
            text={view_count.toLocaleString()}
            key="list-vertical-like-o"
          />,
          <IconText icon={CalendarOutlined} text={simpleTime} key="list-vertical-published" />,
        ]}
        extra={
          <a target="_blank" href={url}>
            thumbnail
          </a> ? (
            <a target="_blank" href={url}>
              <img width={272} alt="logo" src={thumbnail} />
            </a>
          ) : null
        }
      >
        <List.Item.Meta title={<a href={`/vods/${id}`}>{title}</a>} description={description} />
        {data ? <ViewVideoButton id={id} /> : <ProcessingButton />}
      </List.Item>
    </Card>
  );
};

export default VodCard;
