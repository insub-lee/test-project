import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

// coldata 로 넣기, readonly 체크, modify일 때, view일 때 수정해서 날짜형 라벨로 쓸 수 있게 수정, setViewPage 날려라
class DatePickerComp extends Component {
  onChangeHandler = date => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, moment(date).format('YYYY-MM-DD'));
  };

  onChangeSearchHandle = date => {
    const { sagaKey: id, COMP_FIELD, changeSearchData } = this.props;
    const searchDate = moment(date).format('YYYY-MM-DD').length > 0 ? `AND W.${COMP_FIELD} = '${moment(date).format('YYYY-MM-DD')}'::TIMESTAMP` : '';
    // const searchDate = dateString.length > 0 ? `AND W.${COMP_FIELD} = '${dateString}'::TIMESTAMP` : '';
    changeSearchData(id, COMP_FIELD, searchDate);
  };

  render() {
    const { CONFIG, visible, isSearch, readOnly, viewPageData, colData, searchCompRenderer } = this.props;
    if (!visible) {
      return '';
    }

    if (isSearch && CONFIG.property.searchType === 'CUSTOM') {
      return (
        <AntdDatePicker
          style={{ width: '200px' }}
          onChange={this.onChangeSearchHandle}
          placeholder="날짜를 선택하세요."
          readOnly={readOnly || CONFIG.property.readOnly}
        />
      );
    }
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }

    if (viewPageData.viewType.toUpperCase() === 'INPUT') {
      return (
        <AntdDatePicker
          style={{ width: '200px' }}
          onChange={this.onChangeHandler}
          placeholder="날짜를 선택하세요."
          readOnly={readOnly || CONFIG.property.readOnly}
        />
      );
    }

    if (viewPageData.viewType.toUpperCase() === 'MODIFY') {
      return (
        <AntdDatePicker
          style={{ width: '200px' }}
          onChange={this.onChangeHandler}
          placeholder="날짜를 선택하세요."
          defaultValue={moment(colData)}
          readOnly={readOnly || CONFIG.property.readOnly}
        />
      );
    }

    if (viewPageData.viewType.toUpperCase() === 'VIEW') {
      return <span className={CONFIG.property.className || ''}>{moment(colData).format('YYYY-MM-DD')}</span>;
    }

    if (viewPageData.viewType.toUpperCase() === 'LIST') {
      return <span className={CONFIG.property.className || ''}>{moment(colData).format('YYYY-MM-DD')}</span>;
    }
    return '';
  }
}

DatePickerComp.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  searchCompRenderer: PropTypes.func,
  COMP_FIELD: PropTypes.string,
  changeSearchData: PropTypes.func,
  CONFIG: PropTypes.object,
  visible: PropTypes.bool,
  isSearch: PropTypes.bool,
  readOnly: PropTypes.bool,
  viewPageData: PropTypes.string,
  colData: PropTypes.object,
};

export default DatePickerComp;
