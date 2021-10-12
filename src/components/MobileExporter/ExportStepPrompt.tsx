import React from 'react';
import { Space, Typography, Button } from 'antd';

const { Title, Text } = Typography;

interface PromptProps {
  title: string;
  text: string;
  buttonText: string;
  onNext: () => any;
}
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
