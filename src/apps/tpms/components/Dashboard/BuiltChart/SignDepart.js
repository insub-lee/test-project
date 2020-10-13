import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import StyledChart from './StyledChart';
import BarChart from '../../Chart/BarChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class SignDepart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: fromJS({
        labels: ['지연', 'Drop', '등록', '진행', '완료', '미진행'],
        datasets: [
          {
            label: '본부 현황',
            backgroundColor: ['rgb(255, 99, 100)', 'rgb(0, 202, 202)', 'rgb(255, 193, 100)', 'rgb(60, 101, 233)', 'rgb(173, 135, 211)', 'rgb(113, 144, 172)'],
            yAxisID: 'y-axis-1',
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      }),
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    // this.fetchData();
    this.delayFetch = setTimeout(this.fetchData, 1000);
    // this.updateInterval = setInterval(this.fetchData, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.delayFetch);
    // clearInterval(this.updateInterval);
    this.mounted = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestQuery !== this.props.requestQuery) {
      this.fetchData();
    }
  }

  async fetchData() {
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

    // service로 보낼 파라미터
    const requestQuery2 = {
      type: 'headquartes',
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
      console.debug('>>> response', response);
      const { delayCnt, dropCnt, finishCnt, progressCnt, regCnt, saveCnt, totalCnt } = response;
      if (this.mounted) {
        this.setState(prevState => ({
          data: prevState.data.setIn(['datasets', 0, 'data'], [delayCnt, dropCnt, regCnt, progressCnt, finishCnt, saveCnt]),
        }));
      }
    } else {
      console.error('>>> error', error);
      alertMessage.alert('Server Error');
    }
  }

  render() {
    const { loaded, data } = this.state;
    return (
      <StyledChart className="chart">
        <div className="title">
          본부 현황
          <div className="actions">
            <button type="button" className="icon_3dot" />
          </div>
        </div>
        <div className="content">
          <div>
            <BarChart data={data.toJS()} />
          </div>
        </div>
      </StyledChart>
    );
  }
}

SignDepart.propTypes = {
  requestQuery: PropTypes.object,
};

SignDepart.defaultProps = {
  requestQuery: {},
};

export default SignDepart;
