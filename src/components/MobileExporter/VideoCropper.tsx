import React, { useRef, useState } from 'react';
import { Row, Col, Button, Space, Radio, Typography, Divider } from 'antd';
import Cropper from 'react-cropper';
import picture from './HD_transparent_picture.png';

const { Title, Text } = Typography;

enum Stage {
  SELECT_FACE = 'SELECT_FACE',
  SELECT_VID = 'SELECT_VID',
  PREVIEW = 'PREVIEW',
}

const ASPECT_NAN_VAL = -1;
const GUTTER_SIZE = 24;
const INITIAL_ASPECT_RATIO = 4 / 3;

function VideoCropper({ onConfirm, onCancel }) {
  const [stage, setStage] = useState(Stage.SELECT_FACE);
  const [faceCropDimensions, setfaceCropDimensions] = useState({});
  const [videoCropDimensions, setVideoCropDimensions] = useState({});
  const cropperRef = useRef(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const boxData = cropper.getCropBoxData();
    switch (stage) {
      case Stage.SELECT_FACE:
        setfaceCropDimensions(boxData);
        break;
      case Stage.SELECT_VID:
        setVideoCropDimensions(boxData);
        break;
      default:
        break;
    }
  };

  const updateAspectRatio = (val: number) => {
    const ratio = val === ASPECT_NAN_VAL ? NaN : val;
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.setAspectRatio(ratio);
  };

  const PromptA = () => {
    return (
      <Space direction="vertical">
        <Title level={5}>Select Your Face</Title>
        <Text>Position and resize the window over your face camera.</Text>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              setStage(Stage.SELECT_VID);
            }}
          >
            Save and Continue
          </Button>
        </Col>
      </Space>
    );
  };

  const PromptB = () => {
    return (
      <Space direction="vertical">
        <Title level={5}>Select Your Gameplay</Title>
        <Text>Position and resize the window over your desired gameplay region.</Text>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              setStage(Stage.PREVIEW);
            }}
          >
            Save and Continue
          </Button>
        </Col>
      </Space>
    );
  };

  const PromptC = () => {
    return (
      <Space direction="vertical">
        <Title level={5}>Preview Results</Title>
        <Text>Verify the footage looks correct.</Text>
        <Col span={24}>
          <Space>
            <Button
              type="primary"
              onClick={() => onConfirm(faceCropDimensions, videoCropDimensions)}
            >
              Confirm
            </Button>
            <Button type="primary" onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Col>
      </Space>
    );
  };

  let promptUser;
  switch (stage) {
    case Stage.SELECT_FACE:
      promptUser = <PromptA />;
      break;
    case Stage.SELECT_VID:
      promptUser = <PromptB />;
      break;
    case Stage.PREVIEW:
      promptUser = <PromptC />;
      break;
    default:
      promptUser = <></>;
  }

  return (
    <Row gutter={GUTTER_SIZE} align="middle" key="b">
      <Col span={14}>
        <video
          style={{
            position: 'absolute',
            width: '100%',
            // Ensure video is aligned with cropper within antd columnm
            paddingRight: `${GUTTER_SIZE}px`,
          }}
          src={`https://prod-prodthumbnails.s3.amazonaws.com/42991276973-offset-15812.mp4`}
        />
        <Cropper
          src={picture}
          initialAspectRatio={INITIAL_ASPECT_RATIO}
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
        {/* <Space direction="vertical"> */}
        <Row>{promptUser}</Row>
        <Divider />
        <Title level={5}>Change Aspect Ratio</Title>
        <Row>
          <Radio.Group
            value={INITIAL_ASPECT_RATIO}
            onChange={(e) => updateAspectRatio(e.target.value)}
          >
            <Radio.Button value={1}>1:1</Radio.Button>
            <Radio.Button value={4 / 3}>4:3</Radio.Button>
            <Radio.Button value={16 / 9}>16:9</Radio.Button>
            <Radio.Button value={16 / 10}>16:10</Radio.Button>
            <Radio.Button value={ASPECT_NAN_VAL}>Free</Radio.Button>
          </Radio.Group>
        </Row>
        {/* </Space> */}
      </Col>
    </Row>
  );
}

export default VideoCropper;
