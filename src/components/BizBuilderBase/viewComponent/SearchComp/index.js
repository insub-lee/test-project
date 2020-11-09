import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, TreeSelect, Select, DatePicker } from 'antd';
import { debounce } from 'lodash';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import moment from 'moment';

const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledSelect(TreeSelect);
const { Option } = Select;
const { RangePicker } = DatePicker;

class TextComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  // RangeDate 초기값이 있으나 정상적으로 SearchData에 입력되지 않고 있는 것을 확인하여 didMount 추가 by. JeongHyun
  componentDidMount() {
    const { CONFIG } = this.props;
    const { searchType } = CONFIG.property;
    const rangeDateSearchType = (CONFIG && CONFIG.property && CONFIG.property.rangeDateSearchType) || 'default';
    if (searchType === 'RANGEDATE' && rangeDateSearchType !== 'default') {
      this.handleOnChangeSearch(this.makeRangeDefaultValue(rangeDateSearchType));
    }
  }

  /* 
      개발목적 : RangeDate(기간 내 검색) 컴포넌트를 위한 value 값 생성
      파라미터 : rangeDateSearchType (빌더/업무디자이너/LIST페이지/SearchArea 내에서 설정한 값) || 
                 'default' : 시작일, 종료일 모두 오늘날짜
                 'autoMonth' : 현재 달의 시작일, 말일
                 'custom' : 사용자가 지정한 날짜
      리턴정보 : Array(Date) / [startDate, endDate]
      create by. JeongHyun
  */
  makeRangeDefaultValue = rangeDateSearchType => {
    const { CONFIG } = this.props;
    switch (rangeDateSearchType) {
      case 'sysdate': {
        return [moment(), moment()];
      }
      case 'autoMonth': {
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        return [startOfMonth, endOfMonth];
      }
      case 'custom': {
        return [
          (CONFIG.property.searchStartDate && moment(CONFIG.property.searchStartDate)) || moment(),
          (CONFIG.property.searchStartDate && moment(CONFIG.property.searchStartDate)) ||
            (CONFIG.property.searchStartDate && moment(CONFIG.property.searchStartDate)) ||
            moment(),
        ];
      }
      default:
        return [undefined, undefined];
    }
  };

  makeDatePickerDefaultValue = dateSearchDefaultType => {
    const { CONFIG } = this.props;
    switch (dateSearchDefaultType) {
      case 'sysdate': {
        return moment();
      }
      case 'custom': {
        return (CONFIG.property.dateSearchDefaultValue && moment(CONFIG.property.dateSearchDefaultValue), 'YYYY-MM-DD') || moment();
      }
      default:
        return undefined;
    }
  };

  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData, CONFIG } = this.props;
    let searchText = '';
    if (value && (value.length > 0 || value > 0)) {
      let searchVal = '';
      switch (CONFIG.property.searchDataType) {
        case 'STRING':
          if (CONFIG.property.searchType === 'DATE') {
            searchVal = moment(value).format(CONFIG.property.dateSearchFormat || 'YYYY-MM-DD');
          } else {
            searchVal = `'${value}'`;
          }
          break;
        case 'NUMBER':
          searchVal = value;
          break;
        case 'DATE':
          searchVal = moment(value).format('YYYY-MM-DD');
          break;
        case 'DATETIME':
          searchVal = value.map((val, index) =>
            index !== 0 ? `'${moment(val).format('YYYY-MM-DD 24:00:00')}'` : `'${moment(val).format('YYYY-MM-DD 00:00:00')}'`,
          );
          break;
        default:
      }
      switch (CONFIG.property.searchCondition) {
        case '=':
          searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          break;
        case '>=':
          if (CONFIG.property.searchDataType === 'STRING') {
            searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          } else if (CONFIG.property.searchDataType === 'DATE') {
            searchText = `AND W.${COMP_FIELD} >= to_date('${searchVal}', 'YYYY-MM-DD')`;
          } else {
            searchText = `AND W.${COMP_FIELD} >= '${searchVal}'`;
          }
          break;
        case '<=':
          if (CONFIG.property.searchDataType === 'STRING') {
            searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          } else if (CONFIG.property.searchDataType === 'DATE') {
            searchText = `AND W.${COMP_FIELD} <= to_date('${searchVal}', 'YYYY-MM-DD')`;
          } else {
            searchText = `AND W.${COMP_FIELD} <= '${searchVal}'`;
          }
          break;
        case '>':
          if (CONFIG.property.searchDataType === 'STRING') {
            searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          } else if (CONFIG.property.searchDataType === 'DATE') {
            searchText = `AND W.${COMP_FIELD} > to_date('${searchVal}', 'YYYY-MM-DD')`;
          } else {
            searchText = `AND W.${COMP_FIELD} > '${searchVal}'`;
          }
          break;
        case '<':
          if (CONFIG.property.searchDataType === 'STRING') {
            searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          } else if (CONFIG.property.searchDataType === 'DATE') {
            searchText = `AND W.${COMP_FIELD} < to_date('${searchVal}', 'YYYY-MM-DD')`;
          } else {
            searchText = `AND W.${COMP_FIELD} < '${searchVal}'`;
          }
          break;
        case 'LIKE':
          searchText = `AND W.${COMP_FIELD} LIKE '%${value}%'`;
          break;
        case 'BETWEEN':
          searchText = `AND W.${COMP_FIELD} BETWEEN ${searchVal[0]} AND ${searchVal[1]}`;
          break;
        default:
      }
    }
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const { CONFIG, isSearch, searchTreeData, searchSelectData } = this.props;
    if (CONFIG.property.searchType === 'DATE') console.debug(CONFIG.property.searchCondition);
    if (isSearch) {
      switch (CONFIG.property.searchType) {
        case 'INPUT':
          return (
            <Input
              onChange={e => this.handleOnChangeSearch(e.target.value)}
              className={CONFIG.property.className || ''}
              placeholder={CONFIG.property.searchPlaceholder || CONFIG.property.placeholder}
            />
          );
        case 'SELECT':
          return (
            <AntdSelect
              allowClear
              style={{ width: '100%', marginRight: 10 }}
              onChange={value => {
                this.handleOnChangeSearch(value);
              }}
              className={CONFIG.property.className || 'select-sm'}
              placeholder={CONFIG.property.searchPlaceholder || CONFIG.property.placeholder}
            >
              {searchSelectData &&
                searchSelectData.map(item => (
                  <Option key={`selectMap_${item.NODE_ID}`} value={item.NODE_ID}>
                    {item.NAME_KOR}
                  </Option>
                ))}
            </AntdSelect>
          );
        case 'TREESELECT':
          return (
            <AntdTreeSelect
              allowClear
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={searchTreeData}
              onChange={value => this.handleOnChangeSearch(value)}
              className={CONFIG.property.className || 'select-sm'}
              placeholder={CONFIG.property.searchPlaceholder || CONFIG.property.placeholder}
            />
          );
        case 'DATE':
          return (
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={this.makeDatePickerDefaultValue(CONFIG.property.dateSearchDefaultType || 'default')}
              format="YYYY-MM-DD"
              onChange={value => this.handleOnChangeSearch(value)}
              className={CONFIG.property.className || ''}
            />
          );
        case 'RANGEDATE':
          return (
            <RangePicker
              style={{ width: '100%' }}
              defaultValue={this.makeRangeDefaultValue(CONFIG.property.rangeDateSearchType || 'default')}
              format="YYYY-MM-DD"
              onChange={value => this.handleOnChangeSearch(value)}
              className={CONFIG.property.className || ''}
            />
          );
        default:
          return '';
      }
    }
    return '';
  }
}

TextComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  CONFIG: PropTypes.any,
  isSearch: PropTypes.any,
  sagaKey: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default TextComp;
