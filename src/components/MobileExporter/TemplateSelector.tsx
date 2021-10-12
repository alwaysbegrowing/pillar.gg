import React from 'react';
import { Row, Col } from 'antd';
import TemplateCard from './TemplateCard';
import templates from './Templates';
import Stages from './Stages';
import type { TemplateSelectorProps } from '@/types/componentTypes';

function TemplateSelector({ stage, onSelect }: TemplateSelectorProps) {
  return stage !== Stages.SELECT_TEMPLATE ? null : (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {templates.map((template) => (
            <Col key={template.name}>
              <TemplateCard onClick={() => onSelect(template)} template={template} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default TemplateSelector;
