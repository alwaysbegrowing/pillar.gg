import React, { useState, useRef } from 'react';
import { Row, Col, Divider, Radio, Typography } from 'antd';
import Prompt from './Prompt';
import Stages from './Stages';
import VideoCropper from './VideoCropper';

const { Title } = Typography;

const ASPECT_NAN_VAL = -1;
const GUTTER_SIZE = 24;

function GameplayPrompt({ stage, template, onNext, onCancel }) {
  const [aspectRatio, setAspectRatio] = useState(template.face.aspect);
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

  return stage !== Stages.SELECT_VID ? null : (
    <Row gutter={GUTTER_SIZE}>
      <Col span={16}>
        <VideoCropper ref={cropperRef} aspectRatio={aspectRatio} rightPadding={GUTTER_SIZE} />
      </Col>
      <Col span={8}>
        <Prompt
          title="Select Your Gameplay"
          text="Position and resize the window over your desired gameplay region."
          onNext={onNext}
          onCancel={onCancel}
          buttonText="Next"
        />
        {!template.lockAspectRatio && (
          <>
            <Divider />
            <Title level={5}>Change Aspect Ratio</Title>
            <Row>
              <Radio.Group value={aspectRatio} onChange={(e) => updateAspectRatio(e.target.value)}>
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
  );
}

export default GameplayPrompt;
