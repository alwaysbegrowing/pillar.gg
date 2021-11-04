import React from 'react';
import { Button, Card } from 'antd';
import type { TemplateCardProps } from '@/types/componentTypes';
import ReactPlayer from 'react-player';

const { Meta } = Card;

const Player = ({ url }: any) => <ReactPlayer muted loop width="210px" playing url={url} />;

function TemplateCard({ onClick, template }: TemplateCardProps) {
  return (
    <Card
      cover={<Player url={template.previewUrl} />}
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
