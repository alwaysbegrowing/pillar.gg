import React from 'react';
import { Empty, Button, List, Card, ConfigProvider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

const VerticalClipList = ({
  play,
  algorithmClips,
  clipIndex,
  playing,
  showClips,
  isClipInSelectedAlgorithm,
  loading,
}: any) => {
  if (loading) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
      >
        <Button style={{ marginTop: 8 }} loading>
          Generating Clips
        </Button>
      </Empty>
    );
  }

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
        >
          <Button style={{ marginTop: 8 }} icon={<DownloadOutlined />} onClick={() => showClips()}>
            Make Clips
          </Button>
        </Empty>
      )}
    >
      <List
        style={{ height: '40vh', overflow: 'scroll' }}
        bordered={true}
        dataSource={algorithmClips}
        renderItem={(item: any, i) => {
          const selected = clipIndex === i && playing && isClipInSelectedAlgorithm;
          return (
            <List.Item>
              <Card
                actions={[
                  <Button onClick={() => play(item, i)}>{selected ? 'Playing' : 'View'}</Button>,
                ]}
              >
                <div>{toTime(item.startTime)}</div>
                <div>{toTime(item.endTime)}</div>
              </Card>
            </List.Item>
          );
        }}
      />
    </ConfigProvider>
  );
};

export default VerticalClipList;
