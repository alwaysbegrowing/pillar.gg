import React, { useState } from 'react';
import { Button, DatePicker, Space, Row, Col, Popover } from 'antd';
import { ClockCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

export interface DatePickerFilterDropdownProps {
  startDateValue: number;
  endDateValue: number;
  setStartDateValue: (value: number) => void;
  setEndDateValue: (value: number) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const DatePickerFilterDropdown = (props: DatePickerFilterDropdownProps) => {
  const { startDateValue, endDateValue, setStartDateValue, setEndDateValue, setIsOpen } = props;

  // stores the start and end date values
  // internally
  const [startDate, setStartDate] = useState(startDateValue * 1000);
  const [endDate, setEndDate] = useState(endDateValue * 1000);

  const onDateChange = (date: any) => {
    setStartDate(date[0].unix());
    setEndDate(date[1].unix());
  };

  const onCancel = () => {
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    setIsOpen(false);
  };

  const onSubmit = () => {
    setStartDateValue(startDate);
    setEndDateValue(endDate);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: 8 }}>
      <Space direction="vertical">
        <RangePicker
          allowClear={false}
          defaultValue={[moment(startDate), moment(endDate)]}
          onChange={onDateChange}
        />
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

export interface DatePickerFilterButtonProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  content: React.ReactNode;
}

export const DatePickerFilterButton = (props: DatePickerFilterButtonProps) => {
  const { isOpen, setIsOpen, content } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover
      content={content}
      placement="bottomRight"
      trigger="click"
      visible={isOpen}
      onVisibleChange={handleClick}
    >
      <Button type="text" onClick={handleClick}>
        <ClockCircleTwoTone twoToneColor="#722ed1" />
      </Button>
    </Popover>
  );
};
