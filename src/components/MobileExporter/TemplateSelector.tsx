import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import TemplateCard from './TemplateCard';
import templates from './Templates';
import Stages from './Stages';

const { Title } = Typography;

function TemplateSelector({ stage, onSelect, onCancel }) {
  return stage !== Stages.SELECT_TEMPLATE ? null : (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row>
          <Title level={4}>Select A Template</Title>
        </Row>
        <Row gutter={[24, 24]}>
          {templates.map((template) => (
            <Col key={template.name}>
              <TemplateCard onClick={() => onSelect(template)} template={template} />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={onCancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );
}

export default TemplateSelector;
