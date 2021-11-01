import React from 'react';
import { Col, Row } from 'antd';
import Prompt from './ExportStepPrompt';
import Stages from './Stages';
import CropPreview from './CropPreview';

function PreviewPrompt({ stage, template, faceCropDimensions, highlightCropDimensions, onNext }) {
  return stage !== Stages.PREVIEW ? null : (
    <Row gutter={24}>
      <Col span={16}>
        <CropPreview
          faceCrop={faceCropDimensions}
          gameplayCrop={highlightCropDimensions}
          template={template}
        />
      </Col>
      <Col span={8}>
        <Prompt
          title="Preview Results"
          text="Verify the footage looks correct."
          onNext={onNext}
          buttonText="Accept and Export"
        />
      </Col>
    </Row>
  );
}

export default PreviewPrompt;
