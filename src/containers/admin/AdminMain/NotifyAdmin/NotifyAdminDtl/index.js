import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import NotifyManagerList from 'components/OrgReturnView';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';
// import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import StyleNotifyAdminDtl from './StyleNotifyAdminDtl';
import StyleNotifyAdminForm from './StyleNotifyAdminDtlForm';
import NotifyImgChild from './notifyImgChild';
import { BtnDkGray, LinkBtnList } from '../../../../store/components/uielements/buttons.style';
import StyleNotifyMediaForm from '../style/StyleNotifyMediaForm';

import NotifyBtnChild from './notifyBtnChild';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';


const FormItem = Form.Item;
const { TextArea } = Input;
// let periodVal = '';

class NotifyAdminDtl extends React.Component {
  constructor(props) {
    super(props);

    // 알림센터 목록에서 넘어온 Data
    const location = this.props.history.location.state;
    console.log('NotifyAdminDtl_location', location);

    let OPEN_YN = false;
    if (location.OPEN_YN === 'Y') {
      OPEN_YN = true;
    } else if (location.OPEN_YN === 'N') {
      OPEN_YN = false;
    }

    this.state = {
      postDisabled: OPEN_YN,
      MSG_ID: location.MSG_ID,
      listSortColumn: location.sortColumnParam,
      listSortDirection: location.sortDirectionParam,
      listKeywordType: location.keywordType,
      listKeyword: location.keyword,
      listSite: location.site,
      listOneDateStr: location.oneDateStr,
      listStartDateStr: location.startDateStr,
      listEndDateStr: location.endDateStr,
      // imgList: [],
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹
    };
    // 화면 로드 시 데이터 가져옴
    this.props.getNotifyMsg(location.MSG_ID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setNotifyMsg !== undefined) {
      const action = nextProps.setNotifyMsg.ACTION;
      if (action !== undefined) {
        if (action.trim() !== '') {
          this.getSecInfoFromDBAll(nextProps.setNotifyReceiver);
        }
      }
    }
  }

  onClickToList = () => {
    const data = {
      sortColumn: this.state.listSortColumn,
      sortDirection: this.state.listSortDirection,
      keywordType: this.state.listKeywordType,
      keyword: this.state.listKeyword,
      site: this.state.listSite,
      oneDateStr: this.state.listOneDateStr,
      startDateStr: this.state.listStartDateStr,
      endDateStr: this.state.listEndDateStr,
    };
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/AdminMain/NotifyAdmin/', state: data,
    });
  }

  getSecInfoFromDBAll = (resultList) => {
    const userSetMembersCopy = [];
    const pstnSetMembersCopy = [];
    const deptSetMembersCopy = [];
    const dutySetMembersCopy = [];
    const grpSetMembersCopy = [];

    if (resultList !== '' && resultList !== undefined) {
      resultList.map((obj) => {
        if (resultList.findIndex(o => o.RECEIVER_TYPE === 'U' && obj.RECEIVER_TYPE === 'U') > -1) { // 구성원
          userSetMembersCopy.push(obj);
        } else if (resultList.findIndex(o => o.RECEIVER_TYPE === 'P' && obj.RECEIVER_TYPE === 'P') > -1) { // 직위
          pstnSetMembersCopy.push(obj);
        } else if (resultList.findIndex(o => o.RECEIVER_TYPE === 'D' && obj.RECEIVER_TYPE === 'D') > -1) { // 부서
          deptSetMembersCopy.push(obj);
        } else if (resultList.findIndex(o => o.RECEIVER_TYPE === 'T' && obj.RECEIVER_TYPE === 'T') > -1) { // 직책
          dutySetMembersCopy.push(obj);
        } else if (resultList.findIndex(o => o.RECEIVER_TYPE === 'V' && obj.RECEIVER_TYPE === 'V') > -1) { // 가상그룹
          grpSetMembersCopy.push(obj);
        }
        return resultList; // userSetMembersCopy;
      });
    }

    this.setState({
      userSetMembers: userSetMembersCopy,
      pstnSetMembers: pstnSetMembersCopy,
      deptSetMembers: deptSetMembersCopy,
      dutySetMembers: dutySetMembersCopy,
      grpSetMembers: grpSetMembersCopy,
    });
  }

  getImgSettingList = () => {
    if (this.props.setNotifyMsg !== undefined) {
      const action = this.props.setNotifyMsg.ACTION;
      if (action !== undefined) {
        if (action.trim() !== '') {
          const actionJS = JSON.parse(action);
          const imgList = actionJS.images;
          if (imgList.length > 0) {
            const result = imgList.map((imgList, index) => {  // eslint-disable-line
              if (imgList.isShow !== false) {
                return (
                  <NotifyImgChild
                    index={index}
                    imgList={imgList}
                    setDeletedImgIndex={this.setDeletedImgIndex}
                  />
                );
              }
            });
            return result;
          }
        }
      }
    }
    return '';
  }

  getBtnSettingList = () => {
    if (this.props.setNotifyMsg !== undefined) {
      const action = this.props.setNotifyMsg.ACTION;
      if (action !== undefined) {
        if (action.trim() !== '') {
          const actionJS = JSON.parse(action);
          const btnList = actionJS.buttons;
          const result = btnList.map((btnList, index) => {  // eslint-disable-line
            if (btnList.isShow !== false) {
              return (
                <NotifyBtnChild
                  index={index}
                  btnList={btnList}
                  setDeletedBtnIndex={this.setDeletedBtnIndex}
                />
              );
            }
          });
          return result;
        }
      }
    }
    return '';
  }

  postToggle = () => {
    this.setState({
      postDisabled: !this.state.postDisabled,
    });

    this.props.udtPostState(
      this.state.MSG_ID,
      !this.state.postDisabled ? 'Y' : 'N',
    );
  }

  ShowSetFormatter = () => {
    if (this.props.setNotifyMsg.END_DTTM !== undefined && this.props.setNotifyMsg.END_DTTM !== '') {
      const curDate = this.timeToDateForm(new Date(), 'bar');
      const curDateArr = curDate.split('-');
      const endDate = this.timeToDateForm(this.props.setNotifyMsg.END_DTTM, 'bar');
      const endDateArr = endDate.split('-');
      const curDateCompare = new Date(curDateArr[0], curDateArr[1] - 1, curDateArr[2]);
      const endDateCompare = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);

      if (this.props.setNotifyMsg.MSG_TYPE === 'P' && curDateCompare.getTime() <= endDateCompare.getTime()) {
        return (
          <div>
            <Button onClick={this.postToggle} disabled={this.state.postDisabled}>
              {intlObj.get(messages.post)}
            </Button>
            <Button onClick={this.postToggle} disabled={!this.state.postDisabled}>
              {intlObj.get(messages.cancel)}
            </Button>
          </div>
        );
      }
    }
    return '';
  }

  // 날짜변환함수(년.월.일)
  timeToDateForm = (val, formType) => {
    const timestamp = new Date(val).getTime();
    const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
    const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';

    if (!Number.isNaN(Number(val)) && formType === 'point') {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    } else if (!Number.isNaN(Number(val)) && formType === 'bar') {
      originalDate = `${toyear}-${tomonth}-${todate}`;
    }
    return originalDate;
  }

  notifyUdt = () => {
    // console.log('상세화면_키워드타입', this.state.listKeywordType);

    const data = {
      OPEN_YN: this.state.postDisabled,
      MSG_ID: this.state.MSG_ID,
      sortColumn: this.state.listSortColumn,
      sortDirection: this.state.listSortDirection,
      keywordType: this.state.listKeywordType,
      keyword: this.state.listKeyword,
      site: this.state.listSite,
      oneDateStr: this.state.listOneDateStr,
      startDateStr: this.state.listStartDateStr,
      endDateStr: this.state.listEndDateStr,
    };
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/AdminMain/NotifyAdmin/NotifyAdminUdt', state: data,
    });
  }

  render() {
    // 조직도에서 가져온 리스트 뷰
    const returnUserList = (resultObj) => {
      this.setState({
        userSetMembers: resultObj,
      });
    };
    const returnDutyList = (resultObj) => {
      this.setState({
        dutySetMembers: resultObj,
      });
    };
    const returnPstnList = (resultObj) => {
      this.setState({
        pstnSetMembers: resultObj,
      });
    };
    const returnGrpList = (resultObj) => {
      this.setState({
        grpSetMembers: resultObj,
      });
    };
    const returnDetpList = (resultObj) => {
      this.setState({
        deptSetMembers: resultObj,
      });
    };
    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAll = (resultObj) => {
      // 구성원
      const userSetMembersFromOrganization = resultObj.selectedUsers;
      // 직위
      const pstnSetMembersFromOrganization = resultObj.checkedPstn;
      // 부서
      const deptSetMembersFromOrganization = resultObj.checkedDept;
      // 직책
      const dutySetMembersFromOrganization = resultObj.checkedDuty;
      // 가상그룹
      const grpSetMembersFromOrganization = resultObj.checkedGrp;

      this.setState({
        userSetMembers: userSetMembersFromOrganization, // 구성원
        pstnSetMembers: pstnSetMembersFromOrganization, // 직위
        deptSetMembers: deptSetMembersFromOrganization, // 부서
        dutySetMembers: dutySetMembersFromOrganization, // 직책
        grpSetMembers: grpSetMembersFromOrganization, // 가상그룹
      });
    };

    const allList = () => (
      <div className="authorityList">
        <NotifyManagerList
          userList={this.state.userSetMembers}
          pstnList={this.state.pstnSetMembers}
          deptList={this.state.deptSetMembers}
          dutyList={this.state.dutySetMembers}
          grpList={this.state.grpSetMembers}
          returnUserList={returnUserList}
          returnDutyList={returnDutyList}
          returnPstnList={returnPstnList}
          returnGrpList={returnGrpList}
          returnDetpList={returnDetpList}
          delFlag={false}
          siteIdParam="1"
        />
      </div>
    );

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
    const title = intlObj.get(messages.notifyDtl);
    const imgContent = this.getImgSettingList();
    const btnContent = this.getBtnSettingList();

    return (
      <div>
        <Organization
          siteIdParam={this.state.SITE_ID}
          isTreeCheckbox={true}
          show={this.state.allOrgShow}
          closeModal={this.allOrgClose}
          userTab={true}
          pstnTab={true}
          dutyTab={true}
          grpTab={true}
          getDataFromOrganization={getDataFromOrganizationAll}
          // 조직도로 가져갈 데이터
          selectedUsers={this.state.userSetMembers.slice()}
          checkedDept={this.state.deptSetMembers.slice()}
          checkedPstn={this.state.pstnSetMembers.slice()}
          checkedDuty={this.state.dutySetMembers.slice()}
          checkedGrp={this.state.grpSetMembers.slice()}
          orgName="접속권한조직도"
        />
        <StyleNotifyAdminDtl>
          <h3 className="pageTitle regist">{title}</h3>
          <StyleNotifyAdminForm>
            <Form>
              <table className="adminTbl notifyCenterTbl">
                <tbody>
                  <tr>
                    <th className="">
                      <label htmlFor="n1">{intlObj.get(messages.system)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={this.props.setNotifyMsg.SYSTEM}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d1"
                        /> */}
                        <Input
                          value={this.props.setNotifyMsg.SYSTEM}
                          readOnly={true}
                          id="n1"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n2">{intlObj.get(messages.siteName)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={lang.get('SITE_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d2"
                        /> */}
                        <Input
                          value={lang.get('SITE_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          id="n2"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n3">APP ID</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={lang.get('APP_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d3"
                        /> */}
                        <Input
                          value={lang.get('APP_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          id="n3"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n4">{intlObj.get(messages.postPeriod)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={
                            this.props.setNotifyMsg.START_DTTM && this.props.setNotifyMsg.END_DTTM ?
                            `${this.timeToDateForm(this.props.setNotifyMsg.START_DTTM, 'point')} ~ ${this.timeToDateForm(this.props.setNotifyMsg.END_DTTM, 'point')}`
                            : ''
                          }
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d4"
                        /> */}
                        <Input
                          value={
                            this.props.setNotifyMsg.START_DTTM && this.props.setNotifyMsg.END_DTTM ?
                            `${this.timeToDateForm(this.props.setNotifyMsg.START_DTTM, 'point')} ~ ${this.timeToDateForm(this.props.setNotifyMsg.END_DTTM, 'point')}`
                            : ''
                          }
                          readOnly={true}
                          id="d4"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      {intlObj.get(messages.codeName)}
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={lang.get('CODE_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d5"
                        /> */}
                        <Input
                          value={lang.get('CODE_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          id="d5"
                        />
                        <div style={{ float: 'right' }}>
                          {this.ShowSetFormatter()}
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      {intlObj.get(messages.receiver)}
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {allList()}
                        {/* <ul>
                          {this.props.setNotifyReceiver.map(item => (
                            <li>{`${lang.get('NAME', item)}`}</li>
                          ))}
                        </ul> */}
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n5">{intlObj.get(messages.title)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={lang.get('TITLE', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d7"
                        /> */}
                        <Input
                          value={lang.get('TITLE', this.props.setNotifyMsg)}
                          readOnly={true}
                          id="n5"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n6">{intlObj.get(messages.content)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        <TextArea
                          value={lang.get('CONTENT', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 8 }}
                          id="n6"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n7">{intlObj.get(messages.regDttm)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={`${this.timeToDateForm(this.props.setNotifyMsg.REG_DTTM, 'point')}`}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d9"
                        /> */}
                        <Input
                          value={`${this.timeToDateForm(this.props.setNotifyMsg.REG_DTTM, 'point')}`}
                          readOnly={true}
                          id="n7"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n8">{intlObj.get(messages.userName)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={lang.get('USER_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d10"
                        /> */}
                        <Input
                          value={lang.get('USER_NAME', this.props.setNotifyMsg)}
                          readOnly={true}
                          id="n8"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n9">URL</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={this.props.setNotifyMsg.URL}
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d11"
                        /> */}
                        <Input
                          value={this.props.setNotifyMsg.URL}
                          readOnly={true}
                          id="n9"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      이미지
                    </th>
                    <td>
                      <StyleNotifyMediaForm>
                        {imgContent}
                      </StyleNotifyMediaForm>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      버튼
                    </th>
                    <td>
                      <StyleNotifyMediaForm>
                        {btnContent}
                      </StyleNotifyMediaForm>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </StyleNotifyAdminForm>
          <div className="buttonWrapper">
            <React.Fragment>
              <div style={{ float: 'left' }}>
                <LinkBtnList onClick={this.onClickToList}>
                  {intlObj.get(messages.toList)}
                </LinkBtnList>
              </div>
            </React.Fragment>
            <BtnDkGray onClick={this.notifyUdt}>수정</BtnDkGray>
          </div>
        </StyleNotifyAdminDtl>
      </div>
    );
  }
}

NotifyAdminDtl.propTypes = {
  getNotifyMsg: PropTypes.func, // eslint-disable-line
  udtPostState: PropTypes.func, // eslint-disable-line
  setNotifyMsg: PropTypes.object, // eslint-disable-line
  setNotifyReceiver: PropTypes.array, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getNotifyMsg: MSG_ID =>
      dispatch(actions.getNotifyMsg(MSG_ID)),
    udtPostState: (MSG_ID, OPEN_YN) =>
      dispatch(actions.udtPostState(MSG_ID, OPEN_YN)),
  }
);

const mapStateToProps = createStructuredSelector({
  setNotifyMsg: selectors.makeSelectNotifyMsg(),
  setNotifyReceiver: selectors.makeSelectNotifyReceiver(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'NotifyAdminDtl', saga });
const withReducer = injectReducer({ key: 'NotifyAdminDtl', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotifyAdminDtl);
