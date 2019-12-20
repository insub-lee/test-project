import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Checkbox, Popover } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import parse from 'html-react-parser';

import { intlObj, lang } from 'utils/commonUtils';
import TrashcanIcon from 'images/portal/icon-trashcan.png';
import injectSaga from '../../../../utils/injectSaga';
import { loadAlarm, readAlarm, allReadAlarm, deleteAlarm, deleteAllAlarm, offAlarm } from './actions';
import Button from '../../../../components/Button';
import Badge from '../../../../components/Badge';
import injectReducer from '../../../../utils/injectReducer';
import { makeAlarm, makeSelectIsNotify, currentView } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import StyleUserNotice from './StyleUserNotice';
let pageNum = 30;
const pageIndex = 10;
let sHeight;
class AlarmPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      checked: false,
      list: [],
      delete: false,
      class: 'details two',
    };
    this.onModal = this.onModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRead = this.onRead.bind(this);
    this.onAllRead = this.onAllRead.bind(this);
    this.deleteAlarm = this.deleteAlarm.bind(this);
    this.deleteAllAlarm = this.deleteAllAlarm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doDetail = this.doDetail.bind(this);
    this.noneDoDetail = this.noneDoDetail.bind(this);
  }

  componentWillMount() {
    this.props.loadAlarm(pageNum);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alarm) {
      for (let i = 0; i < nextProps.alarm.length; i++) {
        if (nextProps.alarm[i].READ_YN === 'N') {
          this.state.list.push(nextProps.alarm[i]);
        }
      }
    }
    if (this.state.list.length > 0 && this.props.alarm.length !== nextProps.alarm.length && this.state.delete !== true) {
      this.setState({ delete: false });
    }
  }

  onModal() {
    this.props.offAlarm();
    this.setState({ show: !this.state.show });
  }

  onRead(id) {
    this.props.readAlarm(id);
  }

  onAllRead() {
    this.props.allReadAlarm();
  }

  closeModal() {
    this.setState({ show: false });
  }

  deleteAlarm(id) {
    this.props.deleteAlarm(id);
    this.setState({ delete: true });
  }

  deleteAllAlarm(alarm) {
    const id = [];
    alarm.map(a => id.push(a.MSG_ID));

    this.props.deleteAllAlarm(id);
    this.setState({ delete: true });
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight, top } = values;
    const t = scrollHeight - clientHeight;
    if (t === scrollTop && sHeight !== scrollHeight) {
      pageNum += pageIndex;
      this.props.loadAlarm(pageNum);
      sHeight = scrollHeight;
    }
  }

  doDetail(id) {
    const idx = this.props.alarm.findIndex(i => i.MSG_ID === id);
    this.props.alarm[idx].detail = 'true';

    this.setState({ class: 'details' });
  }

  noneDoDetail(id) {
    const idx = this.props.alarm.findIndex(i => i.MSG_ID === id);
    delete this.props.alarm[idx].detail;

    this.setState({ class: 'details two' });
  }

  render() {
    const { currentView } = this.props;
    let className = '';
    let height;

    switch (currentView) {
      case 'DesktopWide':
        className = 'alarmPopover';
        height = 220;
        break;
      case 'Desktop':
        className = 'alarmPopover';
        height = 220;
        break;
      case 'DesktopNarrow':
        className = 'alarmPopover';
        height = 220;
        break;
      case 'Tablet':
        className = 'alarmPopover';
        height = 220;
        break;
      default:
        className = 'alarmPopoverMobile';
        height = 'calc(100vh - 100px)';
    }

    const historyContent = (
      <StyleUserNotice>
        <div className="alarmCtlBtnWrapper">
          <a className="changeAllAlarmsRead" onClick={this.onAllRead}>
            {intlObj.get(messages.checkAllRead)}
          </a>
          <a className="deleteAllAlarms" onClick={() => this.deleteAllAlarm(this.props.alarm)}>
            {intlObj.get(messages.deleteAll)}
          </a>
        </div>
        <div className="alarmListTable">
          <Scrollbars className="scrlbAlarm" style={{ minWidth: 397, height }} onUpdate={this.handleUpdate}>
            {this.props.alarm.length > 0 ? (
              this.props.alarm.map((alist, i) => (
                <table className={alist.READ_YN === 'Y' ? 'read' : 'unread'} key={i}>
                  <tbody>
                    <tr>
                      <td rowSpan="2">{alist.READ_YN === 'N' ? '●' : '○'}</td>
                      {/* <td>[<div className="ellipsis">{lang.get('TITLE', alist)}</div>]</td> */}
                      <td>
                        <a className="ellipsis" style={{ color: 'black' }} href={alist.URL} target="_blank" onClick={() => this.onRead(alist.MSG_ID)}>
                          {parse(lang.get('TITLE', alist))}
                        </a>
                      </td>
                      <td>{alist.REG_DTTM}</td>
                      {/* 형식: 2018-10-02 */}
                      <td>
                        {alist.READ_YN === 'N' ? (
                          <Checkbox className="customCheckboxType1" onClick={() => this.onRead(alist.MSG_ID)} checked={this.state.checked} />
                        ) : (
                          <Checkbox className="customCheckboxType1" checked={!this.state.checked} />
                        )}
                      </td>
                      <td>
                        <Button type="button" onClick={() => this.deleteAlarm(alist.MSG_ID)}>
                          <img src={TrashcanIcon} alt="삭제" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <div className={alist.detail ? 'details' : 'details two'}>
                          {' '}
                          {/* class="details" -> 전체 내용, class="details two" -> 2줄 */}
                          <p style={{ width: '340px' }}>{parse(lang.get('CONTENT', alist))}</p>
                          {alist.detail ? (
                            <button className="less" idx={alist.RNUM} onClick={() => this.noneDoDetail(alist.MSG_ID)}>
                              <span>- 닫기</span>
                            </button>
                          ) : (
                            <button className="more" idx={alist.RNUM} onClick={() => this.doDetail(alist.MSG_ID)}>
                              <span>+ 더보기</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>{intlObj.get(messages.noAlarm)}</p>
            )}
          </Scrollbars>
        </div>
      </StyleUserNotice>
    );
    return (
      <div className="alarmPage">
        <Popover placement="bottom" content={historyContent} overlayClassName={className} trigger="click">
          <Button className="mAlarmButton" onClick={this.onModal}>
            <span className="icon icon-bell" />
            {this.props.isNoti === '1' ? <Badge dot /> : false}
          </Button>
        </Popover>
      </div>
    );
  }
}
AlarmPopover.propTypes = {};
AlarmPopover.defaultProps = {};
const mapStateToProps = createStructuredSelector({
  alarm: makeAlarm(),
  isNoti: makeSelectIsNotify(),
  currentView: currentView(),
});
export function mapDispatchToProps(dispatch) {
  return {
    loadAlarm: pageNum => dispatch(loadAlarm(pageNum)),
    readAlarm: id => dispatch(readAlarm(id)),
    allReadAlarm: () => dispatch(allReadAlarm()),
    deleteAlarm: id => dispatch(deleteAlarm(id)),
    deleteAllAlarm: id => dispatch(deleteAllAlarm(id)),
    offAlarm: () => dispatch(offAlarm()),
  };
}
const withReducer = injectReducer({ key: 'notice', reducer });
const withSaga = injectSaga({ key: 'notice', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(AlarmPopover);
