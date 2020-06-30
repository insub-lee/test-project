import React, { Component } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import history from 'utils/history';

import StyledMainWidget from './StyledMainWidget';

class MainWidget extends Component {
  state = {
    APP_DT: moment().format('YYYY-MM-DD'),
    CALENDAR_DT: moment().format('YYYY-MM'),
    monthList: [],
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'mhrsMain',
        url: '/api/eshs/v1/common/MhrsHealthChkMainData',
        type: 'GET',
      },
    ];
    getCallDataHandler(sagaKey, apiAry, this.initData);
  }

  initData = () => {
    const { result } = this.props;
    if (result && result.mhrsMain && result.mhrsMain.monthList) {
      this.setState({
        monthList: result.mhrsMain.monthList,
      });
    }
  };

  onPanelChange = value => {
    this.setState({ CALENDAR_DT: moment(value).format('YYYY-MM') }, () => {
      this.getList();
    });
  };

  getList = () => {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'monthList',
      url: '/api/eshs/v1/common/MhrsHealthChkMainData',
      type: 'POST',
      params: {
        PARAM: { CALENDAR_DT: this.state.CALENDAR_DT },
      },
    };
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      spinningOff();
      if (res && res.list) {
        this.setState({
          monthList: res.list,
        });
      }
    });
  };

  dateFullCellRender = value => {
    const weekNum = moment(value).format('d');
    let dateClass = '';
    if (weekNum === '0') {
      dateClass = 'red';
    } else if (weekNum === '6') {
      dateClass = 'blue';
    }

    if (this.state.CALENDAR_DT !== moment(value).format('YYYY-MM')) {
      dateClass = 'gray';
    }

    let filterAppDt = [];
    if (this.state.monthList) {
      filterAppDt = this.state.monthList.filter(item => item.APP_DT === moment(value).format('YYYY-MM-DD'));
    }

    return (
      <div className="ant-calendar-date-item">
        <div className={`${dateClass}`}>{value.date()}</div>
        {filterAppDt.length === 1 && (
          <div className="reserve-number">
          (<span>{filterAppDt[0].DAY_CNT}</span>/{filterAppDt[0].QUOTA_NUM})
        </div>
        )}
      </div>
    );
  };

  render() {
    const { result } = this.props;

    return (
      <StyledMainWidget>
        <div className="main-widget-section-card">
          <div className="widget-card card1">
            <p className="card-txt">검진 예약인원 수</p>
            <p className="card-num">
              <b>{result && result.mhrsMain && result.mhrsMain.statistics && (numeral(result.mhrsMain.statistics.TOTAL_CNT).format('0,0'))}</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
          <div className="widget-card card2">
            <p className="card-txt">임직원</p>
            <p className="card-num">
              <b>{result && result.mhrsMain && result.mhrsMain.statistics && (numeral(result.mhrsMain.statistics.EMPLOYEE_CNT).format('0,0'))}</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
          <div className="widget-card card3">
            <p className="card-txt">배우자</p>
            <p className="card-num">
              <b>{result && result.mhrsMain && result.mhrsMain.statistics && (numeral(result.mhrsMain.statistics.FAM_CNT).format('0,0'))}</b> 명
            </p>
            <div className="card-deco"></div>
          </div>
        </div>
        <div className="main-widget-section widget-left">
          <div className="section-header">
            <h2 className="section-title">
              금일검진예약현황
              <span>({this.state.APP_DT})</span>
            </h2>
          </div>
          <div className="section-body">
            <ul className="reservation-list-area">
            {result && result.mhrsMain && result.mhrsMain.todayList && (
              result.mhrsMain.todayList.map(item => (
                <li>
                  <div>
                    <p className="txt1">{item.USER_NAME}({item.SSN.substring(0, 6)}-{item.SSN.substring(6, 13)})</p>
                    <span className="txt2">전화번호 : {item.MOBILE_TEL_NO}</span>
                    <span className="txt3">검진유형 : {item.CHK_TYPE && ( `${item.CHK_TYPE}형`)}</span>
                  </div>
                </li>
              ))
            )}
            </ul>
            <div className="more-btn-area">
              <button type="button" onClick={() => history.push('/apps/mhrs/ChkReservation')}>+ 더보기</button>
            </div>
          </div>
        </div>
        <div className="main-widget-section widget-right">
          <div className="section-header">
            <h2 className="section-title">
              날짜별 예약현황
              <span>※ 조회할 날짜를 선택하세요.</span>
            </h2>
          </div>
          <div className="section-body">
            <Calendar
              defaultValue={moment(this.state.APP_DT)}
              dateFullCellRender={this.dateFullCellRender}
              onPanelChange={this.onPanelChange}
            />
          </div>
        </div>
        <div className="main-widget-section widget-bottom">
          <div className="section-header">
            <h2 className="section-title">건강검진 등록 결과 양식</h2>
          </div>
          <div className="section-body">
            <p>건강검진 등록 결과에 대한 문의는 건강검진 창구(000-000-0000)로 전화 주시면 자세하게 안내해 드리겠습니다.</p>
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-15">
              <StyledButton className="btn-primary">건강검진결과 등록문서 양식 다운로드</StyledButton>
            </StyledButtonWrapper>
          </div>
        </div>
      </StyledMainWidget>
    );
  }
}

const MainWidgetDevBase = () => <BizMicroDevBase sagaKey="mhrsMainWidget" component={MainWidget} />;

export default MainWidgetDevBase;
