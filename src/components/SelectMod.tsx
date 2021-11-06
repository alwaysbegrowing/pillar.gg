import React, { useContext } from 'react';

import { Select } from 'antd';
import { useModerators } from '../services/hooks/api';
import { GlobalContext } from '../ContextWrapper';

const { Option } = Select;

const SelectMod = () => {
  const { setTwitchId } = useContext(GlobalContext);
  const { data: moderators, isLoading } = useModerators();

  function handleChange(value: number) {
    setTwitchId(value);
  }

  if (isLoading || !moderators) return null;

  return (
    <Select style={{ width: 120 }} defaultValue={moderators.twitch_id} onChange={handleChange}>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Option key={moderators._id} value={moderators.twitch_id}>
        {moderators.user_name}
      </Option>
      {moderators?.mod_for.map((mod) => (
        // eslint-disable-next-line no-underscore-dangle
        <Option key={mod.id} value={mod.id}>
          {mod.display_name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectMod;
