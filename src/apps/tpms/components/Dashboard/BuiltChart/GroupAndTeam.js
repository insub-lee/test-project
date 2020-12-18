/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import moment from 'moment';
import { Icon, Spin } from 'antd';
import request from 'utils/request';
import StyledChart from './StyledChart';
// import BarChart from '../../Chart/BarChart';
import StackedBarChart from '../../Chart/StackedBarChart';
import service from './service';
import alertMessage from '../../Notification/Alert';
import jsonToQueryString from '../../../utils/jsonToQueryString';

class GroupAndTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      data: fromJS({
        // labels: ['지연', 'Drop', '등록', '진행', '완료', '미진행'],
        labels: ['A팀', 'B팀', 'C팀'],
        datasets: [
          {
            label: '지연',
            backgroundColor: 'rgb(255, 99, 100)',
            data: [0, 0, 0],
          },
          {
            label: 'Drop',
            backgroundColor: 'rgb(0, 202, 202)',
            data: [0, 0, 0],
          },
          {
            label: '등록',
            backgroundColor: 'rgb(255, 193, 100)',
            data: [0, 0, 0],
          },
          {
            label: '진행',
            backgroundColor: 'rgb(60, 101, 233)',
            data: [0, 0, 0],
          },
          {
            label: '완료',
            backgroundColor: 'rgb(173, 135, 211)',
            data: [0, 0, 0],
          },
          {
            label: '등록중',
            backgroundColor: 'rgb(113, 144, 172)',
            data: [0, 0, 0],
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
    const { startDate: startDate_, endDate: endDate_, stdDate: stdDate_, headQuarts: headQuarter, project_type, prjLvValues: project_level } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');

    const startDate = startDate_
      ? startDate_.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDate = endDate_ ? endDate_.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');
    const stdDate = stdDate_ ? stdDate_.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    // service로 보낼 파라미터
    const tempRequestQuery = {
      type: 'personalReportTable',
      startDate,
      endDate,
      stdDate,
      headQuarter,
      project_type,
      project_level,
    };

    // this.setState({ loaded: true });

    // const { response, error } = await service.signChart.get(queryString);
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
      const { list } = response;

      const labels = list.map(item => item.dpnm);
      const delaycnt = list.map(item => item.delaycnt);
      const dropcnt = list.map(item => item.dropcnt);
      const regcnt = list.map(item => item.regcnt);
      const progresscnt = list.map(item => item.progresscnt);
      const finishcnt = list.map(item => item.finishcnt);
      const savecnt = list.map(item => item.savecnt);

      if (this.mounted) {
        this.setState(prevState => ({
          // data: prevState.data.setIn(
          // ['datasets', 0, 'data'],
          // [delayCnt, dropCnt, regCnt, progressCnt, finishCnt, saveCnt],
          data: prevState.data
            .setIn(['labels'], fromJS(labels))
            .setIn(['datasets', 0, 'data'], fromJS(delaycnt))
            .setIn(['datasets', 1, 'data'], fromJS(dropcnt))
            .setIn(['datasets', 2, 'data'], fromJS(regcnt))
            .setIn(['datasets', 3, 'data'], fromJS(progresscnt))
            .setIn(['datasets', 4, 'data'], fromJS(finishcnt))
            .setIn(['datasets', 5, 'data'], fromJS(savecnt)),
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
    console.debug('>>>renderData', data.toJS());
    return (
      <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={loaded}>
        <StyledChart className="chart">
          <div className="title">
            {/* 팀 현황 */}
            팀별 실적
            <div className="actions">
              <button type="button" className="icon_3dot" />
            </div>
          </div>
          <div className="content">
            <div>
              {/* <BarChart data={data.toJS()} /> */}
              <StackedBarChart data={data.toJS()} />
            </div>
          </div>
        </StyledChart>
      </Spin>
    );
  }
}

GroupAndTeam.propTypes = {
  requestQuery: PropTypes.object,
};

GroupAndTeam.defaultProps = {
  requestQuery: {},
};

export default GroupAndTeam;
