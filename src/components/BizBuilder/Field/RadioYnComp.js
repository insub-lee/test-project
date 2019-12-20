import React from 'react';
import { Radio } from 'antd';

const RadioYnComp = ({ id, changeFormData, colData, readOnly, COMP_FIELD, visible }) =>
  visible ? (
    <Radio.Group
      onChange={e => {
        changeFormData(id, COMP_FIELD, e.target.value);
      }}
      value={colData !== ' ' ? colData : undefined}
      disabled={readOnly}
    >
      <Radio value="Y">승인</Radio>
      <Radio value="N">미승인</Radio>
    </Radio.Group>
  ) : (
    ''
  );
export default RadioYnComp;
