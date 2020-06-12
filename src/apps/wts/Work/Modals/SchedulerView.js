import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { AutoSizer } from 'react-virtualized';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import moment from 'moment';
import { Icon, Spin } from 'antd';
import { orderBy } from 'lodash';
import 'react-big-scheduler/lib/css/style.css';

import { jsonToQueryString } from 'utils/helpers';
import StyledScheduler from './StyledScheduler';
import service from '../service';
import SchedulerForm from './SchedulerForm';
import StyledStandard from '../../StyledStandard';

const popoverButtonStyle = {
  fontSize: 14,
  fontWeight: 500,
  padding: '3px 5px',
};

const colorSelector = (status, type) => {
  switch (status) {
    case 'O':
      return '#009688';
    case 'X':
      return '#B00020';
    default:
      return type === '1' ? '#3D5AFE' : '#78909C';
  }
};

class SchedulerView extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('ko');
    const schedulerData = new SchedulerData(
      moment(new Date()).format('YYYY-MM-DD'),
      ViewTypes.Month,
      false,
      false,
      {
        startResizable: false,
        endResizable: false,
        movable: false,
        creatable: false,
        views: [],
        eventItemPopoverDateFormat: 'M월D',
        resourceName: '근무자',
      },
      {},
      moment,
    );
    schedulerData.setLocaleMoment(moment);
    // schedulerData.config.schedulerWidth = '80%';
    // schedulerData.config.schedulerMaxHeight = 400;
    schedulerData.config.monthCellWidth = 100;
    schedulerData.localeMoment.locale('ko');
    this.state = {
      viewModel: schedulerData,
      users: [],
      events: [],
      isLoading: true,
      bays: [],
      currentBay: '',
      myWorkJo: '',
    };

    this.initHandler = this.initHandler.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.fetchVacationList = this.fetchVacationList.bind(this);
    this.postVacation = this.postVacation.bind(this);
    this.eventItemPopoverTemplateResolver = this.eventItemPopoverTemplateResolver.bind(this);
    this.reloadSchedule = this.reloadSchedule.bind(this);
    this.cancelVacation = this.cancelVacation.bind(this);
    this.deleteVacation = this.deleteVacation.bind(this);
    this.handleChangeBay = this.handleChangeBay.bind(this);
    this.getSchedulerData = this.getSchedulerData.bind(this);
  }

  componentDidMount() {
    this.initHandler();
  }

  initHandler() {
    const { viewModel } = this.state;
    const { empNo } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(new Date()).format('YYYYMM')).then(payload => {
        const { users, events, bays } = payload;
        let currentBay = '';
        const hasBay = users.some(({ id, bay, workjo }) => {
          if (id === empNo) {
            currentBay = bay;
            this.setState({ myWorkJo: workjo });
          }
          return id === empNo;
        });
        const filteredUsers = currentBay === '' ? users : users.filter(user => user.bay === currentBay);
        viewModel.setResources(filteredUsers);
        viewModel.setEvents(events);
        this.setState({ viewModel, users, events, isLoading: false, bays, currentBay });
      });
    });
  }

  async fetchVacationList(empNo, date) {
    const requestQuery = {
      empNo,
      type: 'manVacationInfoList',
      searchDt: date,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHis.get(queryString);
    const payload = {};
    if (response && !error) {
      const { users, events } = response;
      const bays = [];
      payload.users = orderBy(
        users.map(user => {
          if (!bays.includes(user.bay)) {
            bays.push(user.bay);
          }
          return {
            id: user.empno,
            workjo: user.workjo,
            name: `${user.workjo} ${user.usrnm}(${user.empno})`,
            // name: `${user.usrnm}(${user.empno})`,
            bay: user.bay,
          };
        }),
        ['workjo'],
        ['asc'],
      );
      payload.bays = bays;
      payload.events = events.map(event => ({
        id: `${event.empno}-${event.vacationdt}-${event.vacationgubun}`,
        resourceId: event.empno,
        name: `${event.usrnm}(${event.empno})`,
        bgColor: colorSelector(event.bansign, event.vacationgubun),
        bansign: event.bansign,
        title: `휴가${event.vacationgubun === '0.5' ? '(반차)' : ''} - ${event.vacationnm}`,
        start: moment(event.vacationdt, 'YYYYMMDD').format('YYYY-MM-DD 00:00:00'),
        end: moment(event.vacationdt, 'YYYYMMDD').format('YYYY-MM-DD 23:59:59'),
        message: event.banmsg,
        vacationnm: event.vacationnm,
        vacationmsg: event.vacationmsg,
      }));
    }
    return payload;
  }

  prevClick(schedulerData) {
    schedulerData.prev();
    const { startDate } = schedulerData;
    const { empNo } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        const { currentBay } = this.state;
        schedulerData.setResources(currentBay === '' ? users : users.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users, events, isLoading: false });
      });
    });
  }

  nextClick(schedulerData) {
    schedulerData.next();
    const { startDate } = schedulerData;
    const { empNo } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        const { currentBay } = this.state;
        schedulerData.setResources(currentBay === '' ? users : users.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users, events, isLoading: false });
      });
    });
  }

  onSelectDate(schedulerData, date) {
    const { empNo } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, date.format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        const { currentBay } = this.state;
        schedulerData.setDate(date);
        schedulerData.setResources(currentBay === '' ? users : users.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users, events, isLoading: false });
      });
    });
  }

  eventItemPopoverTemplateResolver(schedulerData, eventItem, title, start, end, statusColor) {
    const { empNo } = this.props;
    const { resourceId, bansign } = eventItem;
    return (
      <div style={{ width: '150px' }}>
        <div>
          <div className="status-dot" style={{ display: 'inline-block', backgroundColor: statusColor, verticalAlign: 'middle' }} />
          <span className="header2-text" title={title} style={{ marginLeft: 5 }}>
            {`${title}`}
          </span>
        </div>
        {/* before... (bansign !== 'O' && bansign !== 'X' && empNo === resourceId) */}
        {empNo === resourceId && (
          <div>
            <button type="button" style={{ ...popoverButtonStyle }} onClick={() => this.cancelVacation(eventItem)}>
              [ 취소 ]
            </button>
          </div>
        )}
        {eventItem.vacationmsg && (
          <div>
            <strong>사유</strong>
            <p>{eventItem.vacationmsg}</p>
          </div>
        )}
        {eventItem.message && (
          <div>
            <strong>반려 메세지</strong>
            <p>{eventItem.message}</p>
          </div>
        )}
      </div>
    );
  }

  cancelVacation(eventItem) {
    const { id, name } = eventItem;
    const [empNo, workDt] = id.split('-');
    const payload = { empNo, workDt, vacation: 'O' };
    if (window.confirm(`${name}님의 ${moment(workDt, 'YYYYMMDD').format('YYYY.MM.DD')}의 휴가를 취소하시겠습니까?`)) {
      this.deleteVacation(payload).then(result => {
        if (result) {
          alert(`${name}님의 ${moment(workDt, 'YYYYMMDD').format('YYYY.MM.DD')}의 휴가가 취소되었습니다.`);
          this.reloadSchedule(payload);
        }
      });
    }
  }

  async deleteVacation(payload) {
    let result = false;
    const { response, error } = await service.manHis.delete(payload);
    if (response && !error) {
      result = response.deleteyn;
    }
    return result;
  }

  reloadSchedule() {
    const { startDate } = this.state.viewModel;
    const { empNo } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        this.setState(prevState => {
          const { viewModel, currentBay } = prevState;
          viewModel.setResources(currentBay === '' ? users : users.filter(user => user.bay === currentBay));
          viewModel.setEvents(events);
          return { viewModel, users, events, isLoading: false };
        });
      });
    });
  }

  async postVacation(payload) {
    const { response, error } = await service.manHis.post(payload);
    if (response && !error) {
      this.initHandler();
    }
  }

  handleChangeBay(e) {
    const { value } = e.target;
    this.setState(prevState => {
      const { viewModel, users } = prevState;
      const filteredUsers = value === '' ? users : users.filter(user => user.bay === value);
      viewModel.setResources(filteredUsers);
      return { currentBay: value, viewModel };
    });
  }

  getSchedulerData(width, height) {
    const { viewModel } = this.state;
    viewModel.config.schedulerWidth = width;
    viewModel.config.schedulerMaxHeight = height - 100;
    return viewModel;
  }

  render() {
    const { viewModel, isLoading, bays, currentBay, myWorkJo } = this.state;
    const { empNo, usrNm, banjangId, site } = this.props;
    return (
      <StyledScheduler>
        <StyledStandard>
          <div style={{ marginBottom: 10 }}>
            <span className="area-title">휴가 등록</span>
          </div>
          <SchedulerForm empNo={empNo} usrNm={usrNm} banjangId={banjangId} callbackHandler={this.reloadSchedule} site={site} workjo={myWorkJo} />
          <div style={{ marginTop: 30 }}>
            <span className="area-title">휴가 목록</span>
          </div>
          <div style={{ margin: '10px 0', position: 'relative', height: 40 }}>
            <div style={{ display: 'inline-block' }}>
              <select
                value={currentBay}
                onChange={this.handleChangeBay}
                style={{ width: 200, height: 40, lineHeight: '40px' }}
                placeholder="BAY를 선택해주세요."
              >
                {/* <option value="">전체 BAY</option> */}
                {bays.map(bay => (
                  <option key={bay} value={bay}>
                    {bay}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'inline-block', position: 'absolute', right: 0, top: 10 }}>
              <div className="status-dot" style={{ display: 'inline-block', backgroundColor: '#3D5AFE', verticalAlign: 'middle' }} />
              <span className="header2-text" style={{ marginLeft: 5, marginRight: 5 }}>
                휴가신청
              </span>
              <div className="status-dot" style={{ display: 'inline-block', backgroundColor: '#78909C', verticalAlign: 'middle' }} />
              <span className="header2-text" style={{ marginLeft: 5, marginRight: 5 }}>
                반차신청
              </span>
              <div className="status-dot" style={{ display: 'inline-block', backgroundColor: '#009688', verticalAlign: 'middle' }} />
              <span className="header2-text" style={{ marginLeft: 5, marginRight: 5 }}>
                승인
              </span>
              <div className="status-dot" style={{ display: 'inline-block', backgroundColor: '#B00020', verticalAlign: 'middle' }} />
              <span className="header2-text" style={{ marginLeft: 5, marginRight: 5 }}>
                반려
              </span>
            </div>
          </div>
          <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
            <div style={{ height: 800 }}>
              <AutoSizer>
                {({ height, width }) => (
                  <Scheduler
                    schedulerData={this.getSchedulerData(width, height)}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    onSelectDate={this.onSelectDate}
                    eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
                    onViewChange={() => false}
                  />
                )}
              </AutoSizer>
            </div>
          </Spin>
        </StyledStandard>
      </StyledScheduler>
    );
  }
}

SchedulerView.propTypes = {
  empNo: PropTypes.string.isRequired,
  usrNm: PropTypes.string.isRequired,
};

export default DragDropContext(HTML5Backend)(SchedulerView);
