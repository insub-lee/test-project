import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import { Icon, Spin } from 'antd';
import StyledChart from './StyledChart';
// import HorizontalBarChart from '../../Chart/HorizontalBarChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';
import BarChart from '../../Chart/BarChart';

class SignTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      data: fromJS({
        // labels: ['지연', 'Drop', '등록', '진행', '완료', '등록중'],
        // labels: ['지연', 'Drop', '등록', '현상', '측정', '분석', '개선', '관리', '완료', '등록중'],
        labels: ['등록', '현상파악', '원인분석', '대책수립', '개선', '완료/공유', '완료', 'Drop'],
        datasets: [
          {
            label: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              // 'rgb(255, 99, 100)',
              // 'rgb(0, 202, 202)',
              // 'rgb(255, 193, 100)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(173, 135, 211)',
              // 'rgb(113, 144, 172)',

              'rgb(255, 193, 100)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(173, 135, 211)',
              'rgb(0, 202, 202)',
            ],
            hoverBackgroundColor: [
              // 'rgb(255, 99, 100)',
              // 'rgb(0, 202, 202)',
              // 'rgb(255, 193, 100)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(60, 101, 233)',
              // 'rgb(173, 135, 211)',
              // 'rgb(113, 144, 172)',

              'rgb(255, 193, 100)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(60, 101, 233)',
              'rgb(173, 135, 211)',
              'rgb(0, 202, 202)',
            ],
          },
        ],
      }),
    };
    this.fetchData = this.fetchData.bind(this);
    this.getType = this.getType.bind(this);
  }

  componentDidMount() {
    // this.fetchData();
    // this.updateInterval = setInterval(this.fetchData, 2000);
    this.mounted = true;
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

  getType(empNo, startDate) {
    if (empNo) {
      return 'totalper';
    }
    return startDate ? 'totalhq' : 'total';
  }

  async fetchData() {
    const { requestQuery, isDev } = this.props;
    console.debug('SignTotal_requestQuery', requestQuery);
    const {
      startDate,
      endDate,
      stdDate,
      // headQuarts,
      part,
      team,
      projectType,
      prjLvValues,
      status,
      fab,
      area,
      keyno,
      model,
      empNo,
    } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const stdDt = stdDate ? stdDate.replace(/\./gi, '') : undefined;

    // service로 보낼 파라미터
    const requestQuery2 = {
      type: isDev ? 'totaldev' : this.getType(empNo, startDate),
      sdd: startDt,
      edd: endDt,
      stdd: stdDt,
      // headQuarts,
      part,
      team,
      prjtype: projectType === '' ? undefined : projectType,
      prjlvl: prjLvValues ? prjLvValues.toString() : undefined,
      status: status === 'all' ? undefined : status,
      fab,
      area,
      keyno,
      model,
      schusrid: empNo,
    };

    // this.setState({ loaded: true });
    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await service.signChart.get(queryString);
    if (response && !error) {
      console.debug('>>> total', response);
      const {
        delayCnt,
        dropCnt,
        finishCnt,
        progressDefineCnt,
        progressMeasureCnt,
        progressAnalyzeCnt,
        progressImproveCnt,
        progressControlCnt,
        regCnt,
        saveCnt,
        totalCnt,
      } = response;
      if (this.mounted) {
        this.props.upstreamTotalCnt(totalCnt);
        this.setState(prevState => ({
          data: prevState.data.setIn(
            ['datasets', 0, 'data'],
            // fromJS([
            //   delayCnt,
            //   dropCnt,
            //   regCnt,
            //   progressDefineCnt,
            //   progressMeasureCnt,
            //   progressAnalyzeCnt,
            //   progressImproveCnt,
            //   progressControlCnt,
            //   finishCnt,
            //   saveCnt,
            // ]),
            fromJS([regCnt, progressDefineCnt, progressMeasureCnt, progressAnalyzeCnt, progressImproveCnt, progressControlCnt, finishCnt, dropCnt]),
          ),
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
    return (
      <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={loaded}>
        <StyledChart className="chart">
          <div className="title">
            {/* 전체 현황 */}
            단계별 진척현황
            <div className="actions">
              <button type="button" className="icon_3dot" />
            </div>
          </div>
          <div className="content">
            <div>
              {/* <HorizontalBarChart data={data.toJS()} /> */}
              <BarChart data={data.toJS()} />
            </div>
          </div>
        </StyledChart>
      </Spin>
    );
  }
}

SignTotal.propTypes = {
  requestQuery: PropTypes.object,
  upstreamTotalCnt: PropTypes.func,
  isDev: PropTypes.bool,
};

SignTotal.defaultProps = {
  requestQuery: {},
  upstreamTotalCnt: () => false,
  isDev: false,
};

export default SignTotal;
