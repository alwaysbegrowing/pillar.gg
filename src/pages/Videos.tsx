import { CalendarOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Space } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { useClips, useVideos } from '../services/hooks/api';

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Videos = () => {
  const [lastHoveredVideo, setLastHoveredVideo] = useState();
  const { data: videos, isLoading, isError } = useVideos();

  // used only for prefetching clip data on button hover
  useClips(lastHoveredVideo);

  if (isLoading) return 'loading...';
  if (isError) return 'error';

  return (
    <PageContainer>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={videos}
        renderItem={(video: any) => {
          const {
            thumbnail_url,
            title,
            description,
            duration,
            view_count,
            url,
            published_at,
            id,
          } = video;

          const thumbnail = thumbnail_url.replace('%{width}', 270).replace('%{height}', 150);
          return (
            <Card>
              <List.Item
                key={title}
                actions={[
                  <IconText
                    icon={ClockCircleOutlined}
                    text={duration}
                    key="list-vertical-star-o"
                  />,
                  <IconText icon={EyeOutlined} text={view_count} key="list-vertical-like-o" />,
                  <IconText
                    icon={CalendarOutlined}
                    text={published_at}
                    key="list-vertical-published"
                  />,
                ]}
                extra={thumbnail ? <img width={272} alt="logo" src={thumbnail} /> : null}
              >
                <List.Item.Meta title={<a href={url}>{title}</a>} description={description} />
                <Button
                  onMouseOver={() => setLastHoveredVideo(id)}
                  onClick={() => history.push(`/videos/${id}`)}
                >
                  Create Clips from this VOD
                </Button>
              </List.Item>
            </Card>
          );
        }}
      />
    </PageContainer>
  );
};

export default Videos;
