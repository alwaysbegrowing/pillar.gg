import React, { useContext } from 'react';

import { Select } from 'antd';
import { useDbUsers, useUser } from '../services/hooks/api';
import { GlobalContext } from '../ContextWrapper';

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

const SelectUser = () => {
  const { data, isLoading } = useDbUsers();
  const { data: userData } = useUser();
  const { setTwitchId } = useContext(GlobalContext);

  function handleChange(value: number) {
    if (value) setTwitchId(value);
  }

  if (isLoading || !userData) return null;

  const options = data.map((u: any) => ({ value: u.twitch_id, label: u.display_name }));

  return (
    <Select
      options={removeDuplicates(options, 'value')}
      style={{ width: 120 }}
      defaultValue={userData.id}
      onChange={handleChange}
    />
  );
};

export default SelectUser;
