import React from 'react';
import { Typography, Row, Space, Col } from 'antd';
import TemplateCard from './TC';
import templates from './Templates';

const { Title } = Typography;

function TemplateSelector({ onSelect }) {
  return (
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
