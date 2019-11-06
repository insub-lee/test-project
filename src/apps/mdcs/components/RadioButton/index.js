import React from 'react';
import { Radio } from 'antd';

const radioGroup = ({ value, onChange, defaultValue, dataSource, readOnly }) => (
  <Radio.Group onChange={onChange} value={value === ' ' || value === undefined ? defaultValue : value} disabled={readOnly}>
    {dataSource.map(x => (
      <Radio value={x.value}>{x.NAME_KOR}</Radio>
    ))}
  </Radio.Group>
);
export default radioGroup;
