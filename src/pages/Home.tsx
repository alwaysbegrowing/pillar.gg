import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useClips } from '../services/hooks/api';
import { List, Button, Row } from 'antd';
import { Progress } from 'antd';

interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface ClipProps {
  id: number
  startTime: number
  endTime: number
}

// HARDCODED BUT WILL BE VARIBALE SOON
const videoId = 955629991

export default () => {
  const {data, isLoading} = useClips(videoId)
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [selectedClip, setSelectedClip] = useState<ClipProps>();

  
  const onProgress = ({ playedSeconds }: ProgressProps) => {
    const { startTime, endTime } = selectedClip;
    console.log({ startTime, endTime });
    const secondsLeftOnClip = endTime - playedSeconds;
    const clipLength = endTime - startTime;
    const progressMade = (clipLength - secondsLeftOnClip) / clipLength;
    setProgress(Math.round(progressMade * 100));
    // this is one second since this onprogress function
    // runs once every 1000 ms https://github.com/cookpete/react-player/issues/1206
    if (secondsLeftOnClip <= 0.1) {
      setPlaying(false);
    }
  };
  if (isLoading) return 'loading...'
  return (
    <Row>
      <List
        size="small"
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            <Button
              size="small"
              onClick={() => {
                setSelectedClip(item);
                if (videoRef.current) {
                  videoRef.current.seekTo(selectedClip.startTime);
                }
              }}
            >{`${item.startTime}-${item.endTime}`}</Button>
          </List.Item>
        )}
      />
      {selectedClip && (
        <div>
          <ReactPlayer
            onReady={() => {
              videoRef.current.seekTo(selectedClip.startTime);
            }}
            playing={playing}
            // not working https://github.com/cookpete/react-player/issues/1206
            progressInterval={100}
            onProgress={onProgress}
            ref={videoRef}
            key={selectedClip.videoId + selectedClip.startTime}
            url={`https://twitch.tv/videos/${selectedClip.videoId}`}
          />
          <Progress percent={progress} />
        </div>
      )}
    </Row>
  );
};

