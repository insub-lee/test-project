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

  const { url, method, optValue, optLabel, className, readOnly, additionalData } = props.CONFIG.property || {};

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
      if (additionalData && additionalData.length > 0) {
        // 선택된 Record Data
        const selectedOption = options.find(item => item[optValue] === value);
        // 추가 폼데이터 변경이 필요한 필드가 존재하는 경우
        if (additionalData && additionalData.length > 0) {
          additionalData.forEach(data => {
            // FormData 필드와 ListData 필드가 ''이 아닐경우
            if (data.formDatafield !== '' && data.listDatafield !== '') {
              changeFormData(id, data.formDatafield, selectedOption[data.listDatafield] || '');
            }
          });
        }
      }
    }
  };

  const renderOptions = () => {
    if (options?.length > 0) {
      return options.map(option => <Option value={option[optValue]}>{option[optLabel]}</Option>);
    }
    return <Option value=""></Option>;
  };

  const getOptLabel = () => {
    const selectedOpt = options.find(option => option[optValue] === colData);
    return (selectedOpt && selectedOpt[optLabel]) || '';
  };

  // 렌더
  return (
    <>
      {!readOnly && (viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT') ? (
        <AntdSelect style={{ width: '100%' }} className={className || ''} value={colData || ''} onChange={value => onChangeHandler(value)}>
          {renderOptions()}
        </AntdSelect>
      ) : (
        <span>{getOptLabel()}</span>
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
