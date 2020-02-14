import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';

class DatePicker extends Component {
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
    const { CONFIG, visible, isSearch } = this.props;
    if (isSearch && visible && CONFIG.property.searchType === 'CUSTOM') {
      return <AntdDatePicker onChange={this.onChangeSearchHandle} />;
    }
    return <AntdDatePicker onChange={this.onChangeHandler} />;
  }
}

DatePicker.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  COMP_FIELD: PropTypes.string,
  changeSearchData: PropTypes.func,
  CONFIG: PropTypes.object,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
};

export default DatePicker;
// readonly 뷰에서 값만 보기, visible 보일 지 안 보일지 설정
