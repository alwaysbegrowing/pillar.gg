import React, { useRef, useState } from 'react';
import { Row, Col, Button } from 'antd';
import Cropper from 'react-cropper';
import picture from './HD_transparent_picture.png';

const gutterSize = 24;

function VideoCropper() {
  const [aspectRatio, setAspectRatio] = useState<number>(4 / 3);
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCropBoxData());
  };

  return (
    <Row gutter={gutterSize} align="middle" key="b">
      <Col span={14}>
        <video
          style={{
            position: 'absolute',
            maxWidth: '100%',
            // Ensure video is aligned with cropper within antd columnm
            paddingRight: `${gutterSize}px`,
          }}
          src={`https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4`}
        />
        <Cropper
          src={picture}
          aspectRatio={4 / 3}
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
          crop={onCrop}
          ref={cropperRef}
        />
      </Col>
      <Col span={8}>
        <div>Position the window on your face cam.</div>
        <br />
        <div>
          <Button type="primary" onClick={() => {}}>
            Save and Continue
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default VideoCropper;
