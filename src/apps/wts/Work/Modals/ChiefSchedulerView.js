import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';
import ReactTooltip from 'react-tooltip';
import { orderBy } from 'lodash';

import { jsonToQueryString } from 'utils/helpers';
import AcceptModal from './AcceptModal';
import SendMessageModal from './SendMessageModal';
import StyledScheduler from './StyledScheduler';
import service from '../service';
import ChiefSchedulerFormModal from './ChiefSchedulerFormModal';

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

const today = new Date();

class ChiefSchedulerView extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('ko');
    const schedulerData = new SchedulerData(
      moment(today).format('YYYY-MM-DD'),
      ViewTypes.Month,
      false,
      false,
      {
        startResizable: false,
        endResizable: false,
        movable: false,
        creatable: false,
        views: [],
        eventItemPopoverDateFormat: 'M월D일',
        resourceName: '근무자',
      },
      {},
      moment,
    );
    schedulerData.setLocaleMoment(moment);
    schedulerData.config.schedulerWidth = 800;
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
    };

    this.initHandler = this.initHandler.bind(this);
    this.fetchVacationList = this.fetchVacationList.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.accept = this.accept.bind(this);
    this.openMessageModal = this.openMessageModal.bind(this);
    this.openAcceptModal = this.openAcceptModal.bind(this);
    this.openSendMessageModal = this.openSendMessageModal.bind(this);
    this.eventItemPopoverTemplateResolver = this.eventItemPopoverTemplateResolver.bind(this);
    this.reloadSchedule = this.reloadSchedule.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.cancelVacation = this.cancelVacation.bind(this);
    this.deleteVacation = this.deleteVacation.bind(this);
    this.handleChangeBay = this.handleChangeBay.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);

    this.acceptModal = React.createRef();
    this.sendMessageModal = React.createRef();
    this.registerModal = React.createRef();
  }

  componentDidMount() {
    this.initHandler();
  }

  initHandler() {
    const { viewModel } = this.state;
    const {
      empNo,
      manInfo: { area, workjo },
    } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(today).format('YYYYMM')).then(payload => {
        const { users, events, bays } = payload;
        const ownUsers = users.filter(member => member.area === area && member.workjo === workjo);
        const etcUsers = users.filter(member => member.area !== area || member.workjo !== workjo);
        const nextUsers = ownUsers.concat(etcUsers);

        // viewModel.setResources(nextUsers);
        viewModel.setResources([]);
        viewModel.setEvents(events);

        this.setState({ viewModel, users: nextUsers, events, isLoading: false, bays, currentBay: '' });
      });
    });
  }

  openRegisterModal(userInfo) {
    this.registerModal.current.handleOpenModal(userInfo.empno, userInfo.usrnm);
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
            // name: `${user.bay} - ${user.usrnm}(${user.empno})`,
            workjo: user.workjo,
            name: (
              <button type="button" className="clickable_button" onClick={() => this.openRegisterModal(user)}>
                {`${user.workjo} ${user.usrnm}(${user.empno})`}
              </button>
            ),
            bay: user.bay,
          };
        }),
        ['workjo'],
        ['asc'],
      );
      payload.bays = bays;
      payload.events = events.map(event => ({
        id: `${event.empno}-${event.vacationdt}-${event.vacationgubun}`,
        name: `${event.usrnm}(${event.empno})`,
        resourceId: event.empno,
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
    const {
      empNo,
      manInfo: { area, workjo },
    } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events, bays } = payload;
        const { currentBay } = this.state;
        const ownUsers = users.filter(member => member.area === area && member.workjo === workjo);
        const etcUsers = users.filter(member => member.area !== area || member.workjo !== workjo);
        const nextUsers = ownUsers.concat(etcUsers);
        schedulerData.setResources(currentBay === '' ? [] : nextUsers.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users: nextUsers, events, bays, isLoading: false });
      });
    });
  }

  nextClick(schedulerData) {
    schedulerData.next();
    const { startDate } = schedulerData;
    const {
      empNo,
      manInfo: { area, workjo },
    } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events, bays } = payload;
        const { currentBay } = this.state;
        const ownUsers = users.filter(member => member.area === area && member.workjo === workjo);
        const etcUsers = users.filter(member => member.area !== area || member.workjo !== workjo);
        const nextUsers = ownUsers.concat(etcUsers);
        schedulerData.setResources(currentBay === '' ? [] : nextUsers.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users: nextUsers, events, bays, isLoading: false });
      });
    });
  }

  onSelectDate(schedulerData, date) {
    const {
      empNo,
      manInfo: { area, workjo },
    } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, date.format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        const ownUsers = users.filter(member => member.area === area && member.workjo === workjo);
        const etcUsers = users.filter(member => member.area !== area || member.workjo !== workjo);
        const nextUsers = ownUsers.concat(etcUsers);

        const { currentBay } = this.state;
        schedulerData.setDate(date);
        schedulerData.setResources(currentBay === '' ? nextUsers : nextUsers.filter(user => user.bay === currentBay));
        schedulerData.setEvents(events);
        this.setState({ viewModel: schedulerData, users: nextUsers, events, isLoading: false });
      });
    });
  }

  accept(schedulerData, eventItem) {
    const { id } = eventItem;
    const [empNo, workDt] = id.split('-');
    this.openAcceptModal(empNo, workDt);
  }

  openMessageModal(schedulerData, eventItem) {
    const { id } = eventItem;
    const [empNo, workDt] = id.split('-');
    // Todo - Send Message Modal
    this.openSendMessageModal(empNo, workDt);
  }

  openAcceptModal(empNo, workDt) {
    this.acceptModal.current.handleOpenModal(empNo, workDt);
  }

  openSendMessageModal(empNo, workDt) {
    this.sendMessageModal.current.handleOpenModal(empNo, workDt);
  }

  eventItemPopoverTemplateResolver(schedulerData, eventItem, title, start, end, statusColor) {
    return (
      <div style={{ width: '150px' }}>
        <div>
          <div className="status-dot" style={{ display: 'inline-block', backgroundColor: statusColor, verticalAlign: 'middle' }} />
          <span className="header2-text" title={title} style={{ marginLeft: 5 }}>
            {`${title}`}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          {eventItem.bansign !== 'O' && eventItem.bansign !== 'X' && (
            <>
              <button
                type="button"
                style={{ ...popoverButtonStyle, fontSize: 20, marginRight: 10, color: '#009688' }}
                onClick={() => this.accept(schedulerData, eventItem)}
                data-tip
                data-for={`${eventItem.id}-accept`}
              >
                <i className="fas fa-check-circle" />
              </button>
              <ReactTooltip id={`${eventItem.id}-accept`} type="dark">
                <span>승인</span>
              </ReactTooltip>
            </>
          )}
          {eventItem.bansign !== 'X' && (
            <>
              <button
                type="button"
                style={{ ...popoverButtonStyle, fontSize: 20, marginRight: 10, color: '#B00020' }}
                onClick={() => this.openMessageModal(schedulerData, eventItem)}
                data-tip
                data-for={`${eventItem.id}-ban`}
              >
                <i className="fas fa-ban" />
              </button>
              <ReactTooltip id={`${eventItem.id}-ban`} type="dark">
                <span>반려</span>
              </ReactTooltip>
            </>
          )}
          {/*
          <button
            type="button"
            style={{ ...popoverButtonStyle, fontSize: 20 }}
            onClick={() => this.cancelVacation(eventItem)}
            data-tip
            data-for={`${eventItem.id}-cancel`}
          >
            <i className="fas fa-times-circle" />
          </button>
          <ReactTooltip id={`${eventItem.id}-cancel`} type="dark">
            <span>취소</span>
          </ReactTooltip>
          */}
        </div>
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
    if (window.confirm(`${name}님의 ${moment(workDt, 'YYYYMMDD').format('YYYY.MM.DD')}의 휴가를 취소하시겠습니까?`)) {
      const payload = { empNo, workDt, vacation: 'O' };
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
    const { response, error } = await service.manHisChief.delete(payload);
    if (response && !error) {
      result = response.deleteyn;
    }
    return result;
  }

  reloadSchedule() {
    const { startDate } = this.state.viewModel;
    const {
      empNo,
      manInfo: { area, workjo },
    } = this.props;
    this.setState({ isLoading: true }, () => {
      this.fetchVacationList(empNo, moment(startDate, 'YYYY-MM-DD').format('YYYYMM')).then(payload => {
        const { users, events } = payload;
        const ownUsers = users.filter(member => member.area === area && member.workjo === workjo);
        const etcUsers = users.filter(member => member.area !== area || member.workjo !== workjo);
        const nextUsers = ownUsers.concat(etcUsers);

        this.setState(prevState => {
          const { viewModel, currentBay } = prevState;
          const filteredUsers = currentBay !== '' ? nextUsers.filter(user => user.bay === currentBay) : [];
          viewModel.setResources(filteredUsers);
          viewModel.setEvents(events);
          return { viewModel, users: nextUsers, events, isLoading: false };
        });
      });
    });
  }

  onViewChange(schedulerData, view) {
    this.setState({
      viewModel: schedulerData,
    });
  }

  handleChangeBay(e) {
    const { value } = e.target;
    this.setState(prevState => {
      const { viewModel, users } = prevState;
      const filteredUsers = value === '' ? [] : users.filter(user => user.bay === value);
      viewModel.setResources(filteredUsers);
      return { currentBay: value, viewModel };
    });
  }

  render() {
    const { viewModel, isLoading, bays, currentBay } = this.state;
    return (
      <StyledScheduler>
        <div style={{ margin: '20px 0 10px 0', position: 'relative', height: 40 }}>
          <div style={{ display: 'inline-block' }}>
            <select value={currentBay} onChange={this.handleChangeBay} style={{ width: 200, height: 40, lineHeight: '40px' }} placeholder="BAY를 선택해주세요.">
              {/* <option value="">전체 BAY</option> */}
              <option value="">BAY를 선택해주세요.</option>
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
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
            onViewChange={this.onViewChange}
          />
        </Spin>
        <AcceptModal ref={this.acceptModal} callbackHandler={this.reloadSchedule} />
        <SendMessageModal ref={this.sendMessageModal} callbackHandler={this.reloadSchedule} />
        <ChiefSchedulerFormModal ref={this.registerModal} callbackHandler={this.reloadSchedule} />
      </StyledScheduler>
    );
  }
}

ChiefSchedulerView.propTypes = {
  empNo: PropTypes.string.isRequired,
};

export default DragDropContext(HTML5Backend)(ChiefSchedulerView);
