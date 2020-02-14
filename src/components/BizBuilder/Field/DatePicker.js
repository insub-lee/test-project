import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';

class DatePicker extends Component {
  onChangeHandler = (date, dateString) => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, dateString);
  };

  render() {
    return <AntdDatePicker onChange={this.onChangeHandler} />;
  }
}

DatePicker.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  COMP_FIELD: PropTypes.string,
};

export default DatePicker;
