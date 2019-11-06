import React from 'react';
import { Radio } from 'antd';

const RadioYnComp = ({ id, changeFormData, colData, CONFIG, readOnly }) => (
  <Radio.Group
    onChange={e => {
      changeFormData(id, CONFIG.property.COMP_FIELD, e.target.value);
    }}
    value={colData !== ' ' ? colData : undefined}
    disabled={readOnly}
  >
    <Radio value="Y">승인</Radio>
    <Radio value="N">미승인</Radio>
  </Radio.Group>
);
export default RadioYnComp;
