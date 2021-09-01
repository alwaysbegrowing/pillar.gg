import React from 'react';
import { Row } from 'antd';
import './device.min.css';

const SCREEN_HEIGHT = 812;
const SCREEN_WIDTH = 375;

function CropPreview({ faceCrop, gameplayCrop, template }) {
  const faceRatio = faceCrop.height / faceCrop.width;
  const adjustedFaceHeight = SCREEN_WIDTH * faceRatio;

  const gameplayRatio = gameplayCrop.height / gameplayCrop.width;
  const adjustedGameplayHeight = SCREEN_WIDTH * gameplayRatio;

  const offsetFromTop = (SCREEN_HEIGHT - (adjustedFaceHeight + adjustedGameplayHeight)) / 2;

  const faceScale = SCREEN_WIDTH / faceCrop.width;
  const gameplayScale = SCREEN_WIDTH / gameplayCrop.width;

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
                top: `${-faceCrop.top * faceScale}px`,
                left: `${-faceCrop.left * faceScale}px`,
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
                top: `${-gameplayCrop.top * gameplayScale}px`,
                left: `${-gameplayCrop.left * gameplayScale}px`,
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
