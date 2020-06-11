import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

// const SelectYearComp = props => {
const SelectYearComp = ({ CONFIG, changeFormData, sagaKey: id, COMP_FIELD, NAME_KOR, changeValidationData, changeSearchData, visible, colData, isSearch }) => {
  const [yearRange, setYearRange] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const { minYear, maxYear, setDefault, defaultYear } = CONFIG.property;
    const isReg = typeof setDefault === 'string' ? setDefault : 'N';
    if (isReg === 'Y') {
      onChangeHandler(defaultYear);
    }

    const years = [];
    for (let i = parseInt(minYear !== '' ? minYear : currentYear, 10); i <= parseInt(maxYear !== '' ? maxYear : currentYear, 10); i += 1) {
      years.push(String(i));
    }
    setYearRange(years);
  }, []);

  const onChangeHandler = value => {
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  const onSearchHandler = value => {
    const { customFuncKey } = CONFIG.property;
    switch (customFuncKey) {
      case 'FireInspection': {
        customOnSearchForFireInspection(value);
        break;
      }
      default: {
        const searchYear = value ? `AND W.${COMP_FIELD} = ${value}::VARCHAR` : '';
        changeSearchData(id, COMP_FIELD, searchYear);
        break;
      }
    }
  };

  // 소방점검 - 점검대상 검색전용 Custom Func
  const customOnSearchForFireInspection = value => {
    changeFormData(id, COMP_FIELD, value);
  };

  return visible ? (
    <Select
      defaultValue={colData !== '' ? colData : CONFIG.property.defaultYear}
      onChange={isSearch ? onSearchHandler : onChangeHandler}
      style={{ width: '100%', marginRight: 10 }}
      className={CONFIG.property.className || ''}
    >
      {yearRange.map(year => (
        <Option key={year} value={year} style={{ height: 30 }}>
          {`${year}년`}
        </Option>
      ))}
    </Select>
  ) : (
    ''
  );
};

SelectYearComp.propTypes = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
  colData: PropTypes.string,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  NAME_KOR: PropTypes.string,
  changeValidationData: PropTypes.func,
  changeSearchData: PropTypes.func,
  // defaultValueForSelectYearComp: PropTypes.bool,
};
SelectYearComp.defaultProps = {
  colData: '',
  CONFIG: {
    info: {},
    option: {},
    property: {
      COMP_NAME: '',
      COMP_SETTING_SRC: '',
      COMP_SRC: '',
      compKey: '',
      layerIdx: {},
      maxYear: '',
      minYear: '',
      defaultYear: null,
    },
  },
  // defaultValueForSelectYearComp: false,
};
export default SelectYearComp;
