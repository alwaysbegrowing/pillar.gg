import React from 'react';
import { Space, Typography, Button } from 'antd';

const { Title, Text } = Typography;

function Prompt({ title, text, buttonText, onNext, onCancel }) {
  return (
    <Space direction="vertical">
      <Title level={5}>{title}</Title>
      <Text>{text}</Text>
      <Space>
        <Button type="primary" onClick={onNext}>
          {buttonText}
        </Button>
        <Button type="primary" onClick={onCancel}>
          Cancel
        </Button>
      </Space>
    </Space>
  );
}

export default Prompt;
