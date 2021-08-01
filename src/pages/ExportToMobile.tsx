import React, { useState, useRef, useCallback, useEffect } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import picture from './HD_transparent_picture.png'
const video = 'https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4'
export default () => {
    const cropperRef = useRef<>(null);
    const onCrop = () => {
      const imageElement: any = cropperRef?.current;
      const cropper: any = imageElement?.cropper;
      // console.log(cropper.getCroppedCanvas().toDataURL());
    };
    const handleSaveMobileEdit = () => {
        setAspectRatio(16 / 3);
        console.log(aspectRatio)
      }
      const videoPlayer = (
        <video playsInline loop
          ref={cropperRef}
          src={video}
        />)
          
  return (
      <div>
              <Cropper
                src={video}
                style={{ height: '100%', width: "100%", position: 'absolute', left: 0, top: 0, paddingLeft: 12, paddingRight: 12 }}
                // Cropper.js options
                // initialAspectRatio={aspectRatio }
                aspectRatio={9/16}
                dragMode={'move'}
                responsive={true}
                restore={true}
                viewMode={1}
                // modal={false}
                // highlight={false}
                autoCropArea={.4}
                background={false}
                movable={false}
                zoomable={false}
                zoomOnTouch={false}
                zoomOnWheel={false}
                toggleDragModeOnDblclick={false}
                crop={onCrop}
                ref={cropperRef}
              />
      </div>
  );
};
