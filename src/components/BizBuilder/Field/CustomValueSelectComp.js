import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

const { Option } = Select;
const init = { value: null, text: null };
function CustomValueSelectComp(props) {
  const [values, setValues] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});

  const { CONFIG, COMP_FIELD, isSearch, colData, viewPageData } = props;
  useEffect(() => {
    const { customValues, definedValue, setDefault } = props.CONFIG.property;
    setValues(customValues instanceof Array ? [...customValues] : [{ ...init }]);
    const isReg = typeof setDefault === 'string' ? setDefault : 'N';
    setDefaultValue(definedValue instanceof Object ? { ...definedValue } : { ...init });
    const value = (definedValue && definedValue.value) || '';
    if (isReg === 'Y') {
      onChangeHandler(value || '');
    }
  }, []);

  function valueHandler(set, idx) {
    const { value } = set[idx];
    if (isSearch) {
      const { customSearchKey } = CONFIG.property;
      switch (customSearchKey) {
        case 'FireInspection':
          onChangeHandler(value);
          break;
        default:
          onChangeSearchDataHandler(value);
          break;
      }
    } else onChangeHandler(value);
    setDefaultValue(set[idx]);
  }

  function onChangeHandler(value) {
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
  }

  function onChangeSearchDataHandler(value) {
    const {
      changeSearchData,
      COMP_FIELD,
      sagaKey: id,
      CONFIG: {
        property: { searchCondition },
      },
    } = props;

    const searchText = value ? `AND W.${COMP_FIELD} ${searchCondition} '${value}'` : '';
    changeSearchData(id, COMP_FIELD, searchText);
  }
  // VIEW 페이지 에서 사용할 경우 선택한 value의 text가 노출되도록 수정
  const value = colData && values.length > 0 ? values.find(item => item.value === colData) : { text: '' };
  const viewText = value.text || (defaultValue && defaultValue.text) || '';
  return (
    <>
      {(viewPageData && viewPageData.viewType === 'VIEW') || (viewPageData.viewType === 'LIST' && !isSearch) ? (
        <span>{viewText}</span>
      ) : (
        <Select
          className={CONFIG.property.className || ''}
          onChange={value => valueHandler(values, value)}
          style={{ width: '100%' }}
          value={colData ? values.findIndex(item => item.value === colData) : defaultValue.text}
        >
          {values.map(({ value, text }, idx) => (
            <Option key={`${idx}_${value}_${text}`} value={idx}>
              {text}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
}

CustomValueSelectComp.propTypes = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string, colData: PropTypes.any };
CustomValueSelectComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  COMP_FIELD: '',
  colData: undefined,
};
export default CustomValueSelectComp;
