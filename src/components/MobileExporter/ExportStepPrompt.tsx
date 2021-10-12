import React from 'react';
import { Space, Typography, Button } from 'antd';
import type { PromptProps } from '@/types/componentTypes';
const { Title, Text } = Typography;

function Prompt({ title, text, buttonText, onNext }: PromptProps) {
  return (
    <Space direction="vertical">
      <Title level={5}>{title}</Title>
      <Text>{text}</Text>
      <Space>
        <Button type="primary" onClick={onNext}>
          {buttonText}
        </Button>
      </Space>
    </Space>
  );
}

export default Prompt;
