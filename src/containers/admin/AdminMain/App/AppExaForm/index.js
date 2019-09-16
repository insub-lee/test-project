// import React, { PureComponent } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { Button, Form, Checkbox } from 'antd';
import * as feed from 'components/Feedback/functions';
import AppMaNagerList from 'components/OrgReturnView';
import { SingleDatePicker } from 'components/uielements/reactDates';
import Organization from 'containers/portal/components/Organization';
import { intlObj, lang } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { Link } from 'react-router-dom';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from '../messages';
import { LinkBtnLgtGray, LinkBtnList, BtnDkGray } from 'containers/admin/components/uielements/buttons.style';
import StyleAppExaForm from './StyleAppExaForm';

const FormItem = Form.Item;
class AppExaForm extends React.Component {
  constructor(prop) {
    super(prop);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.state = {
      managerOrgShow: false,
      managerSetMembers: [],
      date: moment(tomorrow),
      focused: false,
      CONTENT: '',
      APP_ID: prop.APP_ID,
      VER: prop.VER,
      checkToday: false,
      EXA_MODE: prop.EXA_MODE,
    };

    this.props.getMyAppExaDetail(
      prop.APP_ID,
      prop.VER,
      prop.EXA_MODE,
    );
  }

  onChangeToday = (e) => {
    if (e.target.checked) {
      const toDay = new Date();
      this.setState({
        date: moment(toDay),
        focused: false,
        checkToday: true,
      });
    } else {
      this.setState({
        checkToday: false,
      });
    }
  };
  managerOrgOpen = () => {
    this.setState({
      managerOrgShow: true,
    });
  };
  managerOrgClose = () => {
    this.setState({
      managerOrgShow: false,
    });
  };
  calendarOn = () => {
    this.setState({
      focused: true,
    });
  };

  appExamineOn = () => {
    const year = new Date(this.state.date).getFullYear();
    const month = `00${new Date(this.state.date).getMonth() + 1}`.slice(-2);
    const date = `00${new Date(this.state.date).getDate()}`.slice(-2);

    const SVC_REQ_DT = `${year}${month}${date}`;

    this.props.appExamine(
      this.state.managerSetMembers,
      this.state.CONTENT,
      SVC_REQ_DT,
      this.state.APP_ID,
      this.state.VER,
      this.props.history,
    );
  }
  appExamineChk = () => {
    feed.showConfirm(`${intlObj.get(messages.appExamineYn)}`, '', this.appExamineOn);
  };

  appExamine = () => {
    if (this.state.CONTENT.length > 0
      && this.state.managerSetMembers.length > 0
    ) {
      this.appExamineChk();
    } else {
      message.error(
        <MessageContent>
          {intlObj.get(messages.reqValFail)}
        </MessageContent>,
        3,
      );
    }
  };

  managerPop = () => {
    feed.success('개발 예정인 기능 입니다.');
  };
  render() {
    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganization = (resultObj) => {
      const { managerSetMembers } = this.state;
      // const {
      //   handleSaveSettingMembers,
      // } = this.props;

      const managerSetMembersCopy = managerSetMembers.slice();
      const managerSetMembersFromOrganization = resultObj.selectedUsers;

      managerSetMembersFromOrganization.map((obj) => {
        if (managerSetMembers.findIndex(o => o.USER_ID === obj.USER_ID) === -1) {
          managerSetMembersCopy.push(obj);
        }
        return managerSetMembersCopy;
      });

      this.setState({
        managerSetMembers: managerSetMembersCopy,
      });
    };
    const returnManagerList = (resultObj) => {
      this.setState({
        managerSetMembers: resultObj,
      });
    };
    const onChangeContent = (val) => {
      this.setState({ CONTENT: val.target.value });
    };
    const loopProcList = data =>
      data.map(item => (
        <li key={item.APV_REQ_ID}>
          {/* <p className="comments">{item.COMNT}</p> */}
          <div className="authorItem">
            <div className="memPic">
              <img
                className="listImg"
                src={`/portalWeb/uploadfile/pictures/${item.EMP_NO}.jpg`}
                alt={lang.get('NAME', item)}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            [
            {item.APV_STATUS_CD === 'P' ? intlObj.get(messages.searchTypeP) : ''}
            {item.APV_STATUS_CD === 'R' ? intlObj.get(messages.searchTypeR) : ''}
            {item.APV_STATUS_CD === 'C' ? intlObj.get(messages.okay) : ''}
            ]&nbsp;
            {lang.get('NAME', item)}
            ({item.EMP_NO})&nbsp;/&nbsp;
            {lang.get('DEPT_NAME', item)}&nbsp;/&nbsp;
            {lang.get('PSTN_NAME', item)}
            &nbsp;&nbsp;{item.CONF_DTTM}
          </div>
        </li>
      ));
    const loopProcComnt = data =>
      data.map(item => (
        <li key={item.APV_REQ_ID}>
          {item.APV_STATUS_CD === 'C' ?
            <p className="comments">{intlObj.get(messages.appExaInsert)}</p>
            : <p className="comments">{item.COMNT}</p>}
          <div className="authorItem">
            <div className="memPic">
              <img
                className="listImg"
                src={`/portalWeb/uploadfile/pictures/${item.EMP_NO}.jpg`}
                alt={lang.get('NAME', item)}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            {lang.get('NAME', item)}
            ({item.EMP_NO})&nbsp;/&nbsp;
            {lang.get('DEPT_NAME', item)}&nbsp;/&nbsp;
            {lang.get('PSTN_NAME', item)}
            &nbsp;&nbsp;{item.CONF_DTTM}
          </div>
        </li>
      ));
    const loopReqComnt = data =>
      data.map(item => (
        <div key={item.APV_REQ_ID} style={{ padding: '0 0 30px 10px' }}>
          <p className="comments">{item.CONTENT}</p>
        </div>
      ));
    return (
      <div>
        <Organization
          show={this.state.managerOrgShow}
          closeModal={this.managerOrgClose}
          userTab={true}
          getDataFromOrganization={getDataFromOrganization}
          isTreeCheckbox={false}
        />
        <StyleAppExaForm>
          <div style={{ minHeight: 'calc(100vh - 100px)' }}>
            <div
              style={{ display: this.props.appinfo.APV_STATUS_CODE === 'N' || this.props.appinfo.APV_STATUS_CODE === 'R' ? 'block' : 'none' }}
            >
              <h4>
                {intlObj.get(messages.Judge)}
                <Button
                  className="btnText"
                  onClick={this.managerOrgOpen}
                >
                  {intlObj.get(messages.edit)}
                </Button>
              </h4>
              {/* <FormItem> */}
              <div className="appManagerListBox">
                {
                  this.state.managerSetMembers.length > 0 ?
                    (<AppMaNagerList
                      managerList={this.state.managerSetMembers}
                      delFlag={true}
                      returnManagerList={returnManagerList}
                    />
                    ) : ('')
                }
              </div>
              {/* </FormItem> */}
              <h4>
                {intlObj.get(messages.testTitle)}
              </h4>
              <textarea
                maxLength="1000"
                onChange={onChangeContent}
              />
              <h4>{intlObj.get(messages.openDay)}</h4>
              <FormItem
                // label={intlObj.get(messages.openDay)}
                style={{ marginBottom: 20 }}
              >
                <Button
                  className="openCalendar"
                  onClick={this.calendarOn}
                  title={intlObj.get(messages.calenderOpen)}
                />
                <SingleDatePicker
                  date={this.state.date}
                  onDateChange={date => this.setState({ date, checkToday: false })}
                  focused={this.state.focused}
                  onFocusChange={({ focused }) => this.setState({ focused })}
                  numberOfMonths={1}
                  readOnly
                  monthFormat="YYYY.MM.DD"
                  displayFormat="YYYY.MM.DD"
                // openDirection="up"
                />
                <Checkbox
                  onChange={this.onChangeToday}
                  checked={this.state.checkToday}
                  style={{ marginLeft: 30 }}
                >
                  {intlObj.get(messages.immeApply)}
                </Checkbox>
              </FormItem>
            </div>
            {/* 심사자 리스트 */}
            <div
              style={{ display: this.props.approvalProcList.length > 0 ? 'block' : 'none' }}
            >
              <h4>{intlObj.get(messages.Judge)}</h4>
              <ul className="examinerList">
                {loopProcList(this.props.approvalProcList)}
              </ul>
            </div>
            {/* 테스트 방법 및 주의 사항 */}
            <div
              style={{ display: this.props.appRovalReqComent.length > 0 ? 'block' : 'none' }}
            >
              <h4>{intlObj.get(messages.testMethod)} {intlObj.get(messages.precautions)}</h4>
              {loopReqComnt(this.props.appRovalReqComent)}
            </div>
            {/* 서비스 예정일 */}
            <div
              style={{ display: this.props.approvalProcList.length > 0 ? 'block' : 'none' }}
            >
              <h4>{intlObj.get(messages.openDay)}</h4>
              {this.props.svcReqDt}
            </div>
            {/* 반려 멘트 */}
            <div
              style={{ display: this.props.appRovalProcComnt.length > 0 ? 'block' : 'none' }}
              className="commentArea"
            >
              <h4 className="comment commentIcon">Comments</h4>
              <ul className="commentList">
                {loopProcComnt(this.props.appRovalProcComnt)}
              </ul>
            </div>

          </div>

          <div
            className="buttonWrapper"
            style={{ display: this.props.appinfo.APV_STATUS_CODE === 'N' || this.props.appinfo.APV_STATUS_CODE === 'R' ? 'block' : 'none', paddingBottom: 15 }}
          >
            <Link
              to="/admin/adminmain/sysapp"
              style={{
                float: 'left',
                display: this.state.EXA_MODE === 'U' ? 'block' : 'none',
              }}
            >
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
            <Link to={`/admin/adminmain/sysapp/appDetail/${this.state.APP_ID}/${this.state.VER}`}>
              <LinkBtnLgtGray>{intlObj.get(messages.cancel)}</LinkBtnLgtGray>
            </Link>
            <BtnDkGray onClick={this.appExamine}>{intlObj.get(messages.request)}</BtnDkGray>
          </div>
        </StyleAppExaForm>
      </div>
    );
  }
}

AppExaForm.propTypes = {
  show: PropTypes.bool,  //eslint-disable-line
  closeModal: PropTypes.func, //eslint-disable-line
  appExamine: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  appExamineOk: PropTypes.bool, //eslint-disable-line
  getMyAppExaDetail: PropTypes.func, //eslint-disable-line
  appRovalReqComent: PropTypes.array, //eslint-disable-line
  appRovalProcComnt: PropTypes.array, //eslint-disable-line
  appinfo: PropTypes.object, //eslint-disable-line
  approvalProcList: PropTypes.array, //eslint-disable-line
  svcReqDt: PropTypes.string, //eslint-disable-line
};

export function mapDispatchToProps(dispatch) {
  return {
    appExamine: (managerSetMembers, CONTENT, SVC_REQ_DT, APP_ID, VER, history) => {
      dispatch(actions.appExamine(managerSetMembers, CONTENT, SVC_REQ_DT, APP_ID, VER, history));
    },
    getMyAppExaDetail: (APP_ID, VER, EXA_MODE) => {
      dispatch(actions.getMyAppExaDetail(APP_ID, VER, EXA_MODE));
    },
  };
}
const mapStateToProps = createStructuredSelector({
  appExamineOk: selectors.makeAppExamineOk(),
  appRovalReqComent: selectors.makeSelectAppRovalReqComent(),
  appRovalProcComnt: selectors.makeSelectAppRovalProcComnt(),
  appinfo: selectors.makeSelectAppinfo(),
  approvalProcList: selectors.makeSelectApprovalProcList(),
  svcReqDt: selectors.makeSelectSvcReqDt(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'admin/AdminMain/App/AppExaForm', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/App/AppExaForm', saga });

export default injectIntl(compose(
  withReducer,
  withSaga,
  withConnect,
)(AppExaForm));
