import { CalendarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, List, Space } from 'antd';
import React from 'react';
import { history } from 'umi';
import { useClips } from '../services/hooks/api';

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ViewVideoButton = ({ id }: { id: number | string }) => (
  <Button onClick={() => history.push(`/videos/${id}`)}>Create Clips from this VOD</Button>
);

const ProcessingButton = () => <Button loading={true}>Processing Clips</Button>;

interface VideoCardProps {
  thumbnail_url: string;
  title: string;
  description: string;
  duration: number;
  view_count: number;
  url: string;
  published_at: any;
  id: number;
}

const VideoCard = ({
  thumbnail_url,
  title,
  description,
  duration,
  view_count,
  url,
  published_at,
  id,
}: VideoCardProps) => {
  const { data } = useClips(id);
  const thumbnail = thumbnail_url.replace('%{width}', '270').replace('%{height}', '150');
  return (
    <Card>
      <List.Item
        key={title}
        actions={[
          <IconText icon={ClockCircleOutlined} text={duration} key="list-vertical-star-o" />,
          <IconText icon={EyeOutlined} text={view_count} key="list-vertical-like-o" />,
          <IconText icon={CalendarOutlined} text={published_at} key="list-vertical-published" />,
        ]}
        extra={thumbnail ? <img width={272} alt="logo" src={thumbnail} /> : null}
      >
        <List.Item.Meta title={<a href={url}>{title}</a>} description={description} />
        {data ? <ViewVideoButton id={id} /> : <ProcessingButton />}
      </List.Item>
    </Card>
  );
};

export default VideoCard;
