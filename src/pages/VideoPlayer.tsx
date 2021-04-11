import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips } from '../services/hooks/api';
import { List, Button, Row, Col, Empty, Select, notification } from 'antd';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useParams } from 'umi';

// interface ProgressProps {
//   played: number;
//   playedSeconds: number;
//   loaded: number;
//   loadedSeconds: number;
// }

interface ClipProps {
  id: number;
  startTime: number;
  endTime: number;
}

const seek = (ref: any, seekTime: number) => {
  if (ref.current) {
    ref.current.seekTo(seekTime);
  }
};

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

const VerticalClipList = ({
  play,
  algorithmClips,
  clipIndex,
  playing,
  showClips,
  isClipListVisible,
  isClipInSelectedAlgorithm,
}: any) => {
  if (isClipListVisible) {
    return (
      <List
        style={{ height: '40vh', overflow: 'scroll' }}
        bordered={true}
        dataSource={algorithmClips}
        renderItem={(item: any, i) => {
          const selected = clipIndex === i && playing && isClipInSelectedAlgorithm;
          return (
            <List.Item>
              <Card
                // title={`Clip ${i + 1}`}
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
    );
  }
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      //   description={
      //   <span>
      //     Let's get started
      //   </span>
      // }
    >
      <Button style={{ marginTop: 8 }} icon={<DownloadOutlined />} onClick={() => showClips()}>
        Make Clips
      </Button>
    </Empty>
  );
};

const DownloadButton = () => (
  <Button style={{ marginTop: 8 }} icon={<DownloadOutlined />}>
    Download
  </Button>
);

const AlgorithmRadio = ({ setPickedAlgorithm }: any) => {
  const radioStyle = {
    height: '5vh',
    paddingTop: '1vh',
  };
  return (
    <Select style={radioStyle} onChange={(value) => setPickedAlgorithm(value)} defaultValue={1}>
      <Select.Option value={1}>Algorithm 1</Select.Option>
      <Select.Option value={2}>Algorithm 2</Select.Option>
      <Select.Option value={3}>Algorithm 3</Select.Option>
      <Select.Option value={4}>Algorithm 4</Select.Option>
    </Select>
  );
};

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [playingClipAlgorithm, setplayingClipAlgorithm] = useState<number>(1);
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [isClipListVisible, setIsClipListVisible] = useState<boolean>(false);
  const [pickedAlgorithm, setPickedAlgorithm] = useState<number>(1);

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  const play = (item: ClipProps, i: number) => {
    const { startTime } = item;
    seek(videoRef, startTime);
    setClipIndex(i);
    setplayingClipAlgorithm(pickedAlgorithm);
    setPlaying(true);
  };

  const showClips = () => {
    notification.success({
      message: 'Your clips have been loaded',
    });
    setIsClipListVisible(true);
  };

  let selectedAlgorithmData;
  switch (pickedAlgorithm) {
    case 1:
      selectedAlgorithmData = data.algo1;
      break;
    case 2:
      selectedAlgorithmData = data.algo2;
      break;
    case 3:
      selectedAlgorithmData = data.algo3;
      break;
    case 4:
      selectedAlgorithmData = data.algo4;
      break;
    default:
      selectedAlgorithmData = data.algo1;
      break;
  }
  // const onProgress = ({ playedSeconds }: ProgressProps) => {
  //   const secondsLeftOnClip = data[clipIndex].endTime - playedSeconds;
  //   if (secondsLeftOnClip <= 1) {
  //     if (clipIndex + 1 === data.length) {
  //       setPlaying(false);
  //     } else {
  //       seek(videoRef, data[clipIndex + 1].startTime);
  //       setClipIndex((index) => index + 1);
  //     }
  //   }
  // };
  return (
    <div>
      <Row justify="center">
        <Col>
          <ReactPlayer
            controls
            playing={playing}
            onReady={() => {
              seek(videoRef, Object.values(data)[0].startTime);
            }}
            // not working https://github.com/cookpete/react-player/issues/1206
            progressInterval={100}
            // onProgress={onProgress}
            ref={videoRef}
            url={`https://twitch.tv/videos/${id}`}
          />
        </Col>
        <Col offset={1}>
          {/* only looking at algorithm1 for now until we have a more complete solution */}
          <VerticalClipList
            play={play}
            algorithmClips={selectedAlgorithmData}
            playing={playing}
            clipIndex={clipIndex}
            showClips={showClips}
            isClipListVisible={isClipListVisible}
            isClipInSelectedAlgorithm={playingClipAlgorithm === pickedAlgorithm}
          />

          {isClipListVisible ? <AlgorithmRadio setPickedAlgorithm={setPickedAlgorithm} /> : null}
        </Col>
        {/* <Col offset={1}>
        </Col> */}
      </Row>
      <Row justify="center">{isClipListVisible ? <DownloadButton /> : null}</Row>
    </div>
  );
};
