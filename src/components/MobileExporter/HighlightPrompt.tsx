import React, { useState } from 'react';
import { Row, Col, Divider, Radio, Typography } from 'antd';
import Prompt from './Prompt';
import Stages from './Stages';

const { Title } = Typography;

function HighlightPrompt({ stage, template, cropper, onNext, onCancel }) {
  const [aspectRatio, setAspectRatio] = useState(template.highlight.aspect);

  return stage !== Stages.SELECT_HIGHLIGHT ? null : (
    <Row gutter={24}>
      <Col span={16}>{cropper.element}</Col>
      <Col span={8}>
        <Prompt
          title="Select Your Highlight"
          text="Position and resize the window over your desired highlight region."
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

export default HighlightPrompt;
