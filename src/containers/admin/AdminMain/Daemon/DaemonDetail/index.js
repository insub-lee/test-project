import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Switch, TimePicker, Select, Tabs } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import cronstrue from 'cronstrue/i18n';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import message from 'components/Feedback/message';
import { intlObj, lang } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import Footer from 'containers/admin/App/Footer';
import StyledButton from 'components/Button/StyledButton.js';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import StyleDaemonForm from './StyleDaemonForm';
import StyleDaemonDtl from './StyleDaemonDtl';
import messages from '../messages';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;

const cronValid = str => {
  const re = /(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/g;
  return re.test(String(str).toLowerCase());
};
const defaultCronExpress = '0 0 0 1 * *';
const setListState = state => ({
  sortColumn: state.listSortColumn,
  sortDirection: state.listSortDirection,
  keyword: state.listKeyword,
  stopYn: state.listStopYn,
});

class DaemonDetail extends React.Component {
  constructor(prop) {
    super(prop);
    const daemonId = prop.match.params.DAEMON_ID ? prop.match.params.DAEMON_ID : 0;
    const location = this.props.history.location.state;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      daemonId: -1,
      nameKor: '',
      nameEng: '',
      nameChn: '',
      nameJpn: '',
      nameEtc: '',
      dscrKor: '',
      dscrEng: '',
      dscrChn: '',
      dscrKpn: '',
      dscrEtc: '',
      daemonKey: '',
      stopYn: 'Y',
      schedule: defaultCronExpress,
      mode: prop.match.params.DAEMON_ID ? 'D' : 'I',
      listSortColumn: location === undefined ? '' : location.sortColumnParam,
      listSortDirection: location === undefined ? '' : location.sortDirectionParam,
      listKeyword: location === undefined ? '' : location.keyword,
      listStopYn: location === undefined ? '' : location.stopYn,
    };
    if (daemonId && this.state.mode === 'D') {
      this.props.getDaemonInfo(Number(daemonId));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.mode === 'D') {
      if (this.state.daemonId < 1 || JSON.stringify(prevProps.daemonInfo) !== JSON.stringify(this.props.daemonInfo)) {
        this.setDaemonInfo(this.props.daemonInfo);
      }
    }
  }

  onClickToList = () => {
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/adminmain/daemon',
      state: setListState(this.state),
    });
  };

  setDaemonInfo = daemonInfo => {
    this.setState({
      daemonId: daemonInfo.DAEMON_ID,
      nameKor: daemonInfo.NAME_KOR,
      nameEng: daemonInfo.NAME_ENG,
      nameChn: daemonInfo.NAME_CHN,
      nameJpn: daemonInfo.NAME_JPN,
      nameEtc: daemonInfo.NAME_ETC,
      dscrKor: daemonInfo.DSCR_KOR,
      dscrEng: daemonInfo.DSCR_ENG,
      dscrChn: daemonInfo.DSCR_CHN,
      dscrJpn: daemonInfo.DSCR_JPN,
      dscrEtc: daemonInfo.DSCR_ETC,
      daemonKey: daemonInfo.DAEMON_KEY,
      stopYn: daemonInfo.STOP_YN,
      schedule: daemonInfo.SCHEDULE,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSwitchChange = checked => {
    this.setState({
      stopYn: checked ? 'N' : 'Y',
    });
  };

  validStatus = (val, type) => {
    if (this.state.mode === 'D') return '';
    switch (type) {
      case 'schedule':
        return val !== '' && !cronValid(val) ? 'error' : '';
      case 'daemonKey':
        return val !== '' ? '' : 'error';
      default:
        return val !== '' ? 'success' : 'error';
    }
  };

  vaildChk = () => {
    if (
      this.state.nameKor.trim() !== '' &&
      this.state.nameKor !== null &&
      this.state.daemonKey !== null &&
      this.state.daemonKey !== '' &&
      this.state.stopYn !== null &&
      this.state.stopYn !== ''
    ) {
      if (this.state.schedule !== '' && this.state.schedule !== null) {
        if (!cronValid(this.state.schedule)) {
          message.error(`${intlObj.get(messages.chkInput)}`, 2);
          return false;
        }
      }
      return true;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  };

  regConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.regConfirm)}`, '', this.regDaemon);
    }
  };

  regDaemon = () => {
    const daemonInfo = {
      daemonId: Number(this.state.daemonId),
      nameKor: this.state.nameKor,
      nameEng: this.state.nameEng,
      nameChn: this.state.nameChn,
      nameJpn: this.state.nameJpn,
      nameEtc: this.state.nameEtc,
      dscrKor: this.state.dscrKor,
      dscrEng: this.state.dscrEng,
      dscrChn: this.state.dscrChn,
      dscrJpn: this.state.dscrJpn,
      dscrEtc: this.state.dscrEtc,
      daemonKey: this.state.daemonKey,
      stopYn: this.state.stopYn,
      schedule: this.state.schedule,
    };
    const { history, insertDaemonInfo, updateDaemonInfo } = this.props;
    const listParam = setListState(this.state);

    if (this.state.mode === 'I') insertDaemonInfo(daemonInfo, listParam, history, this.onSaveSuccess);
    else updateDaemonInfo(daemonInfo, listParam, history, this.onSaveSuccess);
  };

  onSaveSuccess = () => {
    this.setState({ mode: 'D' });
  };

  handleScheduleMonthChange = e => {
    const cronSchedule = this.state.schedule ? this.state.schedule : defaultCronExpress;
    const cronArray = cronSchedule.split(' ');
    cronArray[3] = e;
    cronArray[5] = '*';
    this.setState({
      schedule: cronArray.join(' '),
    });
  };

  handleScheduleWeekChange = e => {
    const cronSchedule = this.state.schedule ? this.state.schedule : defaultCronExpress;
    const cronArray = cronSchedule.split(' ');
    cronArray[5] = e;
    cronArray[3] = '*';
    this.setState({
      schedule: cronArray.join(' '),
    });
  };

  handleScheduleDayChange = e => {
    const cronSchedule = this.state.schedule ? this.state.schedule : defaultCronExpress;
    const cronArray = cronSchedule.split(' ');
    cronArray[3] = `1/${e}`;
    cronArray[5] = '*';
    this.setState({
      schedule: cronArray.join(' '),
    });
  };

  handleScheduleTimeChange = time => {
    const cronSchedule = this.state.schedule ? this.state.schedule : defaultCronExpress;
    const cronArray = cronSchedule.split(' ');
    cronArray[0] = time.format('ss');
    cronArray[1] = time.format('mm');
    cronArray[2] = time.format('HH');
    this.setState({
      schedule: cronArray.join(' '),
    });
  };

  button = () => {
    const { mode } = this.state;
    if (mode === 'D') {
      return (
        <ErrorBoundary>
          <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
            {intlObj.get(messages.lblList)}
          </StyledButton>
          <StyledButton className="btn-primary" onClick={() => this.setState({ mode: 'U' })}>
            {intlObj.get(messages.lblUdt)}
          </StyledButton>
          <StyledButton className="btn-secondary" onClick={() => this.confirmDeleteDaemon()}>
            {intlObj.get(messages.lblDel)}
          </StyledButton>
        </ErrorBoundary>
      );
    }
    if (mode === 'U') {
      return (
        <ErrorBoundary>
          <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
            {intlObj.get(messages.lblList)}
          </StyledButton>
          <StyledButton
            className="btn-light"
            onClick={() => {
              this.setDaemonInfo(this.props.daemonInfo);
              this.setState({ mode: 'D' });
            }}
          >
            {intlObj.get(messages.lblCancel)}
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.regConfirm}>
            {intlObj.get(messages.lblSave)}
          </StyledButton>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
          {intlObj.get(messages.lblList)}
        </StyledButton>
        <StyledButton className="btn-primary" onClick={this.regConfirm}>
          {intlObj.get(messages.lblReg)}
        </StyledButton>
      </ErrorBoundary>
    );
  };

  confirmDeleteDaemon = () => {
    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.deleteDaemon);
  };

  deleteDaemon = () => {
    const { deleteDaemon, history } = this.props;
    const { daemonId } = this.state;
    const listParam = setListState(this.state);
    deleteDaemon(daemonId, history, listParam);
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    return (
      <div>
        <StyleDaemonDtl>
          <h3 className="pageTitle regist">{intlObj.get(messages.titleDaemonReg)}</h3>
          <StyleDaemonForm>
            <table className="adminTbl daemonTbl">
              <tbody>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">{intlObj.get(messages.titleDaemonNameKor)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.nameKor, '')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonNameKor)}
                          name="nameKor"
                          value={this.state.nameKor}
                          onChange={this.handleChange}
                          maxLength={200}
                          id="s1"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s2">{intlObj.get(messages.titleDaemonNameEng)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonNameEng)}
                          name="nameEng"
                          value={this.state.nameEng}
                          onChange={this.handleChange}
                          maxLength={200}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s2"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s3">{intlObj.get(messages.titleDaemonNameChn)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonNameChn)}
                          name="nameChn"
                          value={this.state.nameChn}
                          onChange={this.handleChange}
                          maxLength={200}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s3"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s4">{intlObj.get(messages.titleDaemonDscrKor)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonDscrKor)}
                          name="dscrKor"
                          value={this.state.dscrKor}
                          onChange={this.handleChange}
                          maxLength={2000}
                          id="s4"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s5">{intlObj.get(messages.titleDaemonDscrEng)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonDscrEng)}
                          name="dscrEng"
                          value={this.state.dscrEng}
                          onChange={this.handleChange}
                          maxLength={2000}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s5"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="s6">{intlObj.get(messages.titleDaemonDscrChn)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.titleDaemonDscrChn)}
                          name="dscrChn"
                          value={this.state.dscrChn}
                          onChange={this.handleChange}
                          maxLength={2000}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s6"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s7">{intlObj.get(messages.daemoKey)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.validStatus(this.state.daemonKey, 'daemonKey')}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.daemoKey)}
                          name="daemonKey"
                          value={this.state.daemonKey}
                          onChange={this.handleChange}
                          maxLength={2000}
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s7"
                          readOnly={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s8">{intlObj.get(messages.stopYn)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <ErrorBoundary>
                        <Switch
                          checked={this.state.stopYn === 'N'}
                          name="stopYn"
                          checkedChildren={intlObj.get(messages.statusWork)}
                          unCheckedChildren={intlObj.get(messages.statusStop)}
                          onChange={this.handleSwitchChange}
                          id="s8"
                          disabled={this.state.mode === 'D'}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s9">{intlObj.get(messages.schedule)}</label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={this.validStatus(this.state.schedule, 'schedule')}
                      style={{ display: this.state.mode === 'D' ? 'none' : '' }}
                    >
                      <ErrorBoundary>
                        <Tabs defaultActiveKey="1" style={{ width: 250 }}>
                          <TabPane tab="매월" key="1">
                            <Select
                              name="month"
                              style={{ width: 120 }}
                              placeholder={intlObj.get(messages.selectPlaceholder)}
                              onChange={this.handleScheduleMonthChange}
                            >
                              {Array.from(Array(31), (e, i) => (
                                <Option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </Option>
                              ))}
                              <Option key="99" value="L">
                                {intlObj.get(messages.lastday)}
                              </Option>
                            </Select>&nbsp;일
                          </TabPane>
                          <TabPane tab="매주" key="2">
                            <Select
                              name="week"
                              style={{ width: 120 }}
                              placeholder={intlObj.get(messages.selectPlaceholder)}
                              onChange={this.handleScheduleWeekChange}
                            >
                              {moment.weekdaysShort(true).map((e, i) => (
                                <Option key={i} value={i}>
                                  {e}
                                </Option>
                              ))}
                            </Select>&nbsp;요일
                          </TabPane>
                          <TabPane tab="매일" key="3">
                            <Select
                              name="day"
                              style={{ width: 120 }}
                              placeholder={intlObj.get(messages.selectPlaceholder)}
                              onChange={this.handleScheduleDayChange}
                            >
                              {Array.from(Array(31), (e, i) => (
                                <Option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </Option>
                              ))}
                            </Select>&nbsp;일마다
                          </TabPane>
                        </Tabs>
                        <TimePicker
                          name="time"
                          format="HH:mm:ss"
                          placeholder={intlObj.get(messages.selectPlaceholder)}
                          onChange={this.handleScheduleTimeChange}
                          allowClear={false}
                        />
                      </ErrorBoundary>
                      <span className="tipText" />
                    </FormItem>
                    {`[${this.state.schedule}] ${cronstrue.toString(this.state.schedule ? this.state.schedule : defaultCronExpress, {
                      locale: lang.getLocale(),
                    })}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleDaemonForm>
          <div className="buttonWrapper">{this.button()}</div>
        </StyleDaemonDtl>
        <Footer />
      </div>
    );
  }
}

DaemonDetail.propTypes = {
  isLoading: PropTypes.bool, //eslint-disable-line
  insertDaemonInfo: PropTypes.func, //eslint-disable-line
  updateDaemonInfo: PropTypes.func, //eslint-disable-line
  getDaemonInfo: PropTypes.func, //eslint-disable-line
  deleteDaemon: PropTypes.func, //eslint-disable-line
  daemonInfo: PropTypes.object, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  updateDaemonInfo: (daemonInfo, listParam, history, onSaveSuccess) => dispatch(actions.updateDaemonInfo(daemonInfo, listParam, history, onSaveSuccess)),
  insertDaemonInfo: (daemonInfo, listParam, history, onSaveSuccess) => dispatch(actions.insertDaemonInfo(daemonInfo, listParam, history, onSaveSuccess)),
  getDaemonInfo: daemonId => dispatch(actions.getDaemonInfo(daemonId)),
  deleteDaemon: (daemonId, history) => dispatch(actions.deleteDaemon(daemonId, history)),
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectors.makeIsLoading(),
  daemonInfo: selectors.makeSelectDaemon(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'admin/adminmain/daemon/detail', saga });
const withReducer = injectReducer({ key: 'admin/adminmain/daemon/detail', reducer });

export default compose(withReducer, withSaga, withConnect)(DaemonDetail);
