import React, { useRef } from 'react';
import VideoCropper from '../../components/MobileExporter/VideoCropper';

const ASPECT_NAN_VAL = -1;

const useVideoCropper = (aspectRatio: number, videoUrl: string, thumbnailUrl: string) => {
  const cropperRef = useRef(null);

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    return cropper;
  };

  const getCropData = () => {
    const cropper = getCropper();
    const cropDimensions = cropper.getCropBoxData();
    const onScreenWidth: any = cropper.containerData.width;
    const actualWidth: any = cropperRef?.current.width;
    const scale = actualWidth / onScreenWidth;

    return {
      left: cropDimensions.left * scale,
      top: cropDimensions.top * scale,
      width: cropDimensions.width * scale,
      height: cropDimensions.height * scale,
    };
  };

  const setAspectRatio = (val: number): void => {
    const ratio = val === ASPECT_NAN_VAL ? NaN : val;
    getCropper().setAspectRatio(ratio);
  };

  const element = (
    <VideoCropper
      ref={cropperRef}
      thumbnailUrl={thumbnailUrl}
      aspectRatio={aspectRatio}
      videoUrl={videoUrl}
    />
  );

  return { element, getCropData, setAspectRatio };
};

export default useVideoCropper;
