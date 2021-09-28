import React, { useState, useEffect } from 'react';
import ClipPlayer from '@/components/ClipPlayer';

function useVideoPreview(template, faceCrop, highlightCrop, width, height) {
  const [playing, setPlaying] = useState(false);
  const [readyCount, setReadyCount] = useState(0);

  const highlightWidth = template.highlight.height * template.highlight.aspect;
  const highlightScale = highlightWidth / highlightCrop.width;

  const onReady = () => setReadyCount(readyCount + 1);

  let needed = 0;
  if (template.face) {
    needed += 1;
  }
  if (template.highlight) {
    needed += 1;
  }
  if (template.background) {
    needed += +1;
  }

  useEffect(() => {
    if (readyCount === needed) {
      setPlaying(true);
    }
  }, [readyCount, needed]);

  const styles = {
    highlight: {
      position: 'absolute',
      top: `${-highlightCrop.top * highlightScale}px`,
      left: `${-highlightCrop.left * highlightScale}px`,
    },
    face: {},
    background: {
      position: 'absolute',
      top: '0px',
      left: `${-(1920 - width) / 2}px`,
      filter: 'blur(10px)',
    },
  };

  let facePreview = null;
  if (template.face) {
    const faceWidth = template.face.height * template.face.aspect;
    const faceScale = faceWidth / faceCrop.width;

    styles.face = {
      position: 'absolute',
      top: `${-faceCrop.top * faceScale}px`,
      left: `${-faceCrop.left * faceScale}px`,
    };

    facePreview = (
      <>
        <div
          style={{
            position: 'absolute',
            top: `${template.face.top}px`,
            left: `${(width - faceWidth) / 2}px`,
            width: `${faceWidth}px`,
            height: `${template.face.height}px`,
            overflow: 'hidden',
          }}
        >
          <ClipPlayer
            style={styles.face}
            width={`${1920 * faceScale}px`}
            height={`${1080 * faceScale}px`}
            onReady={onReady}
            play={playing}
          />
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {facePreview}
      <div
        style={{
          position: 'absolute',
          top: `${template.highlight.top}px`,
          left: `${(width - highlightWidth) / 2}px`,
          width: `${highlightWidth}px`,
          height: `${template.highlight.height}px`,
          overflow: 'hidden',
        }}
      >
        <ClipPlayer
          style={styles.highlight}
          width={`${1920 * highlightScale}px`}
          height={`${1080 * highlightScale}px`}
          onReady={onReady}
          play={playing}
        />
      </div>
      {template.background && (
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
            zIndex: -1,
          }}
        >
          <ClipPlayer
            style={styles.background}
            width={'1920px'}
            height={'1080px'}
            onReady={onReady}
            play={playing}
          />
        </div>
      )}
    </div>
  );
}

export default useVideoPreview;
