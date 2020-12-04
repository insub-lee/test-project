import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import StyledChart from './StyledChart';
import LineChart from '../../Chart/LineChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: fromJS({
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            label: '지연',
            backgroundColor: 'rgb(255, 99, 100)',
            borderColor: 'rgb(255, 99, 100)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
          {
            label: 'Drop',
            backgroundColor: 'rgb(0, 202, 202)',
            borderColor: 'rgb(0, 202, 202)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
          {
            label: '등록',
            backgroundColor: 'rgb(255, 193, 100)',
            borderColor: 'rgb(255, 193, 100)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
          {
            label: '진행',
            backgroundColor: 'rgb(60, 101, 233)',
            borderColor: 'rgb(60, 101, 233)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
          {
            label: '완료',
            backgroundColor: 'rgb(173, 135, 211)',
            borderColor: 'rgb(173, 135, 211)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
          {
            label: '미진행',
            backgroundColor: 'rgb(113, 144, 172)',
            borderColor: 'rgb(113, 144, 172)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            fill: false,
            lineTension: 0,
          },
        ],
      }),
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    // this.fetchData();
    // this.updateInterval = setInterval(this.fetchData, 2000);
    this.delayFetch = setTimeout(this.fetchData, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.updateInterval);
    this.mounted = true;
    clearTimeout(this.delayFetch);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestQuery !== this.props.requestQuery) {
      this.fetchData();
    }
  }

  async fetchData() {
    // 파라미터 받기(기준일자(디폴트 현재일자))
    const { requestQuery } = this.props;
    const {
      startDate,
      endDate,
      stdDate,
      // headQuarts,
      projectType,
      prjLvValues,
    } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const stdDt = stdDate ? stdDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    // 월 구하기
    const endMon = endDt.replace(/\./gi, '').substr(0, 6);
    const startMon = startDt.replace(/\./gi, '').substr(0, 6);

    // 날짜 기간 계산(월)
    const diffMon = moment(endDt, 'YYYYMMDD').diff(moment(startDt, 'YYYYMMDD'), 'month');

    // 기간(월) 구하기, pointLadius
    const yearMon = [];
    const pointRadius = [];
    for (let i = 0; i <= diffMon; i += 1) {
      yearMon.push(
        moment(endDt, 'YYYYMMDD')
          .add(-diffMon + i, 'month')
          .format('YYYYMM'),
      );
      pointRadius.push(6);
    }

    // service로 보낼 파라미터
    const requestQuery2 = {
      type: 'monthly',
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      // headQuarts,
      prjtype: projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
    };

    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await service.signChart.get(queryString);
    if (response && !error) {
      console.debug('>>>>> monthly', response);
      const { monthlYDelayCntList, monthlYDropCnt, monthlYRegCntList, monthlYProgressCntList, monthlYFinishCntList, monthlYSaveCnt } = response;

      // 1년간의 데이터 가져오기
      // 지연
      const monthlYDelayCntData = monthlYDelayCntList
        .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
        .map(item => item.delaycnt);

      // drop
      const monthlYDropCntData = monthlYDropCnt
        .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
        .map(item => item.dropcnt);

      // 등록
      const monthlYRegCntData = monthlYRegCntList
        .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
        .map(item => item.regcnt);

      // 진행
      const monthlYProgressCntData = monthlYProgressCntList
        .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
        .map(item => item.progresscnt);

      // 완료
      const monthlYFinishCntData = monthlYFinishCntList
        .filter(mon => moment(mon.draftdt, 'YYYYMM') >= moment(startMon, 'YYYYMM') && moment(mon.draftdt, 'YYYYMM') <= moment(endMon, 'YYYYMM'))
        .map(item => item.finishcnt);

      // 미진행
      const monthlYSaveCntData = monthlYSaveCnt
        .filter(mon => moment(mon.draftdt) >= moment(startMon) && moment(mon.draftdt) <= moment(endMon))
        .map(item => item.savecnt);

      if (this.mounted) {
        this.setState(prevState => ({
          data: prevState.data
            .setIn(['labels'], fromJS(yearMon))
            .setIn(['datasets', 0, 'data'], fromJS(monthlYDelayCntData))
            .setIn(['datasets', 1, 'data'], fromJS(monthlYDropCntData))
            .setIn(['datasets', 2, 'data'], fromJS(monthlYRegCntData))
            .setIn(['datasets', 3, 'data'], fromJS(monthlYProgressCntData))
            .setIn(['datasets', 4, 'data'], fromJS(monthlYFinishCntData))
            .setIn(['datasets', 5, 'data'], fromJS(monthlYSaveCntData))
            .setIn(['datasets', 0, 'pointRadius'], fromJS(pointRadius))
            .setIn(['datasets', 1, 'pointRadius'], fromJS(pointRadius))
            .setIn(['datasets', 2, 'pointRadius'], fromJS(pointRadius))
            .setIn(['datasets', 3, 'pointRadius'], fromJS(pointRadius))
            .setIn(['datasets', 4, 'pointRadius'], fromJS(pointRadius))
            .setIn(['datasets', 5, 'pointRadius'], fromJS(pointRadius)),
        }));
      }
    } else {
      console.error('>>> error', error);
      alertMessage.alert('Server Error');
    }
  }

  render() {
    const { loaded, data } = this.state;
    console.debug('>>>>>> debug data', data.toJS());
    return (
      <StyledChart className="chart">
        <div className="title">
          월별 현황
          <div className="actions">
            <button type="button" className="icon_3dot" />
          </div>
        </div>
        <div className="content">
          <div>
            <LineChart data={data.toJS()} />
          </div>
        </div>
      </StyledChart>
    );
  }
}

Monthly.propTypes = {
  requestQuery: PropTypes.object,
};

Monthly.defaultProps = {
  requestQuery: {},
};

export default Monthly;
