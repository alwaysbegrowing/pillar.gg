import React from 'react';
import { Button, Card } from 'antd';

const { Meta } = Card;

interface TemplateCardProps {
  template: { name: string; description: string };
  onClick: () => any;
}
function TemplateCard({ onClick, template }: TemplateCardProps) {
  return (
    <Card
      style={{ width: 210 }}
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
