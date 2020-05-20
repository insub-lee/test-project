import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

const init = { value: null, text: null };
const RadioGroup = AntRadiobox(Radio.Group);

const CustomValueRadioComp = props => {
  const [values, setValues] = useState([]);
  const [defaultValue, setDefaultValue] = useState('');

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

  useEffect(() => {
    const { VALUES } = props.CONFIG.property;
    setValues(VALUES instanceof Array ? [...VALUES] : [{ ...init }]);

    // onChangeHandler(definedValue.value);
  }, []);

  // function valueHandler(set, idx) {
  //   const { value } = set[idx];
  //   onChangeHandler(value);
  //   setDefaultValue(set[idx]);
  // }

  useEffect(() => {
    onChangeHandler(defaultValue);
  }, [defaultValue]);

  function onChangeHandler(value) {
    console.debug('£££ onChangeHandler :', value, isRequired, changeFormData);
    if (value instanceof String) {
      // if (isRequired) {
      //   // 기본값인지 체크
      //   changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      // }
      changeFormData(id, COMP_FIELD, value);
    }
  }

  return (
    // <Select className={CONFIG.property.className || ''} onChange={value => valueHandler(values, value)} style={{ width: '100%' }} value={defaultValue.text}>
    //   {values.map(({ value, text }, idx) => (
    //     <Option key={`${idx}_${value}_${text}`} value={idx}>
    //       {text}
    //     </Option>
    //   ))}
    // </Select>
    <div style={{ textAlign: 'center' }}>
      <RadioGroup value={defaultValue} onChange={e => setDefaultValue(e.target.value)}>
        {values.map(({ value, text }) => (
          <Radio key={`${Math.random()}customValueRadioComp > Radio`} value={value}>
            {text}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

CustomValueRadioComp.propTypes = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string };
CustomValueRadioComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { VALUES: [{ value: null, text: null }] },
  },
  COMP_FIELD: '',
};
export default CustomValueRadioComp;
