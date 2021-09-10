import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import picture from './HD_transparent_picture.png';
import ReactPlayer from 'react-player/twitch';

const VideoCropper = React.forwardRef(({ aspectRatio, videoUrl }, ref) => {
  const videoRef = useRef(null);

  const playerStyles = {
    position: 'absolute',
    width: '100%',
    // Ensure video is aligned with cropper within antd columnm
    padding: 'inherit',
    left: 0,
  };

  return (
    <>
      <ReactPlayer
        key={videoUrl}
        onReady={() => {}}
        style={playerStyles}
        ref={videoRef}
        height="100%"
        width="100%"
        playing={true}
        muted={false}
        url={videoUrl}
        loop={true}
        onPlay={() => {}}
      />
      <Cropper
        src={picture}
        aspectRatio={aspectRatio}
        dragMode={'move'}
        responsive={true}
        restore={true}
        viewMode={1}
        autoCropArea={0.4}
        background={false}
        movable={false}
        zoomable={false}
        zoomOnTouch={false}
        zoomOnWheel={false}
        toggleDragModeOnDblclick={false}
        crop={() => {}}
        ref={ref}
      />
    </>
  );
});

export default VideoCropper;
