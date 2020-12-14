/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import request from 'utils/request';

import { Icon, Spin } from 'antd';
import StyledChart from './StyledChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class MonthlyTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      data: fromJS({
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            label: '합계',
            backgroundColor: 'rgb(255, 99, 100)',
            borderColor: 'rgb(255, 99, 100)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
        ],
      }),
    };
    this.fetchData = this.fetchData.bind(this);
    this.getType = this.getType.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    // this.fetchData();
    // this.updateInterval = setInterval(this.fetchData, 2000);
    this.delayFetch = setTimeout(this.fetchData, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.updateInterval);
    this.mounted = false;
    clearTimeout(this.delayFetch);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestQuery !== this.props.requestQuery) {
      this.fetchData();
    }
  }

  getType(empNo, startDate) {
    if (empNo) {
      return 'monthlyper';
    }
    return startDate ? 'monthlyhq' : 'monthly';
  }

  async fetchData() {
    // 파라미터 받기(기준일자(디폴트 현재일자))
    const { requestQuery, isDev } = this.props;
    const {
      startDate,
      endDate,
      // headQuarts,
      part,
      team,
      project_type,
      project_level,
      status,
      fab,
      area,
      keyno,
      model,
    } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    // 월 구하기
    // const endMon = endDate?.replace(/\./gi, '').substr(0, 6);
    // const startMon = startDate?.replace(/\./gi, '').substr(0, 6);

    // 날짜 기간 계산(월)
    const diffMon = moment(endDate, 'YYYYMMDD').diff(moment(startDate, 'YYYYMMDD'), 'month');

    // 기간(월) 구하기, pointLadius
    const yearMon = [];
    const pointRadius = [];
    for (let i = 0; i <= diffMon; i += 1) {
      yearMon.push(
        moment(endDate, 'YYYYMMDD')
          .add(-diffMon + i, 'month')
          .format('YYYY.MM'),
      );
      pointRadius.push(6);
    }

    // service로 보낼 파라미터
    const tempRequestQuery = {
      // type: isDev ? 'monthlydev' : this.getType(empNo, startDate),
      type: 'lineChart',
      startDate: startDt,
      endDate: endDt,
      // headQuarts,
      part,
      team,
      project_type,
      project_level,
      status: status === 'all' ? undefined : status,
      fab,
      area,
      keyno,
      model,
    };

    // this.setState({ loaded: true });
    const { response, error } = await request({
      // url: `/apigate/v1/portal/sign/report?${queryString}`,
      url: `/api/tpms/v1/common/searchInfo`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: tempRequestQuery,
    });
    if (response && !error) {
      console.debug('>>>>> monthly', response);
      // const { monthlYDelayCntList, monthlYDropCnt, monthlYRegCntList, monthlYProgressCntList, monthlYFinishCntList, monthlYSaveCnt } = response;
      const { list } = response;

      // 1년간의 데이터 가져오기
      // 지연
      // const monthlYDelayCntData = monthlYDelayCntList
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.delaycnt);

      // drop
      // const monthlYDropCntData = monthlYDropCnt
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.dropcnt);

      // 등록
      // const monthlYRegCntData = monthlYRegCntList
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.regcnt);

      // 진행
      // const monthlYProgressCntData = monthlYProgressCntList
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.progresscnt);

      // 완료
      // const monthlYFinishCntData = monthlYFinishCntList
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.finishcnt);

      // 미진행
      // const monthlYSaveCntData = monthlYSaveCnt
      //   .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
      //   .map(item => item.savecnt);

      const labels = list.map(({ draftdt }) => draftdt);
      const cnts = list.map(({ regcnt }) => regcnt);

      // const reusltCounts = [];
      // // const maxI = monthlYSaveCntData.length;
      // const maxI = monthlYRegCntData.length;
      // let i = 0;
      // while (i < maxI) {
      //   reusltCounts.push(
      //     // monthlYDelayCntData[i] + monthlYDropCntData[i] + monthlYRegCntData[i] + monthlYProgressCntData[i] + monthlYFinishCntData[i] + monthlYSaveCntData[i],
      //     monthlYRegCntData[i],
      //   );
      //   i += 1;
      // }

      if (this.mounted) {
        // this.setState(prevState => ({
        //   data: prevState.data
        //     .setIn(['labels'], fromJS(yearMon))
        //     .setIn(['datasets', 0, 'data'], fromJS(reusltCounts))
        //     .setIn(['datasets', 0, 'pointRadius'], fromJS(pointRadius)),
        // }));
        this.setState(prevState => ({
          data: prevState.data
            .setIn(['labels'], fromJS(labels))
            .setIn(['datasets', 0, 'data'], fromJS(cnts))
            .setIn(['datasets', 0, 'pointRadius'], fromJS(labels.map(() => 6))),
        }));
      }
    } else {
      console.error('>>> error', error);
      alertMessage.alert('Server Error');
    }
    this.setState({ loaded: false });
  }

  render() {
    const { loaded, data } = this.state;
    const options = {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };
    console.debug('>>>>>> debug data', data.toJS());
    return (
      <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={loaded}>
        <StyledChart className="chart">
          <div className="title">
            {/* 월별 현황 */}
            등록건수 Trend
            <div className="actions">
              <button type="button" className="icon_3dot" />
            </div>
          </div>
          <div className="content">
            <div>
              <Line data={data.toJS()} options={options} />;
            </div>
          </div>
        </StyledChart>
      </Spin>
    );
  }
}

MonthlyTransition.propTypes = {
  requestQuery: PropTypes.object,
  isDev: PropTypes.bool,
};

MonthlyTransition.defaultProps = {
  requestQuery: {},
  isDev: false,
};

export default MonthlyTransition;
