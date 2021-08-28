import React from 'react';
import { Row } from 'antd';
import './device.min.css';

const SCREEN_HEIGHT = 812;
const SCREEN_WIDTH = 375;

function CropPreview({ face, video }) {
  const faceRatio = face.height / face.width;
  const adjustedFaceHeight = SCREEN_WIDTH * faceRatio;

  const videoRatio = video.height / video.width;
  const adjustedVideoHeight = SCREEN_WIDTH * videoRatio;

  const offsetFromTop = (SCREEN_HEIGHT - (adjustedFaceHeight + adjustedVideoHeight)) / 2;

  return (
    <Row justify="center">
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">
          <div
            style={{
              position: 'absolute',
              top: `${offsetFromTop}px`,
              width: `${SCREEN_WIDTH}px`,
              height: `${adjustedFaceHeight}px`,
              background: 'yellow',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: `${offsetFromTop + adjustedFaceHeight}px`,
              width: `${SCREEN_WIDTH}px`,
              height: `${adjustedVideoHeight}px`,
              background: 'red',
            }}
          ></div>
        </div>
      </div>
    </Row>
  );
}

export default CropPreview;
