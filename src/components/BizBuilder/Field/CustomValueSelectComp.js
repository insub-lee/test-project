import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

const { Option } = Select;

function CustomValueSelectComp(props) {
  const { CONFIG, customValues, COMP_FIELD } = props;

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

  return customValues.map((value, idx) => {
    if (value.field === COMP_FIELD) {
      return (
        <Select
          // key={`safety > InspectionTarget > FireExtinguisher > CustomValueSelectComp > ${COMP_FIELD}_${idx}`}
          defaultValue={value.defaultValue}
          placeholder={value.placeHolder}
          style={{ width: 300, marginRight: 10 }}
          onChange={value => onChangeHandler(value)}
          className={CONFIG.property.className || ''}
        >
          {value.options.map(option => (
            <Option key={option.key} value={option.value}>
              {option.name.kor}
            </Option>
          ))}
        </Select>
      );
    }
  });
}

CustomValueSelectComp.propTypes = { customValues: PropTypes.arrayOf(PropTypes.object), COMP_FIELD: PropTypes.string };
CustomValueSelectComp.defaultProps = {
  customValues: [
    {
      value: undefined,
      field: '',
      placeHolder: '',
      options: [{ key: '', value: '', name: { kor: '' } }],
    },
  ],
  COMP_FIELD: '',
};
export default CustomValueSelectComp;
