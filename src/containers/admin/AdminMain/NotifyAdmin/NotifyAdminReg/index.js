import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import NotifyManagerList from 'components/OrgReturnView';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import update from 'react-addons-update';
import message from 'components/Feedback/message';
import moment from 'moment';

import { intlObj } from 'utils/commonUtils';
import { Form, Input, DatePicker, Select } from 'antd';
import StyleNotifyAdminReg from './StyleNotifyAdminReg';
import StyleNotifyAdminForm from '../style/StyleNotifyAdminForm';
import NotifyImgChild from './notifyImgChild';
import StyledButton from '../../../../../components/Button/StyledButton';
import { BtnIconAdd } from '../../../../../components/uielements/styles/buttons.style';
import StyleNotifyMediaForm from '../style/StyleNotifyMediaForm';

import NotifyBtnChild from './notifyBtnChild';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from '../messages';

const { Option } = Select;

const scrCd = 'ALARM';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

// 기본값 세팅(임시)
const companyCd = 1000;
const openYn = 'Y';

// 게시기간
let startDttm = ''; // 알림시작일자
let endDttm = ''; // 알림종료일자

class NotifyAdminReg extends React.Component {
  constructor(props) {
    super(props);

    // 공통코드 목록에서 넘어온 Data
    const location = this.props.history.location.state;
    this.state = {
      // MSG_ID: location.MSG_ID,
      listSortColumn: location.sortColumnParam,
      listSortDirection: location.sortDirectionParam,
      listKeywordType: location.keywordType,
      listKeyword: location.keyword,
      listSite: location.site,
      listOneDateStr: location.oneDateStr,
      listStartDateStr: location.startDateStr,
      listEndDateStr: location.endDateStr,

      // 조직도 필수 배열
      // managerSetMembers: [], // 관리대상: 구성원
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹

      // 조직도 팝업 on/off 여부
      // managerOrgShow: false,
      allOrgShow: false,
      siteParam: 0, // 사이트ID(조직도용)

      // 입력 파라미터
      SITE_ID: location.site, // SITE_ID
      COMPANY_CD: companyCd,
      SYSTEM: '', // 업무시스템
      // MSG_ID: '', // 메시지 ID
      APP_ID: '', // APP ID
      MSG_TYPE: location.keywordType === 'codeName' ? location.keyword : 'A', // 메시지 유형  (A: 알림메시지 P:팝업 T:todo)
      OPEN_YN: openYn, // 게시여부
      TITLE: '', // 제목
      // TITLE_KOR: '',
      // TITLE_ENG: '',
      // TITLE_CHN: '',
      // TITLE_JPN: '',
      // TITLE_ETC: '',
      CONTENT: '', // 내용
      // CONTENT_KOR: '',
      // CONTENT_ENG: '',
      // CONTENT_CHN: '',
      // CONTENT_JPN: '',
      // CONTENT_ETC: '',
      URL: '', // url
      // METHOD: '', // 전송방식 (GET POST)
      // PARAM: '', // 전달변수
      periodDates: [moment(), moment()], // 게시기간
      // REG_DTTM: '',  // 등록일
      // REG_USER_ID: '',
      // UPD_USER_ID: '',
      // UPD_DTTM: '',
      // ACTION: '', // ACTION버튼

      // appIdValid: false,
      titleValid: false,
      contentValid: false,

      imgList: [],
      numChildren: 0,
      deletedImgIndex: [],

      btnList: [],
      btnNumChildren: 0,
      deletedBtnIndex: [],
    };

    // console.log('!!!!!!!!!!', location.keywordType === 'codeName' ? location.keyword : '');
    // 화면 로드 시 데이터 가져옴
    this.props.getSiteCombo(scrCd);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    const { msgId } = this.props;
    if (msgId !== nextProps.msgId) {
      const data = {
        MSG_ID: nextProps.msgId,
        OPEN_YN: this.state.MSG_TYPE === 'P' ? 'Y' : 'N',
        sortColumnParam: this.state.listSortColumn,
        sortDirectionParam: this.state.listSortDirection,
        keywordType: this.state.listKeywordType,
        keyword: this.state.listKeyword,
        site: this.state.listSite,
        oneDateStr: this.state.listOneDateStr,
        startDateStr: this.state.listStartDateStr,
        endDateStr: this.state.listEndDateStr,
      };
      this.props.history.push({ pathname: '/admin/AdminMain/NotifyAdmin/NotifyAdminDtl', state: data });
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
      pathname: '/admin/AdminMain/NotifyAdmin/',
      state: data,
    });
  };

  onChangeSystem = e => {
    this.setState({ SYSTEM: e.target.value });
  };

  onChangeAppID = e => {
    this.setState({ APP_ID: e.target.value });
  };

  onChangeMsgType = val => {
    this.setState({ MSG_TYPE: val });
  };

  onChangeTitle = e => {
    this.setState({ TITLE: e.target.value });
    if (e.target.value !== '') this.setState({ titleValid: true });
    else this.setState({ titleValid: false });
  };

  onChangeContent = e => {
    this.setState({ CONTENT: e.target.value });
    if (e.target.value !== '') this.setState({ contentValid: true });
    else this.setState({ contentValid: false });
  };

  onChangeUrl = e => {
    this.setState({ URL: e.target.value });
  };

  // 게시기5간 from ~ to
  onPeriodChange = dates => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  };

  getImgSettingList = () => {
    const { imgList } = this.state;
    const result = imgList.map((imgList, index) => {
      // eslint-disable-line
      if (imgList.isShow !== false) {
        return <NotifyImgChild index={index} imgList={imgList} setDeletedImgIndex={this.setDeletedImgIndex} />;
      }
    });
    return result;
  };

  getBtnSettingList = () => {
    const { btnList } = this.state;
    const result = btnList.map((btnList, index) => {
      // eslint-disable-line
      if (btnList.isShow !== false) {
        return <NotifyBtnChild index={index} btnList={btnList} setDeletedBtnIndex={this.setDeletedBtnIndex} />;
      }
    });
    return result;
  };

  setDeletedImgIndex = SEQNO => {
    const { imgList, deletedImgIndex } = this.state;
    const index = imgList.findIndex(imgList => imgList.SEQNO === SEQNO); // eslint-disable-line
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
  };

  setDeletedBtnIndex = SEQNO => {
    const { btnList, deletedBtnIndex } = this.state;
    const index = btnList.findIndex(btnList => btnList.SEQNO === SEQNO); // eslint-disable-line
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
  };

  vaildChk = () => {
    if (
      this.state.titleValid &&
      this.state.contentValid &&
      this.props.siteCombo.length > 0 &&
      (this.state.userSetMembers.length > 0 ||
        this.state.pstnSetMembers.length > 0 ||
        this.state.deptSetMembers.length > 0 ||
        this.state.dutySetMembers.length > 0 ||
        this.state.grpSetMembers.length > 0)
    ) {
      return true;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  };

  imgValidChk = imgList => {
    for (let i = 0; i < imgList.length; i += 1) {
      if (imgList[i].IMAGE === '') {
        message.error('이미지를 선택하십시오', 2);
        return false;
      }
    }
    return true;
  };

  btnValidChk = btnList => {
    for (let i = 0; i < btnList.length; i += 1) {
      if (btnList[i].VALUE === '') {
        message.error('버튼 VALUE를 입력하십시오', 2);
        return false;
      }
    }
    return true;
  };

  dateSet = () => {
    if (
      this.state.periodDates.length !== 0 &&
      this.state.periodDates[0]._isValid === true && //eslint-disable-line
      this.state.periodDates[1]._isValid === true //eslint-disable-line
    ) {
      startDttm = this.timeToDateForm(this.state.periodDates[0], 'bar').replace(/-/g, '');
      endDttm = this.timeToDateForm(this.state.periodDates[1], 'bar').replace(/-/g, '');
    } else {
      startDttm = '';
      endDttm = '';
    }
  };

  // 날짜변환함수(년.월.일)
  timeToDateForm = (val, formType) => {
    const timestamp = new Date(val).getTime();
    const todate = '00'.concat(new Date(timestamp).getDate()).slice(-2);
    const tomonth = '00'.concat(new Date(timestamp).getMonth() + 1).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';

    if (!Number.isNaN(Number(val)) && formType === 'point') {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    } else if (!Number.isNaN(Number(val)) && formType === 'bar') {
      originalDate = `${toyear}-${tomonth}-${todate}`;
    }
    return originalDate;
  };

  regSave = () => {
    this.dateSet();
    const imgList = this.state.imgList.filter(i => i.isShow !== false);
    const btnList = this.state.btnList.filter(i => i.isShow !== false);
    if (this.vaildChk() && this.imgValidChk(imgList) && this.btnValidChk(btnList)) {
      this.props.regNotify(
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
  };

  saveConfirm = () => {
    feed.showConfirm('저장하시겠습니까?', '', this.regSave);
  };

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
  };

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
  };

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
    const title = intlObj.get(messages.notifyReg);

    // 조직도로부터 데이터 가져오는 함수
    const returnUserList = resultObj => {
      this.setState({
        userSetMembers: resultObj,
      });
    };
    const returnDutyList = resultObj => {
      this.setState({
        dutySetMembers: resultObj,
      });
    };
    const returnPstnList = resultObj => {
      this.setState({
        pstnSetMembers: resultObj,
      });
    };
    const returnGrpList = resultObj => {
      this.setState({
        grpSetMembers: resultObj,
      });
    };
    const returnDetpList = resultObj => {
      this.setState({
        deptSetMembers: resultObj,
      });
    };

    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAll = resultObj => {
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

    // const { imgList, numChildren } = this.state;
    const imgContent = this.getImgSettingList();
    const btnContent = this.getBtnSettingList();

    const siteComboList = this.props.siteCombo;

    const getDefaultCombo = comboList => {
      if (comboList.length > 0) {
        return comboList[0].SITE_ID;
      }
      return '';
    };

    const getComboList = comboList => {
      // console.log('comboList', comboList[0]);
      if (comboList.length > 0) {
        return (
          <Select
            defaultValue={getDefaultCombo(siteComboList)}
            style={{ width: 300, float: 'left' }}
            onChange={this.onChangeSite}
            dropdownStyle={{ fontSize: 13 }}
          >
            {comboList.map(item => (
              // <Option value={item.SITE_ID}>{lang.get('NAME', item)}</Option>
              <Option value={item.SITE_ID}>{item.NAME_KOR}</Option>
            ))}
          </Select>
        );
      }
      return false;
    };

    return (
      <div>
        <Organization
          isDeptSelectbox
          isTreeCheckbox
          show={this.state.allOrgShow}
          closeModal={this.allOrgClose}
          userTab
          pstnTab
          dutyTab
          grpTab
          getDataFromOrganization={getDataFromOrganizationAll}
          // 조직도로 가져갈 데이터
          selectedUsers={this.state.userSetMembers.slice()}
          checkedDept={this.state.deptSetMembers.slice()}
          checkedPstn={this.state.pstnSetMembers.slice()}
          checkedDuty={this.state.dutySetMembers.slice()}
          checkedGrp={this.state.grpSetMembers.slice()}
        />
        <StyleNotifyAdminReg>
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
                      <FormItem {...formItemLayout}>
                        {/* <TextArea
                          value={this.state.SYSTEM}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          onChange={this.onChangeSystem}
                          id="n1"
                        /> */}
                        <Input value={this.state.SYSTEM} onChange={this.onChangeSystem} id="n1" />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n2">사이트ID</label>
                    </th>
                    <td>{getComboList(siteComboList)}</td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n3">APP ID</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        {/* <TextArea
                          value={this.state.APP_ID}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          onChange={this.onChangeAppID}
                          onKeyUp={(e) => {
                            // 숫자를 제외한 입력제한
                            this.setState({ APP_ID: e.target.value.replace(/[^0-9]/gi, '') });
                          }}
                          maxLength="5"
                          id="n3"
                        /> */}
                        <Input
                          value={this.state.APP_ID}
                          onChange={this.onChangeAppID}
                          onKeyUp={e => {
                            // 숫자를 제외한 입력제한
                            this.setState({ APP_ID: e.target.value.replace(/[^0-9]/gi, '') });
                          }}
                          maxLength="5"
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
                      <FormItem {...formItemLayout}>
                        <RangePicker
                          className="RangePicker"
                          format={dateFormat}
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment(), moment().endOf('month')],
                          }}
                          onChange={this.onPeriodChange}
                          showToday
                          value={this.state.periodDates !== '' ? this.state.periodDates : null}
                          id="n4"
                        />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">{intlObj.get(messages.codeName)}</th>
                    <td>
                      <Select
                        defaultValue={this.state.MSG_TYPE}
                        onChange={this.onChangeMsgType}
                        style={{ width: 120, marginRight: 10 }}
                        dropdownStyle={{ fontSize: 13 }}
                      >
                        <Option value="A">알림메시지</Option>
                        <Option value="P">Popup</Option>
                        <Option value="T">ToDo</Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n5">{intlObj.get(messages.title)}</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        {/* <TextArea
                          value={this.state.TITLE}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          onChange={this.onChangeTitle}
                          id="n5"
                        /> */}
                        <Input value={this.state.TITLE} onChange={this.onChangeTitle} id="n5" />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n6">{intlObj.get(messages.content)}</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        <TextArea value={this.state.CONTENT} autosize={{ minRows: 1, maxRow: 4 }} onChange={this.onChangeContent} id="n6" />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="n7">{intlObj.get(messages.receiver)}</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        <div className="authorityList">
                          <NotifyManagerList
                            isDeptSelectbox
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
                            delFlag
                            siteIdParam={this.state.siteParam}
                          />
                        </div>
                        <button onClick={this.allOrgOpen} className="textLinkBtn">
                          &lt; 편집
                        </button>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">
                      <label htmlFor="n8">URL</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        {/* <TextArea
                          placeholder="URL은 http:// 로 시작해주십시오."
                          value={this.state.URL}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          onChange={this.onChangeUrl}
                          id="n7"
                        /> */}
                        <Input placeholder="URL은 http:// 로 시작해주십시오." value={this.state.URL} onChange={this.onChangeUrl} id="n8" />
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="">이미지</th>
                    <td>
                      <StyleNotifyMediaForm>
                        {imgContent}
                        <div className="btnWrapper">
                          <BtnIconAdd
                            title="addNewForm"
                            onClick={e => {
                              e.preventDefault();
                              this.handleAppendImg();
                            }}
                          />
                        </div>
                      </StyleNotifyMediaForm>
                    </td>
                  </tr>
                  <tr>
                    <th className="">버튼</th>
                    <td>
                      <StyleNotifyMediaForm>
                        {btnContent}
                        <div className="btnWrapper">
                          <BtnIconAdd
                            title="addNewForm"
                            onClick={e => {
                              e.preventDefault();
                              this.handleAppendBtn();
                            }}
                          />
                        </div>
                      </StyleNotifyMediaForm>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </StyleNotifyAdminForm>
          <div className="buttonWrapper">
            <>
              <div style={{ float: 'left' }}>
                <StyledButton className="btn-light" onClick={this.onClickToList}>
                  {intlObj.get(messages.toList)}
                </StyledButton>
              </div>
              <StyledButton className="btn-primary" onClick={this.saveConfirm}>
                저장
              </StyledButton>
            </>
          </div>
        </StyleNotifyAdminReg>
      </div>
    );
  }
}

NotifyAdminReg.propTypes = {
  regNotify: PropTypes.func, // eslint-disable-line
  msgId: PropTypes.object, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
  getSiteCombo: PropTypes.func, // eslint-disable-line
  siteCombo: PropTypes.array, // eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  regNotify: (
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
  ) =>
    dispatch(
      actions.regNotify(
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
      ),
    ),
  getSiteCombo: SCR_CD => dispatch(actions.getSiteCombo(SCR_CD)),
});

const mapStateToProps = createStructuredSelector({
  msgId: selectors.makeSelectRegNotify(),
  siteCombo: selectors.makeSelectSiteCombo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'NotifyAdminReg', saga });
const withReducer = injectReducer({ key: 'NotifyAdminReg', reducer });

export default compose(withReducer, withSaga, withConnect)(NotifyAdminReg);
