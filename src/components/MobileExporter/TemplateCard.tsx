import React from 'react';
import { Button, Card } from 'antd';

const { Meta } = Card;

function TemplateCard({ onClick, template }) {
  return (
    <Card
      style={{ width: 240 }}
      actions={[
        <Button type="default" onClick={onClick}>
          Select
        </Button>,
      ]}
    >
      <Meta
        title={template.name}
        description={template.description}
        style={{ textAlign: 'center' }}
      />
    </Card>
  );
}

export default TemplateCard;
