import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips } from '../services/hooks/api';
import { List, Button, Row } from 'antd';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Sortable from '../components/Sortable'

import { useParams } from 'umi';

// interface ProgressProps {
//   played: number;
//   playedSeconds: number;
//   loaded: number;
//   loadedSeconds: number;
// }

// interface ClipProps {
//   id: number;
//   startTime: number;
//   endTime: number;
// }

const seek = (ref: any, seekTime: number) => {
  if (ref.current) {
    ref.current.seekTo(seekTime);
  }
};

const toTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);
// const ClipRow = ({ play, algorithmClips, clipIndex, playing }: any) => (
//   <Row justify="center" style={{ marginTop: 24 }}>
//     <List
//       grid={{ gutter: 8 }}
//       dataSource={algorithmClips}
//       renderItem={(item: any, i) => {
//         const selected = clipIndex === i && playing;
//         return (
//           <List.Item>
//             <Card
//               // title={`Clip ${i + 1}`}
//               actions={[
//                 <Button onClick={() => play(item, i)}>{selected ? 'Playing' : 'View'}</Button>,
//               ]}
//             >
//               <div>{toTime(item.startTime)}</div>
//               <div>{toTime(item.endTime)}</div>
//             </Card>
//           </List.Item>
//         );
//       }}
//     />
//     <Button style={{ marginLeft: 8 }} icon={<DownloadOutlined />}>
//       Download
//     </Button>
//   </Row>
// );

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);
  const videoRef = useRef(null);

  // const [playing, setPlaying] = useState<boolean>(false);
  // const [clipIndex, setClipIndex] = useState<number>(0);

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  // const play = (item: ClipProps, i: number) => {
  //   const { startTime } = item;
  //   seek(videoRef, startTime);
  //   setClipIndex(i);
  //   setPlaying(true);
  // };
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
  const d = data.algo1.map(d1 => (d1.endTime))
  return (
    <div>
      <Row justify="center">
        <ReactPlayer
          controls
          // playing={playing}
          onReady={() => {
            seek(videoRef, Object.values(data)[0].startTime);
          }}
          // not working https://github.com/cookpete/react-player/issues/1206
          progressInterval={100}
          // onProgress={onProgress}
          ref={videoRef}
          url={`https://twitch.tv/videos/${id}`}
        />
      </Row>
      {data.algo1 && <Sortable arr={data.algo1}/>}
      {/* <List
        dataSource={Object.values(data)}
        renderItem={(item) => (
          <ClipRow play={play} algorithmClips={item} playing={playing} clipIndex={clipIndex} />
        )}
      /> */}
    </div>
  );
};
