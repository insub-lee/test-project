import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import request from 'utils/request';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

const RadioGroup = AntRadiobox(Radio.Group);

const CustomValueRadioComp = props => {
  const [values, setValues] = useState([{ value: null, text: null }]);
  const [defaultValue, setDefaultValue] = useState('');
  const [isChangeable, setIsChangeable] = useState('N');
  const [targetUrl, setTargetUrl] = useState('');

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
  } = props;

  useEffect(() => {
    const { VALUES, IS_CHANGEABLE, URL } = props.CONFIG.property;
    if (VALUES instanceof Array) {
      setValues([...VALUES]);
    }
    setDefaultValue(colData || '');
    setIsChangeable(IS_CHANGEABLE || 'N');
    setTargetUrl(URL || '');
  }, []);

  useEffect(() => {
    if (defaultValue !== '') {
      onChangeHandler(defaultValue);
    }
  }, [defaultValue]);

  const usageHandler = value => {
    if (targetUrl !== '') {
      const temp = { ...props?.rowData };
      temp.CHANGED_VALUE = value;
      request({
        method: 'POST',
        url: targetUrl,
        data: temp,
      }).then(({ response }) => {
        // console.debug('### response of CustomDataTableComp: ', response);
        if (response?.result === 1) {
          // console.debug('£££ result 1 : ', response?.data instanceof Object, response?.data);
          setDefaultValue(value);
        }
      });
    } else {
      onChangeHandler(value);
    }
  };

  const onChangeHandler = value => {
    // console.debug('£££ onChangeHandler :', value instanceof String, value, isRequired, changeFormData);
    if (typeof value === 'string') {
      if (isRequired) {
        // 기본값인지 체크
        changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, value);
      setDefaultValue(value);
    }
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <RadioGroup value={defaultValue} onChange={e => (isChangeable === 'Y' ? usageHandler(e.target.value) : null)}>
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
