import React from 'react';
import { Typography, Row, Col } from 'antd';
import TemplateCard from './TC';
import templates from './Templates';
import Stages from './Stages';

const { Title } = Typography;

function TemplateSelector({ stage, onSelect }) {
  return stage !== Stages.SELECT_TEMPLATE ? null : (
    <>
      <Row>
        <Title level={5}>Select A Template</Title>
      </Row>

      <Row gutter={[24, 24]}>
        {templates.map((template) => (
          <Col>
            <TemplateCard onClick={() => onSelect(template)} template={template} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default TemplateSelector;
