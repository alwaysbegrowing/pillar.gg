import React from 'react';
import { Button, Card } from 'antd';
import type { TemplateCardProps } from '@/types/componentTypes';

const { Meta } = Card;

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
