import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import NotifyManagerList from 'components/OrgReturnView';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import update from 'react-addons-update';
import { intlObj, lang } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import moment from 'moment';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import StyleNotifyAdminUdt from './StyleNotifyAdminUdt';
import StyleNotifyAdminForm from '../style/StyleNotifyAdminForm';
import NotifyImgChild from './notifyImgChild';
import { LinkBtnList, BtnDkGray, BtnLgtGray } from '../../../../store/components/uielements/buttons.style';
import { BtnIconAdd } from '../../../../../components/uielements/styles/buttons.style';
import StyleNotifyImgForm from '../style/StyleNotifyMediaForm';

import NotifyBtnChild from './notifyBtnChild';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';

const { Option } = Select;

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

// 게시기간
let startDttm = ''; // 알림시작일자
let endDttm = ''; // 알림종료일자

class NotifyAdminUdt extends React.Component {
  constructor(props) {
    super(props);

    // 알림센터 목록에서 넘어온 Data
    const location = this.props.history.location.state;

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

      // 조직도 필수 배열
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹

      // 조직도 팝업 on/off 여부
      allOrgShow: false,
      siteParam: 0, // 사이트ID(조직도용)

      periodDates: [moment(), moment()], // 게시기간
      MSG_TYPE: '',
      TITLE: '', // 제목
      CONTENT: '', // 내용
      URL: '', // url

      imgList: [],
      numChildren: 0,
      deletedImgIndex: [],

      btnList: [],
      btnNumChildren: 0,
      deletedBtnIndex: [],

    };
    // 화면 로드 시 데이터 가져옴
    this.props.getNotifyMsg(location.MSG_ID);
  }

  componentWillReceiveProps(nextProps) {
    const action = nextProps.setNotifyMsg.ACTION;
    if (action !== undefined) {
      if (action.trim() !== '') {
        this.getSecInfoFromDBAll(nextProps.setNotifyReceiver);
        const actionJS = JSON.parse(action);
        const nextImgList = actionJS.images;
        const nextBtnList = actionJS.buttons;
        for (let i = 0; i < nextImgList.length; i += 1) {
          Object.assign(
            nextImgList[i],
            { SEQNO: `${i}` },
            { TITLE: nextImgList[i].id },
            { URL: nextImgList[i].url },
            { IMAGE: nextImgList[i].seq },
          );
        }
        for (let i = 0; i < nextBtnList.length; i += 1) {
          Object.assign(
            nextBtnList[i],
            { SEQNO: `${i}` },
            { VALUE: nextBtnList[i].value },
            { URL: nextBtnList[i].link.url },
          );
        }
        this.setState({
          periodDates: [moment(this.timeToDateForm(nextProps.setNotifyMsg.START_DTTM, 'bar')),
            moment(this.timeToDateForm(nextProps.setNotifyMsg.END_DTTM, 'bar'))],
          imgList: nextImgList,
          btnList: nextBtnList,
          numChildren: nextImgList.length,
          btnNumChildren: nextBtnList.length,
          TITLE: lang.get('TITLE', nextProps.setNotifyMsg),
          CONTENT: lang.get('CONTENT', nextProps.setNotifyMsg),
          URL: nextProps.setNotifyMsg.URL,
          MSG_TYPE: nextProps.setNotifyMsg.MSG_TYPE,
        });
      }
    }
  }

  onClickToList = () => {
    // console.log('수정화면_키워드타입', this.state.listKeywordType);
    const data = {
      // OPEN_YN: this.state.MSG_ID,
      // MSG_ID: this.state.MSG_ID,
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

  // 게시기5간 from ~ to
  onPeriodChange = (dates) => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  }

  onChangeMsgType = (val) => {
    this.setState({ MSG_TYPE: val });
  };

  onChangeTitle = (e) => {
    this.setState({ TITLE: e.target.value });
  };

  onChangeContent = (e) => {
    this.setState({ CONTENT: e.target.value });
  };

  onChangeUrl = (e) => {
    this.setState({ URL: e.target.value });
  };

  getImgSettingList = () => {
    const { imgList } = this.state;
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

  getBtnSettingList = () => {
    const { btnList } = this.state;
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

  setDeletedImgIndex = (SEQNO) => {
    const {
      imgList,
      deletedImgIndex,
    } = this.state;
    const index = imgList.findIndex(imgList => imgList.SEQNO === SEQNO);  // eslint-disable-line
    const imgListCopy = update(imgList, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });
    this.setState({
      imgList: imgListCopy,
    });
    deletedImgIndex.push(SEQNO);
  }

  setDeletedBtnIndex = (SEQNO) => {
    const {
      btnList,
      deletedBtnIndex,
    } = this.state;
    const index = btnList.findIndex(btnList => btnList.SEQNO === SEQNO);  // eslint-disable-line
    const btnListCopy = update(btnList, {
      [index]: {
        isShow: {
          $set: false,
        },
      },
    });
    this.setState({
      btnList: btnListCopy,
    });
    deletedBtnIndex.push(SEQNO);
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

  handleAppendImg = () => {
    const content = this.state.imgList.slice();
    const { imgList, numChildren } = this.state;
    for (let i = imgList.length; i < this.state.numChildren + 1; i += 1) {
      const emptyContent = {};
      emptyContent.SEQNO = `${i}`;
      emptyContent.TITLE = '';
      emptyContent.URL = '';
      emptyContent.IMAGE = '';
      content.push(emptyContent);
    }

    this.setState({
      imgList: content,
      numChildren: numChildren + 1,
    });
  }

  handleAppendBtn = () => {
    const content = this.state.btnList.slice();
    const { btnList, btnNumChildren } = this.state;
    for (let i = btnList.length; i < this.state.btnNumChildren + 1; i += 1) {
      const emptyContent = {};
      emptyContent.SEQNO = `${i}`;
      emptyContent.VALUE = '';
      emptyContent.URL = '';
      content.push(emptyContent);
    }

    this.setState({
      btnList: content,
      btnNumChildren: btnNumChildren + 1,
    });
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
            {/* <Button onClick={this.postToggle} disabled={this.state.postDisabled}> */}
            <Button disabled={this.state.postDisabled}>
              {intlObj.get(messages.post)}
            </Button>
            {/* <Button onClick={this.postToggle} disabled={!this.state.postDisabled}> */}
            <Button disabled={!this.state.postDisabled}>
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

  allOrgOpen = () => {
    this.setState({
      allOrgShow: true,
    });
  };

  allOrgClose = () => {
    this.setState({
      allOrgShow: false,
    });
  };

  cancelNotify = () => {
    const data = {
      OPEN_YN: this.state.MSG_ID,
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
      pathname: '/admin/AdminMain/notifyAdmin/notifyAdminDtl', state: data,
    });
  }

  udtSave = () => {
    this.dateSet();
    const imgList = this.state.imgList.filter(i => i.isShow !== false);
    const btnList = this.state.btnList.filter(i => i.isShow !== false);
    if (this.vaildChk() && this.imgValidChk(imgList) && this.btnValidChk(btnList)) {
      this.props.udtNotify(
        this.state.MSG_ID,
        this.state.SYSTEM,
        this.state.COMPANY_CD,
        this.state.SITE_ID,
        this.state.APP_ID,
        this.state.MSG_TYPE,
        this.state.OPEN_YN,
        this.state.TITLE,
        this.state.CONTENT,
        this.state.URL,
        startDttm,
        endDttm,
        this.state.userSetMembers,
        this.state.pstnSetMembers,
        this.state.deptSetMembers,
        this.state.dutySetMembers,
        this.state.grpSetMembers,
        imgList,
        btnList,
      );
    }

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
      pathname: '/admin/AdminMain/NotifyAdmin/NotifyAdminDtl', state: data,
    });
  }

  saveConfirm = () => {
    feed.showConfirm('저장하시겠습니까?', '', this.udtSave);
  }

  vaildChk = () => {
    if (this.state.TITLE !== '' &&
      this.state.CONTENT !== '' && (
        this.state.userSetMembers.length > 0 ||
        this.state.pstnSetMembers.length > 0 ||
        this.state.deptSetMembers.length > 0 ||
        this.state.dutySetMembers.length > 0 ||
        this.state.grpSetMembers.length > 0)
    ) {
      return true;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  }

  imgValidChk = (imgList) => {
    for (let i = 0; i < imgList.length; i += 1) {
      if (imgList[i].IMAGE === '') {
        message.error('이미지를 선택하십시오', 2);
        return false;
      }
    }
    return true;
  }

  btnValidChk = (btnList) => {
    for (let i = 0; i < btnList.length; i += 1) {
      if (btnList[i].VALUE === '') {
        message.error('버튼 VALUE를 입력하십시오', 2);
        return false;
      }
    }
    return true;
  }

  dateSet = () => {
    if (this.state.periodDates.length !== 0 &&
      this.state.periodDates[0]._isValid === true && //eslint-disable-line
      this.state.periodDates[1]._isValid === true //eslint-disable-line
    ) {
      startDttm = this.timeToDateForm(this.state.periodDates[0], 'bar').replace(/-/g, '');
      endDttm = this.timeToDateForm(this.state.periodDates[1], 'bar').replace(/-/g, '');
    } else {
      startDttm = '';
      endDttm = '';
    }
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
      <div>
        <div className="authorityList">
          <NotifyManagerList
            isDeptSelectbox={true}
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
            delFlag={true}
            siteIdParam={this.state.siteParam}
          />
        </div>
        <button onClick={this.allOrgOpen} className="textLinkBtn">&lt; 편집</button>
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
          isDeptSelectbox={true}
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
          // orgName="접속권한조직도"
        />
        <StyleNotifyAdminUdt>
          <h3 className="pageTitle regist">{title}</h3>
          <StyleNotifyAdminForm>
            <Form>
              <table className="adminTbl notifyCenterTbl">
                <tbody>
                  <tr>
                    <th>
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
                    <th>
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
                    <th className="required">
                      <label htmlFor="n4">{intlObj.get(messages.postPeriod)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        <RangePicker
                          className="RangePicker"
                          format={dateFormat}
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment(), moment().endOf('month')],
                          }}
                          onChange={this.onPeriodChange}
                          showToday={true}
                          value={this.state.periodDates !== '' ? this.state.periodDates : null}
                          id="n4"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      {intlObj.get(messages.codeName)}
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        <Select
                          value={this.state.MSG_TYPE}
                          onChange={this.onChangeMsgType}
                          style={{ width: 120, marginRight: 10 }}
                          dropdownStyle={{ fontSize: 13 }}
                        >
                          <Option value="A">알림메시지</Option>
                          <Option value="P">Popup</Option>
                          <Option value="T">ToDo</Option>
                        </Select>
                        <div style={{ float: 'right' }}>
                          {this.ShowSetFormatter()}
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n10">{intlObj.get(messages.receiver)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {allList()}
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n5">{intlObj.get(messages.title)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        {/* <TextArea
                          value={this.state.TITLE}
                          onChange={this.onChangeTitle}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d7"
                        /> */}
                        <Input
                          value={this.state.TITLE}
                          onChange={this.onChangeTitle}
                          id="n5"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n6">{intlObj.get(messages.content)}</label>
                    </th>
                    <td>
                      <FormItem
                        {...formItemLayout}
                      >
                        <TextArea
                          value={this.state.CONTENT}
                          onChange={this.onChangeContent}
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
                          id="n7"
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
                          value={this.state.URL}
                          onChange={this.onChangeUrl}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="d11"
                        /> */}
                        <Input
                          placeholder="URL은 http:// 로 시작해주십시오."
                          value={this.state.URL}
                          onChange={this.onChangeUrl}
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
                      <StyleNotifyImgForm>
                        {imgContent}
                        <div className="btnWrapper">
                          <BtnIconAdd title="addNewForm" onClick={(e) => { e.preventDefault(); this.handleAppendImg(); }} />
                        </div>
                      </StyleNotifyImgForm>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      버튼
                    </th>
                    <td>
                      <StyleNotifyImgForm>
                        {btnContent}
                        <div className="btnWrapper">
                          <BtnIconAdd title="addNewForm" onClick={(e) => { e.preventDefault(); this.handleAppendBtn(); }} />
                        </div>
                      </StyleNotifyImgForm>
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
              <BtnLgtGray onClick={this.cancelNotify} >{intlObj.get(messages.cancel)}</BtnLgtGray>
              <BtnDkGray onClick={this.saveConfirm}>저장</BtnDkGray>
            </React.Fragment>
          </div>
        </StyleNotifyAdminUdt>
      </div>
    );
  }
}

NotifyAdminUdt.propTypes = {
  getNotifyMsg: PropTypes.func, // eslint-disable-line
  udtPostState: PropTypes.func, // eslint-disable-line
  setNotifyMsg: PropTypes.object, // eslint-disable-line
  setNotifyReceiver: PropTypes.array, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
  udtNotify: PropTypes.func, // eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getNotifyMsg: MSG_ID =>
      dispatch(actions.getNotifyMsg(MSG_ID)),
    udtPostState: (MSG_ID, OPEN_YN) =>
      dispatch(actions.udtPostState(MSG_ID, OPEN_YN)),
    udtNotify: (
      MSG_ID,
      SYSTEM,
      COMPANY_CD,
      SITE_ID,
      APP_ID,
      MSG_TYPE,
      OPEN_YN,
      TITLE,
      CONTENT,
      URL,
      START_DTTM,
      END_DTTM,
      userSetMembers,
      pstnSetMembers,
      deptSetMembers,
      dutySetMembers,
      grpSetMembers,
      imgList,
      btnList,
    ) => dispatch(actions.udtNotify(
      MSG_ID,
      SYSTEM,
      COMPANY_CD,
      SITE_ID,
      APP_ID,
      MSG_TYPE,
      OPEN_YN,
      TITLE,
      CONTENT,
      URL,
      START_DTTM,
      END_DTTM,
      userSetMembers,
      pstnSetMembers,
      deptSetMembers,
      dutySetMembers,
      grpSetMembers,
      imgList,
      btnList,
    )),
  }
);

const mapStateToProps = createStructuredSelector({
  setNotifyMsg: selectors.makeSelectNotifyMsg(),
  setNotifyReceiver: selectors.makeSelectNotifyReceiver(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'NotifyAdminUdt', saga });
const withReducer = injectReducer({ key: 'NotifyAdminUdt', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotifyAdminUdt);
