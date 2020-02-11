import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';
import Moment from 'moment';

class DatePicker extends Component {
  onChangeHandler = (date, dateString) => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    // changeFormData(id, COMP_FIELD, Moment(date).format('YYYY-MM-DD'));
    changeFormData(id, COMP_FIELD, '2020-02-01 00:00:00');
    console.debug(typeof date);
    console.debug(Moment(date).format('YYYY-MM-DD HH:mm:ss'));
  };

  render() {
    return <AntdDatePicker onChange={this.onChangeHandler} format="YYYY-MM-DD" />;
  }
}

DatePicker.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  COMP_FIELD: PropTypes.string,
};

export default DatePicker;
