import React, { useState } from 'react';
import Prompt from './Prompt';
import { Col, Row, Radio, Divider, Typography } from 'antd';
import Stages from './Stages';

const { Title } = Typography;

function FaceCamPrompt({ stage, template, cropper, onNext, onCancel }) {
  const [aspectRatio, setAspectRatio] = useState(template.face?.aspect);

  return stage !== Stages.SELECT_FACE ? null : (
    <Row gutter={24}>
      <Col span={16}>{cropper.element}</Col>
      <Col span={8}>
        <Prompt
          title="Select Your Face"
          text="Position and resize the window over your face camera."
          onNext={onNext}
          onCancel={onCancel}
          buttonText="Next"
        />
        {!template.lockAspectRatio && (
          <>
            <Divider />
            <Title level={5}>Change Aspect Ratio</Title>
            <Row>
              <Radio.Group
                value={aspectRatio}
                onChange={(e) => {
                  cropper.setAspectRatio(e.target.value);
                  setAspectRatio(e.target.value);
                }}
              >
                <Radio.Button value={1}>1:1</Radio.Button>
                <Radio.Button value={4 / 3}>4:3</Radio.Button>
                <Radio.Button value={16 / 9}>16:9</Radio.Button>
                <Radio.Button value={16 / 10}>16:10</Radio.Button>
                <Radio.Button value={-1}>Free</Radio.Button>
              </Radio.Group>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}

export default FaceCamPrompt;
