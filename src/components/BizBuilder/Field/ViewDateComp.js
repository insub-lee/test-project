import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Radio } from 'antd';
import moment from 'moment';
// import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

// const init = { value: null, text: null };
// const RadioGroup = AntRadiobox(Radio.Group);

const ViewDateComp = props => {
  const [timeFormat, setTimeFormat] = useState('YYYY-MM-DD');
  const [time, setTime] = useState('');

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
    const { TIME_FORMAT } = props.CONFIG.property;
    if (typeof TIME_FORMAT === 'string') {
      setTimeFormat(TIME_FORMAT);
    }
  }, []);

  useEffect(() => {
    setTime(moment().format(timeFormat));
  }, [timeFormat]);

  useEffect(() => {
    onChangeHandler(time);
  }, [time]);

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

  return <div style={{ textAlign: 'center' }}>{time}</div>;
};

ViewDateComp.propTypes = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string };
ViewDateComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { VALUES: [{ value: null, text: null }] },
  },
  COMP_FIELD: '',
};
export default ViewDateComp;
