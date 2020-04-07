import React, { Component } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

// coldata 로 넣기, readonly 체크, modify일 때, view일 때 수정해서 날짜형 라벨로 쓸 수 있게 수정, setViewPage 날려라
class DatePickerComp extends Component {
  // Config 설정 추가로 마운트 완료후 cahngeFormData가 필요하여 추가 by.이정현
  componentDidMount() {
    const { sagaKey: id, changeFormData, COMP_FIELD, CONFIG } = this.props;
    const defaultType = (CONFIG && CONFIG.property && CONFIG.property.defaultType) || undefined;
    if (defaultType !== undefined) {
      switch (defaultType) {
        case 'sysDate': {
          changeFormData(id, COMP_FIELD, moment(new Date()).format('YYYY-MM-DD'));
          break;
        }
        case 'customDate': {
          changeFormData(id, COMP_FIELD, moment(CONFIG.property.customDate).format('YYYY-MM-DD'));
          break;
        }
        default:
          changeFormData(id, COMP_FIELD, undefined);
          break;
      }
    }
  }

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
    // console.debug('프롭스 딱대!', this.props);
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
          value={(colData && moment(colData)) || undefined}
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
      return <span className={CONFIG.property.className || ''}>{moment(colData).year() !== 1 ? moment(colData).format('YYYY-MM-DD') : ''}</span>;
    }

    if (viewPageData.viewType.toUpperCase() === 'LIST') {
      return <span className={CONFIG.property.className || ''}>{moment(colData).year() !== 1 ? moment(colData).format('YYYY-MM-DD') : ''}</span>;
      // return <span className={CONFIG.property.className || ''}>{moment(colData).format('YYYY-MM-DD')}</span>;
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
