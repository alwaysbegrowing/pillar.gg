import React from 'react';
import { List, Space, Card, Button } from 'antd';
import { ClockCircleOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useVideos } from '../services/hooks/api';

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Videos = () => {
  const { data: videos } = useVideos();
  if (!videos) return 'loading';

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
            id
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

                  // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={<img width={272} alt="logo" src={thumbnail} />}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={avatar} />}

                  title={<a href={url}>{title}</a>}
                  description={description}
                />
                <Button href={`/videos/${id}`}>Create Clips from this VOD</Button>
              </List.Item>
            </Card>
          );
        }}
      />
    </PageContainer>
  );
};

export default Videos;
