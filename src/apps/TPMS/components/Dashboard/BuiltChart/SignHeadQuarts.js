import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import StyledChart from './StyledChart';
import LineChart from '../../Chart/LineChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class SignHeadQuarts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: fromJS({
        labels: ['지연', 'Drop', '등록', '진행', '완료', '미진행'],
        datasets: [
          {
            label: '본부 현황',
            backgroundColor: 'rgb(255, 99, 100)',
            borderColor: 'rgb(209, 215, 218)',
            data: [0, 0, 0, 0, 0, 0],
            pointRadius: [4, 4, 4, 4, 4, 4],
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
      console.debug('>>>>> Head Quarts', response);
      const { delayCnt, dropCnt, finishCnt, progressCnt, regCnt, saveCnt, totalCnt } = response;
      if (this.mounted) {
        this.setState(prevState => ({
          data: prevState.data.setIn(['datasets', 0, 'data'], fromJS([delayCnt, dropCnt, regCnt, progressCnt, finishCnt, saveCnt])),
        }));
      }
    } else {
      console.error('>>> Sign Head Quarts error', error);
      alertMessage.alert('Server Error');
    }
  }

  render() {
    const { loaded, data } = this.state;
    console.debug('>>>>>> debug data', data.toJS());
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
            <LineChart data={data.toJS()} />
          </div>
        </div>
      </StyledChart>
    );
  }
}

SignHeadQuarts.propTypes = {
  requestQuery: PropTypes.object,
};

SignHeadQuarts.defaultProps = {
  requestQuery: {},
};

export default SignHeadQuarts;
