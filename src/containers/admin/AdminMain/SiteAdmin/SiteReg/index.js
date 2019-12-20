import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import OrganizationRole from 'components/OrganizationRole';
import SiteManagerList from 'components/OrgReturnView';
// import Select, { SelectOption } from 'components/Select';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import { Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
// import LeftMenu from '../../LeftMenu';
import StyleSiteAdminForm from './StyleSiteAdminForm';
import StyleSiteAdminDtl from './StyleSiteAdminDtl';
// import SiteAdminBizGrpModal from '../SiteAdminBizGrpModal';
import { LinkBtnLgtGray, BtnDkGray } from '../../../../store/components/uielements/buttons.style';
import messages from '../messages';
import AntRadiobox from '../../../../portal/components/uielements/radiobox.style';
import StyledButton from '../../../../../components/Button/StyledButton';

const FormItem = Form.Item;
const RadioGroup = AntRadiobox(Radio.Group);
// const Option = SelectOption;

class SiteReg extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      title: `${intlObj.get(messages.titleSiteReg)}`,
      NAME_KOR: '',
      NAME_CHN: '',
      NAME_ENG: '',
      URL: '',
      BIZGRP_ID: this.props.myHome ? this.props.myHome : 1,
      THEME_CD: this.props.mySkin ? `${this.props.mySkin}` : '1',
      managerOrgShow: false,
      allOrgShow: false,
      // SiteAdminBizGrpModalShow: false,
      managerSetMembers: [], // 관리대상: 구성원
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹
      siteParam: 0, // 사이트ID
      nameValid_Kor: false,
      nameValid_Chn: false,
      nameValid_Eng: false,
      // nameValid: false,
      urlValid: false,
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    // this.onKeyPressURL = this.onKeyPressURL.bind(this);
    this.onBlurURL = this.onBlurURL.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.setDefault = this.setDefault.bind(this);
    // this.regSite = this.regSite.bind(this);

    this.props.getSkinList();
    this.props.getHomeList();
    this.props.getDefaultList();
    // this.setDefault();
  }

  componentDidMount() {
    this.setDefault();
  }

  componentWillReceiveProps(nextProps) {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    // nextProps.getDefault.map(nextProps.getDefault => (

    // alert(`getDefault >>> ${nextProps.getDefault}`);
    // alert(`USER_ID >>> ${nextProps.getDefault.USER_ID}`);

    managerSetMembersDefault.push({
      USER_ID: nextProps.getDefault.USER_ID,
      EMP_NO: nextProps.getDefault.EMP_NO,
      NAME_KOR: nextProps.getDefault.NAME_KOR,
      NAME_ENG: nextProps.getDefault.NAME_ENG,
      NAME_CHN: nextProps.getDefault.NAME_CHN,
      NAME_JPN: nextProps.getDefault.NAME_JPN,
      NAME_ETC: nextProps.getDefault.NAME_ETC,
      DEPT_NAME_KOR: nextProps.getDefault.DEPT_NAME_KOR,
      DEPT_NAME_ENG: nextProps.getDefault.DEPT_NAME_ENG,
      DEPT_NAME_CHN: nextProps.getDefault.DEPT_NAME_CHN,
      DEPT_NAME_JPN: nextProps.getDefault.DEPT_NAME_JPN,
      DEPT_NAME_ETC: nextProps.getDefault.DEPT_NAME_ETC,
      PSTN_NAME_KOR: nextProps.getDefault.PSTN_NAME_KOR,
      PSTN_NAME_ENG: nextProps.getDefault.PSTN_NAME_ENG,
      PSTN_NAME_CHN: nextProps.getDefault.PSTN_NAME_CHN,
      PSTN_NAME_JPN: nextProps.getDefault.PSTN_NAME_JPN,
      PSTN_NAME_ETC: nextProps.getDefault.PSTN_NAME_ETC,
      DUTY_NAME_KOR: nextProps.getDefault.DUTY_NAME_KOR,
      DUTY_NAME_ENG: nextProps.getDefault.DUTY_NAME_ENG,
      DUTY_NAME_CHN: nextProps.getDefault.DUTY_NAME_CHN,
      DUTY_NAME_JPN: nextProps.getDefault.DUTY_NAME_JPN,
      DUTY_NAME_ETC: nextProps.getDefault.DUTY_NAME_ETC,
      // MGR_TYPE: nextProps.getDefault.EMP_TYPE,
    });
    // ));

    grpSetMembersDefault.push({
      id: '100',
      title: `${intlObj.get(messages.titleAllUser)}`,
      NAME_KOR: `${intlObj.get(messages.titleAllUser)}`,
      ACNT_TYPE: 'V',
      // deptname: '부서',
    });

    // managerSetMembersDefault[0].USER_ID = '';

    // alert(managerSetMembersDefault.toString);

    this.setState({
      managerSetMembers: managerSetMembersDefault,
      grpSetMembers: grpSetMembersDefault,
    });
  }

  onChangeName(e, lang) {
    if (lang === 'NAME_KOR') {
      this.setState({ NAME_KOR: e.target.value, nameValid_Kor: true });
    } else if (lang === 'NAME_CHN') {
      this.setState({ NAME_CHN: e.target.value, nameValid_Chn: true });
    } else if (lang === 'NAME_ENG') {
      this.setState({ NAME_ENG: e.target.value, nameValid_Eng: true });
    }

    if (e.target.value === '' && lang === 'NAME_KOR') {
      this.setState({ nameValid_Kor: false });
      return;
    }
    if (e.target.value === '' && lang === 'NAME_CHN') {
      this.setState({ nameValid_Chn: false });
      return;
    }
    if (e.target.value === '' && lang === 'NAME_ENG') {
      this.setState({ nameValid_Eng: false });
      return;
    }

    this.props.chkName(`${lang}_CHK`, e.target.value);

    // this.setState({ nameValid_Kor: true });
  }

  onChangeURL(e) {
    // console.log(e.target.value);
    this.setState({ URL: e.target.value });
    const strURL = `${e.target.value}/`;
    if (e.target.value !== '') this.setState({ urlValid: true });
    else this.setState({ urlValid: false });
    this.props.chkUrl('URL_CHK', strURL);
    // this.onBlurURL();
  }

  // onKeyPressURL(e) {
  //   if (e.charCode === 13) {
  //     const strURL = `http://dev.protal.com/${this.state.URL}/`;
  //     this.props.chkUrl('URL_CHK', strURL);
  //   }
  // }

  onBlurURL() {
    const strURL = `${this.target.value}/`;
    return this.props.chkUrl('URL_CHK', strURL);
  }

  onChangeTheme(e) {
    this.setState({ THEME_CD: e.target.value });
  }

  setDefault = () => {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    // alert(`this.props.getDefault >>> ${this.props.getDefault}`);

    // this.props.getDefault.map(nextProps.getDefault => (
    managerSetMembersDefault.push({
      USER_ID: this.props.getDefault.USER_ID,
      EMP_NO: this.props.getDefault.EMP_NO,
      NAME_KOR: this.props.getDefault.NAME_KOR,
      NAME_ENG: this.props.getDefault.NAME_ENG,
      NAME_CHN: this.props.getDefault.NAME_CHN,
      NAME_JPN: this.props.getDefault.NAME_JPN,
      NAME_ETC: this.props.getDefault.NAME_ETC,
      DEPT_NAME_KOR: this.props.getDefault.DEPT_NAME_KOR,
      DEPT_NAME_ENG: this.props.getDefault.DEPT_NAME_ENG,
      DEPT_NAME_CHN: this.props.getDefault.DEPT_NAME_CHN,
      DEPT_NAME_JPN: this.props.getDefault.DEPT_NAME_JPN,
      DEPT_NAME_ETC: this.props.getDefault.DEPT_NAME_ETC,
      PSTN_NAME_KOR: this.props.getDefault.PSTN_NAME_KOR,
      PSTN_NAME_ENG: this.props.getDefault.PSTN_NAME_ENG,
      PSTN_NAME_CHN: this.props.getDefault.PSTN_NAME_CHN,
      PSTN_NAME_JPN: this.props.getDefault.PSTN_NAME_JPN,
      PSTN_NAME_ETC: this.props.getDefault.PSTN_NAME_ETC,
      DUTY_NAME_KOR: this.props.getDefault.DUTY_NAME_KOR,
      DUTY_NAME_ENG: this.props.getDefault.DUTY_NAME_ENG,
      DUTY_NAME_CHN: this.props.getDefault.DUTY_NAME_CHN,
      DUTY_NAME_JPN: this.props.getDefault.DUTY_NAME_JPN,
      DUTY_NAME_ETC: this.props.getDefault.DUTY_NAME_ETC,
      // MGR_TYPE: this.props.getDefault.EMP_TYPE,
    });
    // ));

    grpSetMembersDefault.push({
      id: '100',
      title: `${intlObj.get(messages.titleAllUser)}`,
      NAME_KOR: `${intlObj.get(messages.titleAllUser)}`,
      ACNT_TYPE: 'V',
      // deptname: '부서',
    });

    // managerSetMembersDefault.USER_ID = '';

    this.setState({
      managerSetMembers: managerSetMembersDefault,
      grpSetMembers: grpSetMembersDefault,
    });
  };

  vaildChk = () => {
    const mngCnt = this.state.managerSetMembers.length;
    const usrCnt =
      this.state.userSetMembers.length +
      this.state.pstnSetMembers.length +
      this.state.deptSetMembers.length +
      this.state.dutySetMembers.length +
      this.state.grpSetMembers.length;

    if (
      this.state.NAME_KOR !== '' &&
      this.state.NAME_KOR !== null &&
      this.state.URL !== '' &&
      this.state.URL !== null &&
      this.state.THEME_CD !== '' &&
      this.state.THEME_CD !== null &&
      mngCnt > 0 &&
      usrCnt > 0
    ) {
      if (!this.props.getNameChkK && !this.props.getUrlChk) return true;
      message.error(`${intlObj.get(messages.chkInput)}`, 2);
      return false;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  };

  regConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.regConfirm)}`, '', this.regSite);
    }
  };

  regSite = () => {
    // 저장 프로세스
    // if (this.state.URL.charAt(this.state.URL.length - 1) !== '/') {
    //   this.setState({ URL: `${this.state.URL}/` });
    // }

    this.props.registSite(
      this.state.NAME_KOR,
      this.state.NAME_CHN,
      this.state.NAME_ENG,
      `${this.state.URL}/`,
      this.state.BIZGRP_ID,
      this.state.THEME_CD,
      this.state.managerSetMembers,
      this.state.userSetMembers,
      this.state.pstnSetMembers,
      this.state.deptSetMembers,
      this.state.dutySetMembers,
      this.state.grpSetMembers,
      this.props.history,
    );
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

  allOrgOpen = () => {
    // alert(`this.state.grpSetMembers >>> ${this.state.grpSetMembers[0].toString()}`);
    this.setState({
      allOrgShow: true,
    });
  };

  allOrgClose = () => {
    this.setState({
      allOrgShow: false,
    });
  };

  // SiteAdminBizGrpModalOpen = () => {
  //   this.setState({
  //     SiteAdminBizGrpModalShow: true,
  //   });
  // };
  // SiteAdminBizGrpModalClose = () => {
  //   this.setState({
  //     SiteAdminBizGrpModalShow: false,
  //   });
  // };

  render() {
    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganization = resultObj => {
      const managerSetMembersFromOrganization = resultObj.selectedUsers;

      this.setState({
        managerSetMembers: managerSetMembersFromOrganization,
      });
    };

    // 조직도에서 가져온 리스트 뷰
    const returnManagerList = resultObj => {
      this.setState({
        managerSetMembers: resultObj,
      });
    };

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

    const skinRow = data =>
      data.map(skin => (
        <li
          key={skin.CODE_CD}
          style={{
            padding: '0 0 0 0',
            bordar: '0',
            float: 'left',
          }}
          className="skinOptions"
        >
          <ErrorBoundary>
            <Radio value={skin.CODE_CD}>
              <span className="skinItem">
                <img
                  src={`/portal/setting/skin-option${skin.CODE_CD}.png`}
                  // src={`../../../../../../images/portal/setting/skin-option${skin.CODE_CD}.png`}
                  alt={skin.CODE_CD}
                />
              </span>
            </Radio>
          </ErrorBoundary>
        </li>
      ));

    // const homeRow = data =>
    //   data.map(home => (
    //     <Option value={home.BIZGRP_ID}>{lang.get('NAME', home)}</Option>
    //   ));

    // const homeRow = this.props.loadHome.map(keycomp => <Option key={keycomp.BIZGRP_ID}>{lang.get('NAME', keycomp)}</Option>);

    const dupNameChkK = stat => {
      if (this.state.NAME_KOR !== '') {
        if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
        return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
      }
      return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
    };

    const dupNameChkC = stat => {
      if (this.state.NAME_CHN !== '') {
        if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
        return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
      }
      return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
    };

    const dupNameChkE = stat => {
      if (this.state.NAME_ENG !== '') {
        if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
        return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
      }
      return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
    };

    const dupUrlChk = stat => {
      if (this.state.URL !== '') {
        if (stat) return <font color="RED">{intlObj.get(messages.dupUrl)}</font>;
        return <font color="GREEN">{intlObj.get(messages.dupUrlX)}</font>;
      }
      return ''; // (<font color="RED">URL이 잘못되었습니다.</font>);
    };

    // const returnGateId = (resultObj1, resultObj2) => {
    //   this.setState({
    //     BIZGRP_ID: resultObj2,
    //   });
    // };

    return (
      <div>
        {this.state.managerOrgShow ? (
          <ErrorBoundary>
            <OrganizationRole
              show={this.state.managerOrgShow}
              closeModal={this.managerOrgClose}
              getDataFromOrganization={getDataFromOrganization}
              // 조직도로 가져갈 데이터
              selectedUsers={this.state.managerSetMembers.slice()}
              ROLE_CD="SM"
            />
          </ErrorBoundary>
        ) : (
          ''
        )}
        <ErrorBoundary>
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
        </ErrorBoundary>
        {/* <SiteAdminBizGrpModal
          show={this.state.SiteAdminBizGrpModalShow}
          closeModal={this.SiteAdminBizGrpModalClose}
          returnGateId={returnGateId}
        /> */}
        <StyleSiteAdminDtl>
          <h3 className="pageTitle regist">{this.state.title}</h3>
          <StyleSiteAdminForm>
            <table className="adminTbl siteAdminTbl">
              <tbody>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">{intlObj.get(messages.titleSiteNameKor)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.state.nameValid_Kor && !this.props.getNameChkK ? 'success' : 'error'}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                          title="NAME_KOR"
                          value={this.state.NAME_KOR}
                          // onChange={this.onChangeName}
                          onChange={e => this.onChangeName(e, 'NAME_KOR')}
                          maxLength="200"
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s1"
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </ErrorBoundary>
                      <span className="tipText">{dupNameChkK(this.props.getNameChkK)}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">{intlObj.get(messages.titleSiteNameEng)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.state.nameValid_Eng && !this.props.getNameChkE ? 'success' : 'error'}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                          title="NAME_ENG"
                          value={this.state.NAME_ENG}
                          onChange={e => this.onChangeName(e, 'NAME_ENG')}
                          maxLength="200"
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s1"
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </ErrorBoundary>
                      <span className="tipText">{dupNameChkE(this.props.getNameChkE)}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s1">{intlObj.get(messages.titleSiteNameChn)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.state.nameValid_Chn && !this.props.getNameChkC ? 'success' : 'error'}>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                          title="NAME_CHN"
                          value={this.state.NAME_CHN}
                          onChange={e => this.onChangeName(e, 'NAME_CHN')}
                          maxLength="200"
                          // style={{ width: '60%', marginRight: 10 }}
                          id="s1"
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </ErrorBoundary>
                      <span className="tipText">{dupNameChkC(this.props.getNameChkC)}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s2">URL</label>
                  </th>
                  <td className="urlForm">
                    <FormItem {...formItemLayout} hasFeedback validateStatus={this.state.urlValid && !this.props.getUrlChk ? 'success' : 'error'}>
                      <span className="mainUrlTxt">http://</span>
                      <ErrorBoundary>
                        <Input
                          placeholder={intlObj.get(messages.lblURLPlaceholder)}
                          title="URL"
                          value={this.state.URL}
                          onChange={this.onChangeURL}
                          // onKeyPress={this.onKeyPressURL}
                          // onBlur={this.onBlurURL}
                          maxLength="380"
                          style={{ width: 285, marginRight: 10 }}
                        />
                      </ErrorBoundary>
                      <span className="mainUrlTxt">/</span>
                      <span className="tipText">{dupUrlChk(this.props.getUrlChk)}</span>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s3">{intlObj.get(messages.lblMng)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <div className="authorityList">
                        {/* // 리턴 뷰 사용 */}
                        <ErrorBoundary>
                          <SiteManagerList managerList={this.state.managerSetMembers} delFlag returnManagerList={returnManagerList} />
                        </ErrorBoundary>
                      </div>
                      <button onClick={this.managerOrgOpen} className="textLinkBtn">
                        &lt; {intlObj.get(messages.lblEdit)}
                      </button>
                    </FormItem>
                  </td>
                </tr>
                <tr>
                  <th className="required">
                    <label htmlFor="s4">{intlObj.get(messages.lblView)}</label>
                  </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <div className="authorityList">
                        <ErrorBoundary>
                          <SiteManagerList
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
                        </ErrorBoundary>
                      </div>
                      <button onClick={this.allOrgOpen} className="textLinkBtn">
                        &lt; {intlObj.get(messages.lblEdit)}
                      </button>
                    </FormItem>
                  </td>
                </tr>
                {/* <tr>
                  <th className="required">
                    <label htmlFor="s4">HOME</label>
                  </th>
                  <td>
                    <FormItem
                      {...formItemLayout} */}
                {/* // hasFeedback
                      // validateStatus={this.state.nameValid && !this.props.getNameChk ? 'success' : 'error'} */}
                {/* > */}
                {/* <Select
                        value={this.state.BIZGRP_ID.toString()}
                        onChange={this.handleSelect}
                        className="selectOpt"
                        style={{ width: 200 }}
                        dropdownStyle={{ fontSize: 13 }}
                      > */}
                {/* <ul className="skinList"> */}
                {/* {homeRow} */}
                {/* {(this.props.loadHome)} */}
                {/* </ul> */}
                {/* </Select> */}
                {/* <Input
                        placeholder="HOME을 선택하세요"
                        title="HOME"
                        value={this.state.BIZGRP_ID}
                        onChange={this.onChangeHome}
                        maxLength="200"
                        id="s1"
                      /> */}
                {/* <span className="tipText">{dupNameChk(this.props.getNameChk)}</span> */}
                {/* <button onClick={this.SiteAdminBizGrpModalOpen} className="textLinkBtn">&lt; {intlObj.get(messages.lblEdit)}</button> */}
                {/* </FormItem>
                  </td>
                </tr> */}
                <tr>
                  <th className="required">
                    <label htmlFor="s4">{intlObj.get(messages.lblSkin)}</label>
                  </th>
                  <td style={{ paddingRight: 20 }}>
                    <FormItem {...formItemLayout}>
                      <div className="skinWrapper">
                        <ErrorBoundary>
                          <RadioGroup onChange={this.onChangeTheme} value={this.state.THEME_CD}>
                            <ul className="skinList">{skinRow(this.props.loadSkin)}</ul>
                          </RadioGroup>
                        </ErrorBoundary>
                      </div>
                    </FormItem>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleSiteAdminForm>
          <div className="buttonWrapper">
            <ErrorBoundary>
              <StyledButton className="btn-light">
                <Link to="/admin/adminmain/siteadmin">{intlObj.get(messages.lblCancel)}</Link>
              </StyledButton>
            </ErrorBoundary>
            <ErrorBoundary>
              <StyledButton className="btn-primary" onClick={this.regConfirm}>
                {intlObj.get(messages.lblReg)}
              </StyledButton>
            </ErrorBoundary>
          </div>
        </StyleSiteAdminDtl>
      </div>
    );
  }
}

SiteReg.propTypes = {
  // regSite: PropTypes.func, //eslint-disable-line
  registSite: PropTypes.func, //eslint-disable-line
  chkName: PropTypes.func, //eslint-disable-line
  chkUrl: PropTypes.func, //eslint-disable-line
  getSkinList: PropTypes.func, //eslint-disable-line
  getHomeList: PropTypes.func, //eslint-disable-line
  getNameChkK: PropTypes.bool, //eslint-disable-line
  getUrlChk: PropTypes.bool, //eslint-disable-line
  loadSkin: PropTypes.array, //eslint-disable-line
  loadHome: PropTypes.array, //eslint-disable-line
  mySkin: PropTypes.string, //eslint-disable-line
  myHome: PropTypes.string, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  getDefault: PropTypes.array, //eslint-disable-line
  getDefaultList: PropTypes.func, //eslint-disable-line
  getNameChkE: PropTypes.string.isRequired,
  getNameChkC: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  chkName: (keywordType, NAME_KOR) => dispatch(actions.chkName(keywordType, NAME_KOR)),
  chkUrl: (keywordType, URL) => dispatch(actions.chkUrl(keywordType, URL)),
  getSkinList: () => dispatch(actions.getSkinList()),
  getHomeList: () => dispatch(actions.getHomeList()),
  registSite: (
    nameKor,
    nameChn,
    nameEng,
    url,
    bizgrpId,
    themeCd,
    managerSetMembers,
    userSetMembers,
    pstnSetMembers,
    deptSetMembers,
    dutySetMembers,
    grpSetMembers,
    history,
  ) =>
    dispatch(
      actions.registSite(
        nameKor,
        nameChn,
        nameEng,
        url,
        bizgrpId,
        themeCd,
        managerSetMembers,
        userSetMembers,
        pstnSetMembers,
        deptSetMembers,
        dutySetMembers,
        grpSetMembers,
        history,
      ),
    ),
  getDefaultList: () => dispatch(actions.getDefaultList()),
});

const mapStateToProps = createStructuredSelector({
  loadSkin: selectors.makeSkinList(),
  loadHome: selectors.makeHomeList(),
  getNameChkK: selectors.makeNameCheckK(),
  getNameChkC: selectors.makeNameCheckC(),
  getNameChkE: selectors.makeNameCheckE(),
  getUrlChk: selectors.makeUrlCheck(),
  registSite: selectors.makeRegistSite(),
  mySkin: selectors.mySkin(),
  myHome: selectors.myHome(),
  getDefault: selectors.makeDefaultList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'SiteReg', saga });
const withReducer = injectReducer({ key: 'SiteReg', reducer });

export default compose(withReducer, withSaga, withConnect)(SiteReg);
