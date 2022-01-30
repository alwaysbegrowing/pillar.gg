import { CalendarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, List, Space } from 'antd';
import formatDistance from 'date-fns/formatDistance';
import React from 'react';
import { history } from 'umi';
import { useClips } from '@/services/hooks/api';
import { useIntl } from 'umi';
import type { VodCardProps } from '@/types/componentTypes';

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ViewVideoButton = ({ id }: { id: number | string }) => (
  <Button type="primary" onClick={() => history.push(`/vods/${id}`)}>
    {useIntl().formatMessage({ id: 'component.VodCard.ViewVideoButton' })}
  </Button>
);

const ProcessingButton = () => (
  <Button loading={true}>
    {useIntl().formatMessage({ id: 'component.VodCard.ProcessingButton' })}
  </Button>
);

const NoClipsFound = () => <Button disabled={true}>No clips found for this</Button>;

const renderButton = (data: any, id: any) => {
  if (!data) return <ProcessingButton />;
  if (data.length === 0) return <NoClipsFound />;
  return <ViewVideoButton id={id} />;
};

const renderVodLink = (title: string, data: any, id: number) => {
  if (!data || !data?.length) return title;
  return <a href={`/vods/${id}`}>{title}</a>;
};

const VodCard = ({
  thumbnail_url: thumbnailUrl,
  title,
  description,
  duration,
  view_count,
  url,
  published_at: publishedAt,
  id,
}: VodCardProps) => {
  const { data } = useClips(id);
  const thumbnail = thumbnailUrl.replace('%{width}', '216').replace('%{height}', '120');
  const simpleTime = formatDistance(new Date(publishedAt), new Date(), { addSuffix: true });

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
        <List.Item.Meta title={renderVodLink(title, data, id)} description={description} />
        {renderButton(data, id)}
      </List.Item>
    </Card>
  );
};

export default VodCard;
