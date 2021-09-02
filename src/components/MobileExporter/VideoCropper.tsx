import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Button, Space, Radio, Typography, Divider } from 'antd';
import Cropper from 'react-cropper';
import CropPreview from './CropPreview';
import TemplateSelector from './TemplateSelector';
import picture from './HD_transparent_picture.png';

const { Title, Text } = Typography;

enum Stage {
  SELECT_TEMPLATE = 0,
  SELECT_FACE = 1,
  SELECT_VID = 2,
  PREVIEW = 3,
}

const ASPECT_NAN_VAL = -1;
const GUTTER_SIZE = 24;

function VideoCropper({ onConfirm, onCancel }) {
  const [template, setTemplate] = useState(null);
  const [stage, setStage] = useState(Stage.SELECT_TEMPLATE);
  const [faceCropDimensions, setFaceCropDimensions] = useState({});
  const [videoCropDimensions, setVideoCropDimensions] = useState({});
  const [aspectRatio, setAspectRatio] = useState(template ? template.face.aspect : 4 / 3);
  const cropperRef = useRef(null);

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    return cropper;
  };

  const updateAspectRatio = (val: number) => {
    setAspectRatio(val);
    const ratio = val === ASPECT_NAN_VAL ? NaN : val;
    getCropper().setAspectRatio(ratio);
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

  const CancelButton = () => {
    return (
      <Button type="primary" onClick={onCancel}>
        Cancel
      </Button>
    );
  };

  const Prompt = ({ title, text, buttonText, onNext }) => (
    <Space direction="vertical">
      <Title level={5}>{title}</Title>
      <Text>{text}</Text>
      <Col span={24}>
        <Space>
          <Button type="primary" onClick={onNext}>
            {buttonText}
          </Button>
          <CancelButton />
        </Space>
      </Col>
    </Space>
  );

  const promptA = (
    <Prompt
      title="Select Your Face"
      text="Position and resize the window over your face camera."
      onNext={() => {
        setFaceCropDimensions(getCropData());
        if (template) {
          updateAspectRatio(template.gameplay.aspect);
        }
        setStage(Stage.SELECT_VID);
      }}
      buttonText="Next"
    />
  );

  const promptB = (
    <Prompt
      title="Select Your Gameplay"
      text="Position and resize the window over your desired gameplay region."
      onNext={() => {
        setVideoCropDimensions(getCropData());
        setStage(Stage.PREVIEW);
      }}
      buttonText="Next"
    />
  );

  const promptC = (
    <Prompt
      title="Preview Results"
      text="Verify the footage looks correct."
      onNext={() => onConfirm(faceCropDimensions, videoCropDimensions)}
      buttonText="Accept and Export"
    />
  );

  let promptUser;
  switch (stage) {
    case Stage.SELECT_FACE:
      promptUser = promptA;
      break;
    case Stage.SELECT_VID:
      promptUser = promptB;
      break;
    case Stage.PREVIEW:
      promptUser = promptC;
      break;
    default:
      promptUser = <></>;
  }

  return (
    <>
      {stage === Stage.SELECT_TEMPLATE ? (
        <TemplateSelector
          onSelect={(selection) => {
            setTemplate(selection);
            setStage(Stage.SELECT_FACE);
          }}
        />
      ) : (
        <Row gutter={GUTTER_SIZE}>
          <Col span={14}>
            {stage === Stage.PREVIEW ? (
              <CropPreview
                faceCrop={faceCropDimensions}
                gameplayCrop={videoCropDimensions}
                template={template}
              />
            ) : (
              <>
                <video
                  loop
                  autoPlay
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
                  aspectRatio={aspectRatio}
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
                  crop={() => {}}
                  ref={cropperRef}
                />
              </>
            )}
          </Col>
          <Col span={8}>
            <Row>{promptUser}</Row>
            {stage !== Stage.PREVIEW && !template && (
              <>
                <Divider />
                <Title level={5}>Change Aspect Ratio</Title>
                <Row>
                  <Radio.Group
                    value={aspectRatio}
                    onChange={(e) => updateAspectRatio(e.target.value)}
                  >
                    <Radio.Button value={1}>1:1</Radio.Button>
                    <Radio.Button value={4 / 3}>4:3</Radio.Button>
                    <Radio.Button value={16 / 9}>16:9</Radio.Button>
                    <Radio.Button value={16 / 10}>16:10</Radio.Button>
                    <Radio.Button value={ASPECT_NAN_VAL}>Free</Radio.Button>
                  </Radio.Group>
                </Row>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default VideoCropper;
