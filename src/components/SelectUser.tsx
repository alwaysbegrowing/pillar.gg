import React, { useContext } from 'react';

import { Select } from 'antd';
import { useDbUsers, useUser } from '../services/hooks/api';
import { GlobalContext } from '../ContextWrapper';

const { Option } = Select;

const SelectUser = () => {
  const { data, isLoading } = useDbUsers();
  const { data: userData } = useUser();
  const { setTwitchId } = useContext(GlobalContext);

  function handleChange(value: number) {
    setTwitchId(value);
  }

  if (isLoading || !userData) return null;

  return (
    <Select style={{ width: 120 }} defaultValue={userData.id} onChange={handleChange}>
      {data.map((user: any) => (
        <Option value={user.twitch_id}>{user.display_name}</Option>
      ))}
    </Select>
  );
};

export default SelectUser;
