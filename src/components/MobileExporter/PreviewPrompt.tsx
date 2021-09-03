import React from 'react';
import { Col, Row } from 'antd';
import Prompt from './Prompt';
import Stages from './Stages';
import CropPreview from './CropPreview';

const GUTTER_SIZE = 24;

function PreviewPrompt({
  stage,
  template,
  faceCropDimensions,
  videoCropDimensions,
  onNext,
  onCancel,
}) {
  return stage !== Stages.PREVIEW ? null : (
    <Row gutter={GUTTER_SIZE}>
      <Col span={16}>
        <CropPreview
          faceCrop={faceCropDimensions}
          gameplayCrop={videoCropDimensions}
          template={template}
        />
      </Col>
      <Col span={8}>
        <Prompt
          title="Preview Results"
          text="Verify the footage looks correct."
          onNext={onNext}
          onCancel={onCancel}
          buttonText="Accept and Export"
        />
      </Col>
    </Row>
  );
}

export default PreviewPrompt;
