import React, { useRef, useState } from 'react';
import { Row, Col, Radio, Typography, Divider } from 'antd';
import Cropper from 'react-cropper';
import CropPreview from './CropPreview';
import TemplateSelector from './TemplateSelector';
import picture from './HD_transparent_picture.png';
import FaceCamPrompt from './FaceCamPrompt';
import GameplayPrompt from './GameplayPrompt';
import PreviewPrompt from './PreviewPrompt';
import Stages from './Stages';

const { Title } = Typography;

const ASPECT_NAN_VAL = -1;
const GUTTER_SIZE = 24;

function ExportController({ onConfirm, onCancel }) {
  const [template, setTemplate] = useState(null);
  const [stage, setStage] = useState(Stages.SELECT_TEMPLATE);
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

  const handleFaceCamSelected = () => {
    setFaceCropDimensions(getCropData());
    if (template) {
      updateAspectRatio(template.gameplay.aspect);
    }
    setStage(Stages.SELECT_VID);
  };

  const handleGameplaySelected = () => {
    setVideoCropDimensions(getCropData());
    setStage(Stages.PREVIEW);
  };

  const handlePreviewAccepted = () => onConfirm(faceCropDimensions, videoCropDimensions);

  return (
    <>
      {stage === Stages.SELECT_TEMPLATE ? (
        <TemplateSelector
          onSelect={(selection) => {
            setTemplate(selection);
            setStage(Stages.SELECT_FACE);
          }}
        />
      ) : (
        <Row gutter={GUTTER_SIZE}>
          <Col span={14}>
            {stage === Stages.PREVIEW ? (
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
            <Row>
              <FaceCamPrompt stage={stage} onNext={handleFaceCamSelected} onCancel={onCancel} />
              <GameplayPrompt stage={stage} onNext={handleGameplaySelected} onCancel={onCancel} />
              <PreviewPrompt stage={stage} onNext={handlePreviewAccepted} onCancel={onCancel} />
            </Row>
            {stage !== Stages.PREVIEW && !template && (
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

export default ExportController;
