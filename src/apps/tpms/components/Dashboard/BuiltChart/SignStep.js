import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import StyledChart from './StyledChart';
import DoughnutChart from '../../Chart/DoughnutChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class SignStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: fromJS({
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ['rgb(255, 99, 100)', 'rgb(0, 202, 202)', 'rgb(255, 193, 100)', 'rgb(60, 101, 233)', 'rgb(173, 135, 211)', 'rgb(113, 144, 172)'],
          },
        ],
        labels: ['지연', 'Drop', '등록', '진행', '완료', '미진행'],
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
    this.mounted = true;
    // clearInterval(this.updateInterval);
    clearTimeout(this.delayFetch);
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
      type: 'step',
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
      const { savePercent, regPercent, progressPercent, finishPercent, dropPercent, delayPercent } = response;
      if (this.mounted) {
        this.props.upstreamTotalCnt();
        this.setState(prevState => ({
          data: prevState.data.setIn(['datasets', 0, 'data'], fromJS([delayPercent, dropPercent, regPercent, progressPercent, finishPercent, savePercent])),
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
          단계별 현황
          <div className="actions">
            <button type="button" className="icon_3dot" />
          </div>
        </div>
        <div className="content">
          <div>
            <DoughnutChart data={data.toJS()} />
          </div>
        </div>
      </StyledChart>
    );
  }
}

SignStep.propTypes = {
  requestQuery: PropTypes.object,
  upstreamTotalCnt: PropTypes.func,
};

SignStep.defaultProps = {
  requestQuery: {},
  upstreamTotalCnt: () => false,
};

export default SignStep;
