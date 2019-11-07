import React from 'react';
import { Input } from 'antd';

const handleOnChange = (id, CONFIG, value, changeFormData, changeValidationData) => {
  if (CONFIG.property.isRequired) {
    changeValidationData(
      id,
      CONFIG.property.COMP_FIELD,
      value.trim().length > 0,
      value.trim().length > 0 ? '' : `${CONFIG.property.NAME_KOR}항목은 필수 입력입니다.`,
    );
  }
  changeFormData(id, CONFIG.property.COMP_FIELD, value);
};

const TextComp = ({ CONFIG, colData, changeFormData, id, changeValidationData, readOnly, compProp }) => (
  <Input
    value={colData}
    placeholder={CONFIG.property.placeholder}
    onChange={e => handleOnChange(id, CONFIG, e.target.value, changeFormData, changeValidationData)}
    readOnly={readOnly || CONFIG.property.readOnly}
  />
);

export default TextComp;
