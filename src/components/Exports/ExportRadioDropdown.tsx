import React, { useState } from 'react';
import { Col, Button, Row, Space, Radio } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

export interface RadioDropdownProps extends FilterDropdownProps {
  value: any;
  setValue: (value: any) => void;
}

const RadioFilterPopover = (props: RadioDropdownProps) => {
  const { confirm, filters, value, setValue } = props;

  const [selectedRadio, setSelectedRadio] = useState(value);

  const handleRadioChange = (e: any) => {
    setSelectedRadio(e.target.value);
  };

  const renderRadios = () => {
    if (!filters) {
      return null;
    }

    const radios = filters.map((filter: any) => {
      return (
        <Radio value={filter.value} key={filter.value}>
          {filter.text}
        </Radio>
      );
    });

    return (
      <Radio.Group onChange={handleRadioChange} value={selectedRadio}>
        <Space direction="vertical">{radios}</Space>
      </Radio.Group>
    );
  };

  const onSubmit = () => {
    setValue(selectedRadio);
    confirm({ closeDropdown: true });
  };

  const onCancel = () => {
    setValue(value);
    confirm({ closeDropdown: true });
  };

  return (
    <div style={{ padding: 8 }}>
      <Space direction="vertical">
        {renderRadios()}
        <Row gutter={6}>
          <Col>
            <Button size="small" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button size="small" type="primary" onClick={onSubmit}>
              Ok
            </Button>{' '}
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default RadioFilterPopover;
