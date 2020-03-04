import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

function SelectYearComp(props) {
  const [yearRange, setYearRange] = useState([]);

  useEffect(() => {
    const { minYear, maxYear } = props.CONFIG.property;

    const years = [];
    for (let i = parseInt(minYear, 10); i < parseInt(maxYear, 10) + 1; i++) {
      years.push(String(i));
    }
    setYearRange(years);
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

  const { colData, visible, CONFIG } = props;

  return visible ? (
    <Select
      defaultValue={CONFIG.property.defaultYear}
      onChange={value => onChangeHandler(value)}
      style={{ width: '100%', marginRight: 10 }}
      className={CONFIG.property.className || ''}
    >
      {yearRange.map(year => (
        <Option key={year} value={year} style={{ height: 30 }}>
          {year}
        </Option>
      ))}
    </Select>
  ) : (
    ''
  );
}

SelectYearComp.propTypes = {
  defaultValueForSelectYearComp: PropTypes.bool,
  CONFIG: PropTypes.objectOf(PropTypes.object),
};
SelectYearComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: {
      COMP_NAME: '',
      COMP_SETTING_SRC: '',
      COMP_SRC: '',
      compKey: '',
      layerIdx: {},
      maxYear: String(new Date().getFullYear()),
      minYear: String(new Date().getFullYear()),
    },
  },
  defaultValueForSelectYearComp: false,
};
export default SelectYearComp;
