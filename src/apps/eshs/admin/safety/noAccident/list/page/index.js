import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Spin, DatePicker } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import Styled from './Styled';
import AccidentList from '../infoTable/AccidentList';
import ExcelDown from '../excelDown';

const { MonthPicker } = DatePicker;
const AntdMonthPicker = StyledDatePicker(MonthPicker);

class NoaccidentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      SMONTH: moment()
        .subtract(1, 'M')
        .format('YYYY-MM'),
      EMONTH: moment().format('YYYY-MM'),
      listData: [],
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_MONTH_LIST' } },
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
    const { SMONTH, EMONTH } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({ isSearching: true });
    const apiInfo = {
      key: 'getNoAccidentMgtInfo',
      type: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      params: { PARAM: { type: 'GET_MONTH_LIST', SMONTH, EMONTH } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  };

  render() {
    const { listData, info, SMONTH, EMONTH, isSearching } = this.state;
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
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
            <StyledButton className="btn-gray btn-sm btn-first" style={{ marginLeft: '5px' }} onClick={() => this.onSearch()}>
              검색
            </StyledButton>
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
