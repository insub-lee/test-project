import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Spin, DatePicker, Select } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import Styled from './Styled';
import AccidentList from '../infoTable/AccidentList';
import ExcelDown from '../excelDown';

const { MonthPicker } = DatePicker;
const { Option } = Select;
const AntdMonthPicker = StyledDatePicker(MonthPicker);
const AntdSelect = StyledSelect(Select);

class NoaccidentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      SITE: '전체',
      SEARCHTYPE: 'month',
      SMONTH: moment()
        .subtract(1, 'M')
        .format('YYYY-MM'),
      EMONTH: moment().format('YYYY-MM'),
      SDATE: moment()
        .subtract(1, 'M')
        .format('YYYY-MM-DD'),
      EDATE: moment().format('YYYY-MM-DD'),
      QUARTER: '1',
      listData: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { SMONTH, EMONTH, SDATE, EDATE, QUARTER, SITE, SEARCHTYPE } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_MONTH_LIST', SMONTH, EMONTH, SDATE, EDATE, QUARTER, SITE, SEARCHTYPE } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  };

  initCallback = (id, response) => {
    const { result } = response;
    const info = this.setInfo(result);

    this.setState({
      isSearching: false,
      listData: result,
      info,
    });
  };

  setInfo = listData => {
    let WORK_HOURS_SUM_1 = 0; // 구미 총근무시간 (합계)
    let WORK_HOURS_SUM_2 = 0; // 청주 총근무시간 (합계)
    let WORK_HOURS_SUM_3 = 0; // 서울 총근무시간 (합계)
    let TOTAL_HOURS_SUM = 0; // 구미, 청주, 서울 총근무시간 (합계)

    listData.forEach(row => {
      WORK_HOURS_SUM_1 += row.WORK_HOURS_1;
      WORK_HOURS_SUM_2 += row.WORK_HOURS_2;
      WORK_HOURS_SUM_3 += row.WORK_HOURS_3;
      TOTAL_HOURS_SUM += row.TOTAL_HOURS;
    });

    const result = {
      WORK_HOURS_SUM_1,
      WORK_HOURS_SUM_2,
      WORK_HOURS_SUM_3,
      TOTAL_HOURS_SUM,
    };

    return result;
  };

  // 검색버튼
  onSearch = () => {
    const { SMONTH, EMONTH, SDATE, EDATE, QUARTER, SITE, SEARCHTYPE } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({ isSearching: true });
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_MONTH_LIST', SMONTH, EMONTH, SDATE, EDATE, QUARTER, SITE, SEARCHTYPE } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  };

  renderSearchType = searchType => {
    const { SMONTH, EMONTH, SDATE, EDATE } = this.state;
    switch (searchType) {
      case 'quarter':
        return (
          <>
            <span className="text-label">분기</span>
            <AntdSelect className="select-sm" onChange={value => this.setState({ QUARTER: value })} defaultValue="1">
              <Option value="1">1 분기</Option>
              <Option value="2">2 분기</Option>
              <Option value="3">3 분기</Option>
              <Option value="4">4 분기</Option>
            </AntdSelect>
          </>
        );
      case 'month':
        return (
          <>
            <span className="text-label">기간</span>
            <AntdMonthPicker
              className="ant-picker-sm mr5"
              defaultValue={moment(SMONTH, 'YYYY-MM')}
              mode="month"
              format="YYYY-MM"
              onChange={(date, str) => this.setState({ SMONTH: str })}
            />
            ~
            <AntdMonthPicker
              className="ant-picker-sm"
              style={{ marginLeft: '5px' }}
              defaultValue={moment(EMONTH, 'YYYY-MM')}
              mode="month"
              format="YYYY-MM"
              onChange={(date, str) => this.setState({ EMONTH: str })}
            />
          </>
        );
      case 'day':
        return (
          <>
            <span className="text-label">기간</span>
            <AntdMonthPicker
              className="ant-picker-sm mr5"
              defaultValue={moment(SDATE, 'YYYY-MM-DD')}
              mode="day"
              format="YYYY-MM-DD"
              onChange={(date, str) => this.setState({ SDATE: str })}
            />
            ~
            <AntdMonthPicker
              className="ant-picker-sm"
              style={{ marginLeft: '5px' }}
              defaultValue={moment(EDATE, 'YYYY-MM-DD')}
              mode="day"
              format="YYYY-MM-DD"
              onChange={(date, str) => this.setState({ EDATE: str })}
            />
          </>
        );
      default:
        return '';
    }
  };

  render() {
    const { listData, info, isSearching, SEARCHTYPE } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect className="select-sm" onChange={value => this.setState({ SITE: value })} defaultValue="전체">
                <Option value="전체">전체</Option>
                <Option value="구미">구미</Option>
                <Option value="청주">청주</Option>
                <Option value="서울">서울</Option>
              </AntdSelect>
              <span className="text-label">타입</span>
              <AntdSelect className="select-sm" onChange={value => this.setState({ SEARCHTYPE: value })} defaultValue="month">
                <Option value="month">월별</Option>
                <Option value="day">일별</Option>
                <Option value="quarter">분기별</Option>
              </AntdSelect>
              {this.renderSearchType(SEARCHTYPE || 'month')}
              <StyledButton className="btn-gray btn-sm btn-first" style={{ marginLeft: '5px' }} onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">{listData.length > 0 && <ExcelDown listData={listData} />}</StyledButtonWrapper>
        <div style={{ marginBottom: '20px' }}>
          <AccidentList listData={listData} info={info} />
        </div>
      </Styled>
    );
  }
}

NoaccidentListPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

NoaccidentListPage.defaultProps = {};

export default NoaccidentListPage;
