import React from 'react';
import Cropper from 'react-cropper';
import { Image } from 'antd';
import picture from './HD_transparent_picture.png';

const VideoCropper = React.forwardRef(({ aspectRatio, thumbnailUrl }, ref) => {
  const playerStyles = {
    position: 'absolute',
    width: '100%',
    // Ensure video is aligned with cropper within antd columnm
    padding: 'inherit',
    left: 0,
  };

  // style for cropbox to look correct
  // .cropBox {box-shadow: 0 0 0 9999px rgb(0 0 0 / 50%)};

  return (
    <>
      <div style={playerStyles}>
        <Image width="100%" src={thumbnailUrl} />
      </div>
      <Cropper
        src={picture}
        aspectRatio={aspectRatio}
        dragMode={'move'}
        responsive={true}
        restore={true}
        highlight={false}
        modal={false}
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
        style={{ overflow: 'hidden' }}
      />
    </>
  );
});

export default VideoCropper;
