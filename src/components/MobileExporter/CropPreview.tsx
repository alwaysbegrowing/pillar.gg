import React from 'react';
import { Row } from 'antd';
import Phone from './Phone';
import usePreviewVideo from '../../services/hooks/useVideoPreview';

const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;

function CropPreview({ faceCrop, gameplayCrop, template }) {
  const previewVideo = usePreviewVideo(
    template,
    faceCrop,
    gameplayCrop,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
  );

  return (
    <Row justify="center">
      <Phone>{previewVideo}</Phone>
    </Row>
  );
}

export default CropPreview;
