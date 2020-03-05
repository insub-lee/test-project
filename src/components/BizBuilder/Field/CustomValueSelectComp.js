import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

const { Option } = Select;

function CustomValueSelectComp(props) {
  const [values, setValues] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const { CONFIG, COMP_FIELD } = props;

  useEffect(() => {
    const { customValues, definedValue } = props.CONFIG.property;
    setValues(customValues instanceof Array ? [...customValues] : [{ value: null, text: null }]);
    setDefaultValue(definedValue instanceof Object ? { ...definedValue } : { value: null, text: null });
  }, []);

  const onChangeHandler = value => {
    const {
      changeFormData,
      sagaKey: id,
      CONFIG: {
        property: { isRequired },
      },
      COMP_FIELD,
      NAME_KOR,
      changeValidationData,
    } = props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  return (
    <Select
      className={CONFIG.property.className || ''}
      onChange={value => onChangeHandler(value)}
      style={{ width: 300, marginRight: 10 }}
      value={defaultValue.value}
    >
      {values.map(({ text, value }, idx) => (
        <Option key={`${idx}_${value}_${text}`} value={value}>
          {text}
        </Option>
      ))}
    </Select>
  );
}

CustomValueSelectComp.propTypes = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string };
CustomValueSelectComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  COMP_FIELD: '',
};
export default CustomValueSelectComp;
