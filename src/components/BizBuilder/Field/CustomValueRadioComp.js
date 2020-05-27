import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

const RadioGroup = AntRadiobox(Radio.Group);

const CustomValueRadioComp = props => {
  const [values, setValues] = useState([{ value: null, text: null }]);
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
    const { colData } = props;
    if (VALUES instanceof Array) {
      setValues([...VALUES]);
    }
    if (colData) {
      setDefaultValue(colData || '');
    }
  }, []);

  useEffect(() => {
    onChangeHandler(defaultValue);
  }, [defaultValue]);

  function onChangeHandler(value) {
    // console.debug('£££ onChangeHandler :', value instanceof String, value, isRequired, changeFormData);
    if (typeof value === 'string') {
      if (isRequired) {
        // 기본값인지 체크
        changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, value);
    }
  }

  return (
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
