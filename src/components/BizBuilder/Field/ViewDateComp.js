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
  const [targetColumn, setTargetColumn] = useState([{ column: null, value: null }]);
  const [useFilter, setUseFilter] = useState(false);

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
    const { TIME_FORMAT, TARGET_COLUMN } = props.CONFIG.property;
    if (typeof TIME_FORMAT === 'string') {
      setTimeFormat(TIME_FORMAT);
    }
    if (TARGET_COLUMN instanceof Array) {
      if (TARGET_COLUMN.length > 0) {
        TARGET_COLUMN.map(({ column, value }) => {
          if (column && value) {
            setUseFilter(true);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (useFilter) {
      const { TARGET_COLUMN } = props.CONFIG.property;
      setTargetColumn(TARGET_COLUMN);
    }
  }, [useFilter]);

  useEffect(() => {
    if (colData && colData !== '') {
      setTime(moment(colData).format(timeFormat));
    } else {
      setTime(moment().format(timeFormat));
    }
  }, [timeFormat]);

  useEffect(() => {
    onChangeHandler(time);
  }, [time]);

  const valueChcker = () => {
    let result = false;
    const { rowData } = props;
    targetColumn.forEach(({ column, value }) => {
      if (rowData[column] === value) {
        result = true;
      }
    });
    if (result) {
      return time;
    }
  };

  function onChangeHandler(value) {
    if (typeof value === 'string') {
      if (isRequired) {
        // 기본값인지 체크
        changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, value);
    }
  }

  return <div style={{ textAlign: 'center' }}>{useFilter ? valueChcker() : time}</div>;
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
