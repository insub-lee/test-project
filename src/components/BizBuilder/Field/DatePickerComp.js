import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';
import Moment from 'moment';

class DatePickerComp extends Component {
  onChangeHandler = (date, dateString) => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, dateString);
  };

  onChangeSearchHandle = (date, dateString) => {
    const { sagaKey: id, COMP_FIELD, changeSearchData } = this.props;
    const searchDate = dateString.length > 0 ? `AND W.${COMP_FIELD} = '${dateString}'::TIMESTAMP` : '';
    changeSearchData(id, COMP_FIELD, searchDate);
  };

  render() {
    const { CONFIG, visible, isSearch, readOnly } = this.props;
    if (isSearch && visible && CONFIG.property.searchType === 'CUSTOM') {
      return <AntdDatePicker onChange={this.onChangeSearchHandle} placeholder="날짜를 선택하세요." readOnly={readOnly || CONFIG.property.readOnly} />;
    }
    return visible ? <AntdDatePicker onChange={this.onChangeHandler} placeholder="날짜를 선택하세요." readOnly={readOnly || CONFIG.property.readOnly} /> : '';
  }
}

DatePickerComp.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  COMP_FIELD: PropTypes.string,
  changeSearchData: PropTypes.func,
  CONFIG: PropTypes.object,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default DatePickerComp;
