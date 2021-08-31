import React from 'react';
import { Row } from 'antd';
import './device.min.css';

const SCREEN_HEIGHT = 812;
const SCREEN_WIDTH = 375;

function CropPreview({ face, gameplay }) {
  const faceRatio = face.height / face.width;
  const adjustedFaceHeight = SCREEN_WIDTH * faceRatio;

  const gameplayRatio = gameplay.height / gameplay.width;
  const adjustedGameplayHeight = SCREEN_WIDTH * gameplayRatio;

  const offsetFromTop = (SCREEN_HEIGHT - (adjustedFaceHeight + adjustedGameplayHeight)) / 2;

  const faceScale = SCREEN_WIDTH / face.width;
  const gameplayScale = SCREEN_WIDTH / gameplay.width;

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
              overflow: 'hidden',
              background: 'red',
            }}
          >
            <video
              loop
              autoPlay
              style={{
                position: 'absolute',
                top: `${-face.top * faceScale}px`,
                left: `${-face.left * faceScale}px`,
                width: `${1920 * faceScale}px`,
              }}
              src={`https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4`}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: `${offsetFromTop + adjustedFaceHeight}px`,
              width: `${SCREEN_WIDTH}px`,
              height: `${adjustedGameplayHeight}px`,
              overflow: 'hidden',
              background: 'yellow',
            }}
          >
            <video
              loop
              autoPlay
              style={{
                position: 'absolute',
                top: `${-gameplay.top * gameplayScale}px`,
                left: `${-gameplay.left * gameplayScale}px`,
                width: `${1920 * gameplayScale}px`,
              }}
              src={`https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4`}
            />
          </div>
        </div>
      </div>
    </Row>
  );
}

export default CropPreview;
