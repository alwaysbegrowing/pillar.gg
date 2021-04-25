import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  NotificationOutlined,
  SoundOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

import { Spin, Slider, Space, Row } from 'antd';

const msFor60Fps = 16.6;

const styles = {
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    // boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  },

  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  icon: {
    color: '#f1f7fe',
    // fontSize: 16,
  },
};

const CandidateVideo = ({
  url,
  duration,
  setDuration,
  progress,
  setProgress,
  videoRef,
  controlKeys,
  playing,
  setPlaying,
  interval,
}) => {
  const [muted, setMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [hover, setHover] = useState(true);

  const handleEnter = (event) => {
    const { code } = event;
    if (code === 'Space' && controlKeys) {
      event.preventDefault();
      setPlaying((playing) => !playing);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [controlKeys]);

  useEffect(() => {
    setIsLoading(false);
  }, [url]);

  return (
    <Spin spinning={!isLoading}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(true)}
        style={styles.playerWrapper}
      >
        <ReactPlayer
          onReady={() => setIsLoading(true)}
          onError={() => {
            console.log('Error with VideoPlayer');
          }}
          style={styles.reactPlayer}
          ref={videoRef}
          height="100%"
          width="100%"
          playing={playing}
          muted={muted}
          progressInterval={msFor60Fps}
          config={{ youtube: { playerVars: { rel: false, modestbranding: true } } }}
          onProgress={(progress) => setProgress(progress)}
          url={url}
        />
        <div
          onClick={() => setPlaying((playing) => !playing)}
          style={{
            position: 'absolute',
            top: 0,
            height: 'calc(100% - 50px)',
            width: '100%',
          }}
        />
        <div
          style={{
            width: '100%',
            bottom: 0,
            position: 'absolute',
            display: hover || !playing ? 'block' : 'none',
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        >
          <Slider
            style={{
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 0,
              paddingTop: 4,
              paddingBottom: 4,
            }}
            max={duration * interval}
            value={progress.playedSeconds * interval}
            onChange={(playedSeconds) => {
              if (playing) {
                setPlaying(false);
              }
              videoRef.current.seekTo(playedSeconds / interval, 'seconds');
              setProgress((progress) => ({
                ...progress,
                playedSeconds: playedSeconds / interval,
              }));
            }}
            onAfterChange={() => {
              // setTimeout makes sure that this is called after onChange
              setTimeout(() => setPlaying(true), 200);
            }}
            // tipFormatter={tip => tip)}
          />

          <Row justify="space-between" style={{ marginLeft: 16, marginRight: 16, marginBottom: 8 }}>
            <Space size="middle">
              {playing ? (
                <PauseOutlined
                  style={styles.icon}
                  onClick={() => setPlaying((playing) => !playing)}
                />
              ) : (
                <CaretRightOutlined
                  style={styles.icon}
                  onClick={() => setPlaying((playing) => !playing)}
                />
              )}
              {muted ? (
                <NotificationOutlined
                  style={styles.icon}
                  onClick={() => setMuted((muted) => !muted)}
                />
              ) : (
                <SoundOutlined style={styles.icon} onClick={() => setMuted((muted) => !muted)} />
              )}
              <div style={{ fontSize: 12, color: 'white' }}>
                {`${progress.playedSeconds} / ${duration}`}
              </div>

              {/* <a download href={url}>
              Download
            </a> */}
            </Space>
            {/* <SpeedSelector playbackSpeed={playbackSpeed} setPlaybackSpeed={setPlaybackSpeed} /> */}
          </Row>
        </div>
      </div>
      {/* <Button style={{ marginTop: 24 }}>Create Clips</Button> */}
      {/* </Card> */}
    </Spin>
  );
};

export default CandidateVideo;
