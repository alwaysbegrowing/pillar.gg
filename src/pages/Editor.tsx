import React, { useState, useRef, useCallback, useEffect } from 'react';
import type ReactPlayer from 'react-player/twitch';
import { useClips, useVideo } from '../services/hooks/api';
import { Button, Row, Col, Popconfirm } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ClipList from '../components/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '../components/VideoPlayer';
import type { IndividualTimestamp } from '../services/hooks/api';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/Stripe/CheckoutForm";
import './Editor.css';

const promise = loadStripe("pk_test_51ImP67FDvrBp8Tj0MMvZTLbZYPznpj2wiHIxJ9Su2eEFHhEp3tOuEwUEBw8AqG4JI61zEwPaNzCs7xOJ5lXqAqAs007iMPcfPG");



interface ProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const sendClips = (videoId: string, clips: IndividualTimestamp[]) => {
  const data = { videoId, clips };

  fetch('https://k4r85s4uyh.execute-api.us-east-1.amazonaws.com/prod/clips', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const getStartEndTimeFromClipId = (clipId: string): number[] => clipId.split('-').map(Number);

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useClips(id);

  const [clips, setClips] = useState<IndividualTimestamp[] | null>(null);

  const { data: videoData } = useVideo(id);
  const { thumbnail_url } = videoData || {};
  const thumbnail = thumbnail_url
    ? thumbnail_url.replace('%{width}', '195').replace('%{height}', '108')
    : '';

  const videoRef = useRef<ReactPlayer>(null);

  const seek = useCallback(
    (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime);
      }
    },
    [videoRef],
  );

  const [playing, setPlaying] = useState<boolean>(false);
  const [secondsPlayed, setSecondsPlayed] = useState<number>(0);
  const [isCombineButtonDisabled, setIsCombineButtonDisabled] = useState<boolean>(false);

  const [selectedClipId, setSelectedClipId] = useState<string>('');

  const play = useCallback(
    (seekTime: number, clipId: string) => {
      seek(seekTime);
      setSecondsPlayed(seekTime);
      setPlaying(true);
      setSelectedClipId(clipId);
    },
    [seek, setSecondsPlayed, setPlaying, setSelectedClipId],
  );

  useEffect(() => {
    if (data) {
      const clipsDefaultChecked = data.algo1.map((timestamp) => ({ ...timestamp, selected: true }));
      setClips(clipsDefaultChecked);
    }
  }, [data]);

  if (isLoading) return 'loading...';
  if (isError) return 'error';
  if (!data) return 'no data';

  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId);

  const onProgress = ({ playedSeconds }: ProgressProps) => {
    setSecondsPlayed((seconds) => {
      if (Math.abs(playedSeconds - seconds) > 5) return seconds;
      if (playedSeconds > endTime) {
        setPlaying(false);
        return startTime;
      }
      return playedSeconds;
    });
  };

  const clipLength = Math.round(endTime - startTime);
  const clipTimePlayed = Math.round(secondsPlayed - startTime);

  const combineClips = () => {
    if (clips) {
      const selectedClips = clips.filter((clip) => clip.selected);
      setIsCombineButtonDisabled(true);
      sendClips(id, selectedClips);
    }
  };

  const popConfirmText = () => {
    const flag = false;
    let text = null;
    if(flag)
    {
       text =
        <div>
          <div>Are you ready to export your video?</div>
          <div>You will receive an email with the combined video once it has been processed.</div>
          <div>You can only do this once per VOD.</div>
          <Button>Add Credit Card</Button>
        </div>
        } else{
      text = <div><Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
      </div>

    }
    return text;
  }

  return (
    <PageContainer
      content="Hide clips you don't want in your compilation video. Click and drag
      clips to re-order them on the timeline. Click the Export Video button when you are ready. "
      extra={
        <Popconfirm
          title={
           popConfirmText
          }
          onConfirm={combineClips}
          // onCancel={cancel}
          okText="Export"
          cancelText="Nevermind"
        >
          <Button
            // onClick={combineClips}
            style={{ marginLeft: 24 }}
            type="primary"
            disabled={isCombineButtonDisabled}
            icon={<DownloadOutlined />}
          >
           Export Video
          </Button>
          {}
        </Popconfirm>
      }
    >
      <Row justify="center" gutter={24}>
        <Col span={10} style={{ marginBottom: 24 }}>
          <VideoPlayer
            videoRef={videoRef}
            playing={playing}
            setPlaying={setPlaying}
            progress={clipTimePlayed}
            onProgress={onProgress}
            controlKeys
            duration={clipLength}
            url={`https://twitch.tv/videos/${id}`}
          />
        </Col>
        <Col span={24}>
          {data.algo1 && clips && (
            <ClipList
              clipInfo={{ clips, setClips }}
              selectedClipId={selectedClipId}
              play={play}
              thumbnail={thumbnail}
            />
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};
