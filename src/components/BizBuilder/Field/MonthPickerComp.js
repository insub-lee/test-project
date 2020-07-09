import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

const { MonthPicker } = DatePicker;

function MonthPickerComp(props) {
  const [format, setFormat] = useState('YYYY-MM');
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

  const { dateformat, className } = props.CONFIG.property || {};

  useEffect(() => {
    if (typeof format === 'string' || format !== '') {
      setFormat(format);
    }
  }, []);

  const onChangeHandler = value => {
    if (typeof strDate === 'string') {
      if (isRequired) {
        changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, value);
    }
  };

  const renderMonth = date => (
    <div className="monthArea">
      <span>{`${date.format('MM')}월`}</span>
    </div>
  );

  // 렌더
  return (
    <>
      {viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT' ? (
        <MonthPicker
          style={{ width: '100%' }}
          className={className || ''}
          defaultPickerValue={colData ? moment(colData) : undefined}
          format={dateformat}
          monthCellRender={renderMonth}
          onChange={value => onChangeHandler(value)}
        />
      ) : (
        <span>{colData || ''}</span>
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
