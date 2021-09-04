import React from 'react';
import Cropper from 'react-cropper';
import picture from './HD_transparent_picture.png';

const VideoCropper = React.forwardRef(({ rightPadding, aspectRatio }, ref) => (
  <>
    <video
      loop
      autoPlay
      style={{
        position: 'absolute',
        width: '100%',
        // Ensure video is aligned with cropper within antd columnm
        paddingRight: `${rightPadding}px`,
      }}
      src={`https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4`}
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
));

export default VideoCropper;
