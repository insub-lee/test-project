import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import request from 'utils/request';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);

function CustomListSelectComp(props) {
  // useState
  const [options, setOptions] = useState([]);
  const {
    changeFormData,
    sagaKey: id,
    CONFIG: {
      property: { isRequired },
    },
    COMP_FIELD,
    NAME_KOR,
    changeValidationData,
    colData,
    formData,
    viewPageData,
  } = props;

  const { url, method, optValue, optLabel, className } = props.CONFIG.property || {};

  useEffect(() => {
    if (typeof url === 'string' || url !== '') {
      request({
        method: method || 'GET',
        url,
        data: formData,
      }).then(({ response }) => {
        if (response?.list instanceof Array) {
          setOptions(response?.list);
        }
      });
    }
  }, []);

  const onChangeHandler = value => {
    if (typeof value === 'string') {
      if (isRequired) {
        changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, value);
    }
  };

  const renderOptions = () => {
    if (options?.length > 0) {
      return options.map(option => <Option value={option[optValue]}>{option[optLabel]}</Option>);
    }
    return <Option value="">호출된 list정보없음</Option>;
  };

  // 렌더
  return (
    <>
      {viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT' ? (
        <AntdSelect style={{ width: '100%' }} className={className || ''} value={colData || ''} onChange={value => onChangeHandler(value)}>
          {renderOptions()}
        </AntdSelect>
      ) : (
        <span>{options.find(option => option[optValue] === colData).optLabel || ''}</span>
      )}
    </>
  );
}

CustomListSelectComp.propTypes = {
  CONFIG: PropTypes.shape({ info: PropTypes.object, option: PropTypes.object, property: PropTypes.object }),
  COMP_FIELD: PropTypes.string,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  NAME_KOR: PropTypes.string,
  changeValidationData: PropTypes.func,
  viewPageData: PropTypes.object,
};

CustomListSelectComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  COMP_FIELD: '',
};

export default CustomListSelectComp;
