/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import type ReactPlayer from 'react-player/twitch';
import { useClips, useUser } from '../services/hooks/api';
import { Button, Row, Col, notification, Drawer, Space, Popover } from 'antd';
import ClipList from '@/components/ClipList/ClipList';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import TimeSlider from '@/components/TimeSlider/TimeSlider';
import ExportController from '@/components/MobileExporter/ExportController';
import type { IndividualTimestamp } from '@/services/hooks/api';
import { useIntl, history } from 'umi';
import { useTime } from '@/services/hooks/playtime';
import 'cropperjs/dist/cropper.css';
import ExportButton from '@/components/Exports/ExportButton';
import { ClipContext } from '@/services/contexts/ClipContext';
import type { CropConfigs } from '@/services/send';
import { sendHubspotEvent, sendMobileClip } from '@/services/send';
import styled from 'styled-components';
import LoginWithTwitch from '@/components/Login/LoginWithTwitch';
import { ExportOutlined } from '@ant-design/icons';

const HeaderText = styled.div`
  margin-bottom: 8px;
`;

const getStartEndTimeFromClipId = (clipId: string, clips: IndividualTimestamp[]): number[] => {
  if (!clipId) return [0, 1];
  const selectedClip = clips.find((clip) => clip.id === clipId);
  if (!selectedClip) return [0, 1];
  return [selectedClip.startTime, selectedClip.endTime];
};

export default () => {
  const isSmall = window.innerWidth < 768;

  const [isLoadingMobile, setIsLoadingMobile] = useState(false);

  const { data: twitchData, isError: isUserError } = useUser();
  const { id: twitchId } = twitchData || {};
  const { id: videoId } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useClips(videoId);
  const [clips, setClips] = useState<IndividualTimestamp[] | []>([]);
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [selectedClipId, setSelectedClipId] = useState<string>('');
  const [confirmChangeClip, setConfirmChangeClip] = React.useState(false);
  const { formatMessage } = useIntl();
  const [showClipHandles, setShowClipHandles] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [trimClipUpdateValues, setTrimClipUpdateValues] = useState<number[]>([0, 0]);
  const isPlaying = playing && isReady;
  const [startTime, endTime] = getStartEndTimeFromClipId(selectedClipId, clips);
  const [showExportController, setShowExportController] = useState<boolean>(false);
  const [exportInvitationIsVisible, setExportInvitationIsVisible] = useState<boolean>(false);
  const [exportInvitationWasToggled, setExportInvitationWasToggled] = useState<boolean>(false);
  const { setSecPlayed, playedSeconds, isClipOver, intervalInMs } = useTime(
    isPlaying,
    startTime,
    endTime,
  );
  const [drawerWidth, setDrawerWidth] = useState(736);

  const localStorageInvitation = localStorage.getItem('numShownInvitation');
  const startingInvitation = localStorageInvitation ? parseInt(localStorageInvitation) : 0;
  const [numInvitation, setNumInvitation] = useState(startingInvitation);

  useEffect(() => {
    localStorage.setItem('numShownInvitation', numInvitation.toString());
  }, [numInvitation]);

  const isUserLoggedOut = isUserError?.status === 401;
  const seek = useCallback(
    async (seekTime: number) => {
      if (videoRef.current?.seekTo) {
        videoRef.current.seekTo(seekTime, 'seconds');
        setPlaying(true);
      }
    },
    [videoRef],
  );

  const setPlaytime = useCallback(
    (playtime: number) => {
      const newTime = startTime + playtime;
      setSecPlayed(newTime);
      seek(newTime);
    },
    [seek, setSecPlayed, startTime],
  );

  const toggleExportInvitationVisiblity = useCallback(() => {
    setExportInvitationIsVisible(!exportInvitationIsVisible);
    setExportInvitationWasToggled(true);
  }, [exportInvitationIsVisible, setExportInvitationIsVisible]);

  useEffect(() => {
    if (isClipOver) {
      setPlaying(false);
    }
  }, [setPlaying, isClipOver]);

  useEffect(() => {
    if (data && !selectedClipId) {
      console.log(data[0].id);
      setSelectedClipId(data[0].id);
      setPlaytime(data[0].startTime);
    }
  }, [data, selectedClipId, setPlaytime]);

  useEffect(() => {
    if (
      playedSeconds > 5 &&
      !exportInvitationIsVisible &&
      !exportInvitationWasToggled &&
      numInvitation < 3
    ) {
      toggleExportInvitationVisiblity();
      setNumInvitation((i) => i + 1);
    }
  }, [
    exportInvitationIsVisible,
    playedSeconds,
    toggleExportInvitationVisiblity,
    exportInvitationWasToggled,
    numInvitation,
  ]);

  const play = useCallback(
    (seekTime: number, clipId: string) => {
      seek(seekTime);
      setSecPlayed(seekTime);
      setSelectedClipId(clipId);
    },
    [seek, setSelectedClipId, setSecPlayed],
  );

  useEffect(() => {
    if (data) {
      const formattedData = data.map((clip) => {
        if (clip.type === 'ai') {
          return {
            ...clip,
            banner: { sourceAttribution: 'Clipped by Pillar AI (beta)', color: '#b37feb' },
            selected: true,
          };
        }
        if (clip.type === 'manual') {
          return {
            ...clip,
            banner: { sourceAttribution: 'Clipped by !clip', color: '#ffadd2' },
            selected: true,
          };
        }
        if (clip.type === 'ccc') {
          return {
            ...clip,
            banner: { sourceAttribution: `Clipped by ${clip.creator_name}`, color: '#40a9ff' },
          };
        }
        if (clip.type === 'superclip') {
          const sourceAttribution = clip?.creator_name
            ? `Clipped by Pillar AI (beta) & ${clip.creator_name}`
            : 'Clipped by Pillar AI (beta) SuperClip';
          return {
            ...clip,
            banner: {
              sourceAttribution,
              color: '#2f54eb',
            },
          };
        }
        return clip;
      });
      setClips(formattedData);
      console.log(formattedData);
    }
  }, [data]);

  if (isLoading) return formatMessage({ id: 'pages.editor.loading' });
  if (isError) return formatMessage({ id: 'pages.editor.error' });
  if (!data) return formatMessage({ id: 'pages.editor.noData' });

  const selectedThumbnail = clips.find(
    (clip: IndividualTimestamp) => clip.id === selectedClipId,
  )?.thumbnail_url;
  const handleShowOnClick = () => {
    setShowExportController(true);
    setPlaying(false);
  };

  const showSuccessNotification = (successMessage: string) => {
    notification.success({
      message: formatMessage({
        id: 'pages.editor.successNotification.message',
      }),
      description: successMessage,
    });
  };

  const clipLength = Math.round(endTime - startTime);

  const seekToStartTime = () => {
    setPlaytime(trimClipUpdateValues[0]);
  };

  const triggerLoadingStartSequence = async () => {
    const indexOfClipToAdjust = clips.findIndex((clip) => clip.id === selectedClipId);

    clips[indexOfClipToAdjust].startTime += trimClipUpdateValues[0];
    clips[indexOfClipToAdjust].endTime -= clipLength - trimClipUpdateValues[1];

    setClips([...clips]);
    seekToStartTime();
    return true;
  };
  const triggerActiveLoadingButton = async () => {
    setConfirmChangeClip(false);
    return true;
  };
  const triggerLoadingEndAnimation = () => {
    const successMessage = 'Changes saved!';
    showSuccessNotification(successMessage);
    setShowClipHandles(false);
    return true;
  };

  const isCurrentClip = (element: IndividualTimestamp) => element.id === selectedClipId;

  const saveAdjustedClip = async () => {
    if (!trimClipUpdateValues[0]) {
      setConfirmChangeClip(false);
      return true;
    }

    const currentClipIndex = clips.findIndex(isCurrentClip);

    // this poopy code is to hardcode a user feedback sequence when they adjust a clip
    setConfirmChangeClip(true);
    setTimeout(triggerLoadingStartSequence, 1000);
    setTimeout(triggerActiveLoadingButton, 900);
    setTimeout(triggerLoadingEndAnimation, 1600);
    // if(clips[currentClipIndex].selected != true){
    setTimeout(() => {
      clips[currentClipIndex].selected = true;
      return true;
    }, 1600);
    // }

    if (twitchId) {
      sendHubspotEvent(twitchId, 'SAVED_ADJUSTED_CLIP_EVENT', videoId);
    }

    return true;
  };

  const handleSubmitExport = async (cropConfigs: CropConfigs) => {
    setIsLoadingMobile(true);
    setShowExportController(false);

    const resp = await sendMobileClip(videoId, { startTime, endTime }, cropConfigs);

    const successDescription = (
      <React.Fragment>
        Mobile Export has started! <br /> <br />
        <Button onClick={() => history.push('/exports')} type="primary">
          <ExportOutlined />
          View Exports
        </Button>
      </React.Fragment>
    );

    if (resp.status === 200) {
      notification.success({
        message: 'Success',
        description: successDescription,
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Oops! Something went wrong. Please try again.',
      });
    }
    setIsLoadingMobile(false);
  };
  const getClipHandles = () => (
    <Space style={{ marginTop: '6rem' }}>
      <Button onClick={() => setShowClipHandles((flag) => !flag)}>Cancel</Button>
      <Button loading={confirmChangeClip} onClick={saveAdjustedClip}>
        Save Trim
      </Button>
      <Button onClick={seekToStartTime}>Preview</Button>
    </Space>
  );
  const getTrimClipButton = () => (
    <Button
      type="default"
      style={{ marginTop: '6rem' }}
      onClick={() => setShowClipHandles((flag) => !flag)}
    >
      Trim Clip
    </Button>
  );
  const handleAcceptInvitation = () => {
    toggleExportInvitationVisiblity();
    handleShowOnClick();
  };
  const exportInvitationContent = (
    <div>
      <p>
        Click here to easily format this clip to format this clip and make it look amazing for
        social media!
      </p>
      {isUserLoggedOut ? (
        LoginWithTwitch()
      ) : (
        <>
          <Button type="primary" onClick={() => handleAcceptInvitation()}>
            Let's export!
          </Button>
        </>
      )}
      <Button type="text" onClick={toggleExportInvitationVisiblity} style={{ paddingLeft: '1rem' }}>
        Close
      </Button>
    </div>
  );

  return (
    <PageContainer
      content={
        <HeaderText>
          {formatMessage({
            id: 'pages.editor.instructions',
          })}
        </HeaderText>
      }
      extra={
        <>
          <ExportButton
            disabled={isUserLoggedOut}
            videoId={videoId}
            clips={clips?.filter((clip) => clip.selected)}
          />
          <Popover
            content={exportInvitationContent}
            title="Want to export to TikTok? "
            trigger="none"
            visible={exportInvitationIsVisible}
            onVisibleChange={toggleExportInvitationVisiblity}
            placement="bottomLeft"
          >
            <Button
              loading={isLoadingMobile}
              disabled={isUserLoggedOut}
              type="primary"
              onClick={handleShowOnClick}
            >
              {`Export To Mobile ${isUserLoggedOut ? '(login to export)' : ''}`}
            </Button>
          </Popover>
        </>
      }
    >
      <Drawer
        destroyOnClose
        title="Select a Template"
        width={isSmall ? 'auto' : drawerWidth}
        visible={showExportController}
        onClose={() => setShowExportController(false)}
      >
        <ClipContext.Provider
          value={{ startTime, endTime, source: `https://twitch.tv/videos/${videoId}` }}
        >
          <ExportController
            videoUrl={`https://twitch.tv/videos/${videoId}`}
            onConfirm={handleSubmitExport}
            thumbnailUrl={selectedThumbnail}
            setDrawerWidth={setDrawerWidth}
          />
        </ClipContext.Provider>
      </Drawer>

      <Row gutter={[24, 24]} key="a">
        <Col span={16}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <VideoPlayer
              videoRef={videoRef}
              playing={playing}
              setPlaying={setPlaying}
              progress={playedSeconds}
              duration={clipLength}
              onReady={() => setIsReady(true)}
              url={`https://twitch.tv/videos/${videoId}`}
            />

            <Row style={{ marginTop: 12 }}>
              <Col style={{ width: '100%' }}>
                <TimeSlider
                  trimClipUpdateValues={trimClipUpdateValues}
                  setTrimClipUpdateValues={setTrimClipUpdateValues}
                  showClipHandles={!showClipHandles}
                  duration={clipLength}
                  progress={playedSeconds}
                  setPlaytime={setPlaytime}
                  setPlaying={setPlaying}
                  changeInterval={intervalInMs}
                />
                {showClipHandles ? getClipHandles() : getTrimClipButton()}
              </Col>
            </Row>
          </Space>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10} xl={8} xxl={6}>
          <ClipList
            clipInfo={{ clips, setClips }}
            clipIdInfo={{ selectedClipId, setSelectedClipId }}
            play={play}
            videoId={videoId}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};
