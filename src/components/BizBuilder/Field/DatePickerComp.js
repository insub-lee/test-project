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
          // changeFormData(id, COMP_FIELD, undefined);
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
    // if (!visible) {
    //   return '';
    // }

    if (isSearch && CONFIG.property.searchType === 'CUSTOM') {
      return (
        <AntdDatePicker
          style={{ width: '100%' }}
          onChange={this.onChangeSearchHandle}
          placeholder={CONFIG.property.placeholder}
          disabled={readOnly || CONFIG.property.readOnly}
        />
      );
    }
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }

    return visible ? (
      <>
        {viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT' ? (
          <AntdDatePicker
            style={{ width: '100%' }}
            onChange={this.onChangeHandler}
            placeholder={CONFIG.property.placeholder}
            value={colData ? moment(colData) : undefined}
            disabled={readOnly || CONFIG.property.readOnly}
          />
        ) : (
          <span className={CONFIG.property.className || ''}>{colData ? moment(colData).format('YYYY-MM-DD') : ''}</span>
        )}
      </>
    ) : (
      ''
    );

    // 변경 전 소스
    // if (viewPageData.viewType.toUpperCase() === 'INPUT') {
    //   return (
    //     <AntdDatePicker
    //       style={{ width:'100%' }}
    //       onChange={this.onChangeHandler}
    //       placeholder={CONFIG.property.placeholder}
    //       value={(colData && moment(colData)) || undefined}
    //       disabled={readOnly || CONFIG.property.readOnly}
    //     />
    //   );
    // }

    // if (viewPageData.viewType.toUpperCase() === 'MODIFY') {
    // if (viewPageData.viewType.toUpperCase() === 'MODIFY' || viewPageData.viewType.toUpperCase() === 'INPUT') {
    //   return (
    //     <AntdDatePicker
    //       style={{ width:'100%' }}
    //       onChange={this.onChangeHandler}
    //       placeholder={CONFIG.property.placeholder}
    //       value={colData ? moment(colData) : undefined}
    //       disabled={readOnly || CONFIG.property.readOnly}
    //     />
    //   );
    // }

    // if (viewPageData.viewType.toUpperCase() === 'VIEW' || viewPageData.viewType.toUpperCase() === 'LIST') {
    //   return <span className={CONFIG.property.className || ''}>{colData ? moment(colData).format('YYYY-MM-DD') : '선택된 날짜가 없습니다.'}</span>;
    // }

    // if (viewPageData.viewType.toUpperCase() === 'LIST') {
    //   return <span className={CONFIG.property.className || ''}>{moment(colData).year() !== 1 ? moment(colData).format('YYYY-MM-DD') : ''}</span>;
    //   // return <span className={CONFIG.property.className || ''}>{moment(colData).format('YYYY-MM-DD')}</span>;
    // }
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
  viewPageData: PropTypes.object,
  colData: PropTypes.string,
};

export default DatePickerComp;
