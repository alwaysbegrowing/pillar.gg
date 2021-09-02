import React from 'react';

function useVideoPreview(template, faceCrop, gameplayCrop, outputWidth, outputHeight) {
  const faceRatio = faceCrop.height / faceCrop.width;
  const adjustedFaceHeight = outputWidth * faceRatio;

  const gameplayRatio = gameplayCrop.height / gameplayCrop.width;
  const adjustedGameplayHeight = outputWidth * gameplayRatio;

  const offsetFromTop = (outputHeight - (adjustedFaceHeight + adjustedGameplayHeight)) / 2;

  const faceScale = outputWidth / faceCrop.width;
  const gameplayScale = outputWidth / gameplayCrop.width;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: `${offsetFromTop}px`,
          width: `${outputWidth}px`,
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
          width: `${outputWidth}px`,
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
    </>
  );
}

export default useVideoPreview;
