import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

const { MonthPicker } = DatePicker;

function MonthPickerComp(props) {
  const [formFormat, setFormFormat] = useState('YYYY-MM');
  const [labelFormat, setLabelFormat] = useState('YYYY-MM');
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
    viewPageData,
  } = props;

  const { dateformat, viewformat, className, readOnly } = props.CONFIG.property || {};

  useEffect(() => {
    if (typeof dateformat === 'string' || dateformat !== '') {
      setFormFormat(dateformat);
    }
    if (typeof viewformat === 'string' || viewformat !== '') {
      setLabelFormat(viewformat);
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

  // 렌더
  return (
    <>
      {!readOnly && (viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT') ? (
        <MonthPicker
          style={{ width: '100%' }}
          className={className || ''}
          defaultValue={colData ? moment(colData, formFormat) : undefined}
          value={colData ? moment(colData, formFormat) : undefined}
          format={labelFormat || 'YYYY-MM'}
          onChange={date => onChangeHandler(moment(date).format(formFormat))}
        />
      ) : (
        <span className={className || ''}>{(colData && moment(colData, formFormat).format(labelFormat || 'YYYY-MM')) || ''}</span>
      )}
    </>
  );
}

MonthPickerComp.propTypes = {
  CONFIG: PropTypes.shape({ info: PropTypes.object, option: PropTypes.object, property: PropTypes.object }),
  COMP_FIELD: PropTypes.string,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  NAME_KOR: PropTypes.string,
  changeValidationData: PropTypes.func,
  viewPageData: PropTypes.object,
  colData: PropTypes.string,
};

MonthPickerComp.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: {},
  },
  COMP_FIELD: '',
};

export default MonthPickerComp;
