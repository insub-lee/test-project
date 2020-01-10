import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import OrganizationRole from 'components/OrganizationRole';
import SiteManagerList from 'components/OrgReturnView';
import Select, { SelectOption } from 'components/Select';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import message from 'components/Feedback/message';
import { Form, Radio, Input } from 'antd';
import { Link } from 'react-router-dom';
import { lang, intlObj } from 'utils/commonUtils';
// import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
// import message from 'components/Feedback/message';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleSiteAdminForm from './StyleSiteAdminForm';
import StyleSiteAdminDtl from './StyleSiteAdminDtl';

// import { LinkBtnList, BtnDkGray, BtnDelete, BtnLgtGray } from '../../../../store/components/uielements/buttons.style';
import StyledButton from '../../../../../components/Button/StyledButton';
import messages from '../messages';
import AntRadiobox from '../../../../portal/components/uielements/radiobox.style';

const FormItem = Form.Item;
const RadioGroup = AntRadiobox(Radio.Group);
const Option = SelectOption;
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

class SiteDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // SITE_ID: props.match.params.SITE_ID,
      SITE_ID: props.location.state.SITE_ID,
      delData: [],
      readOnly: 'true',
      NAME_KOR: props.location.state.NAME_KOR,
      NAME_CHN: props.location.state.NAME_CHN,
      NAME_ENG: props.location.state.NAME_ENG,
      URL: '',
      BIZGRP_ID: 1,
      THEME_CD: '',
      // siteInfoRow: [],
      managerOrgShow: false,
      allOrgShow: false,
      managerSetMembers: [], // 관리대상: 구성원
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹
      orgVal: props.location.state,
    };

    this.props.getSkinList();
    this.props.getSiteInfo(this.state.SITE_ID);

    this.props.getHomeList(this.state.SITE_ID);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onKeyPressURL = this.onKeyPressURL.bind(this);
    this.onBlurURL = this.onBlurURL.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.getSecInfoFromDB = this.getSecInfoFromDB.bind(this);
    this.getSecInfoFromDBAll = this.getSecInfoFromDBAll.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.setReadOnly = this.setReadOnly.bind(this);
  }

  componentDidMount() {
    // const { match } = this.props;
    // const { params } = match;
    // const { SITE_ID } = params;
    // if (SITE_ID) {
    //   this.state.SITE_ID = this.props.SITE_ID;
    //   // APP_ID: Number(APP_ID),
    // }
    // this.props.getSiteInfo(this.state.SITE_ID);
    // this.state.THEME_CD = this.props.siteInfoRow.THEME_CD;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.readOnly === 'false') return;

    this.setState({
      // siteInfoRow: nextProps.siteInfoRow,
      NAME_KOR: nextProps.siteInfoRow.NAME_KOR,
      NAME_CHN: nextProps.siteInfoRow.NAME_CHN,
      NAME_ENG: nextProps.siteInfoRow.NAME_ENG,
      URL: nextProps.siteInfoRow.URL,
      BIZGRP_ID: nextProps.siteInfoRow.BIZGRP_ID ? nextProps.siteInfoRow.BIZGRP_ID.toString() : '1',
      THEME_CD: nextProps.siteInfoRow.THEME_CD,
      // nameValid: false,
      nameValid_Kor: false,
      nameValid_Eng: false,
      nameValid_Chn: false,
      urlValid: false,
    });

    this.getSecInfoFromDB(nextProps.siteSecRowI);
    this.getSecInfoFromDBAll(nextProps.siteSecRowV);
    // this.state.readOnly = 'true';
  }

  onChangeName(e, lan) {
    console.log(e.target.value);
    if (lan === 'NAME_KOR') {
      this.setState({ NAME_KOR: e.target.value, nameValid_Kor: true });
    } else if (lan === 'NAME_CHN') {
      this.setState({ NAME_CHN: e.target.value, nameValid_Chn: true });
    } else if (lan === 'NAME_ENG') {
      this.setState({ NAME_ENG: e.target.value, nameValid_Eng: true });
    }

    if (e.target.value === '' && lan === 'NAME_KOR') {
      this.setState({ nameValid_Kor: false });
      return;
    }
    if (e.target.value === '' && lan === 'NAME_CHN') {
      this.setState({ nameValid_Chn: false });
      return;
    }
    if (e.target.value === '' && lan === 'NAME_ENG') {
      this.setState({ nameValid_Eng: false });
      return;
    }
    // this.setState({ NAME_KOR: e.target.value });
    this.props.chkName(`${lan}_CHK`, e.target.value);
    // if (e.target.value !== '') this.setState({ nameValid: true });
    // else this.setState({ nameValid: false });
  }

  onChangeURL(e) {
    console.log(e.target.value);
    this.setState({ URL: e.target.value });
    let strURL = '';
    if (e.target.value.charAt(e.target.value.length - 1) !== '/') {
      strURL = `http://${e.target.value.replace('http://', '')}/`;
    } else {
      strURL = `http://${e.target.value.replace('http://', '')}`;
    }
    if (e.target.value !== '') this.setState({ urlValid: true });
    else this.setState({ urlValid: false });

    this.props.chkUrl('URL_CHK', strURL);
  }

  onKeyPressURL(e) {
    if (e.charCode === 13) {
      let strURL = '';
      if (this.state.URL.charAt(this.state.URL.length - 1) !== '/') {
        strURL = `http://${e.target.value.replace('http://', '')}/`;
      } else {
        strURL = `http://${e.target.value.replace('http://', '')}`;
      }
      this.props.chkUrl('URL_CHK', strURL);
    }
  }

  onBlurURL(e) {
    let strURL = '';
    if (this.state.URL.charAt(this.state.URL.length - 1) !== '/') {
      strURL = `http://${e.target.value.replace('http://', '')}/`;
    } else {
      strURL = `http://${e.target.value.replace('http://', '')}`;
    }
    this.props.chkUrl('URL', strURL);
  }

  onChangeTheme(e) {
    this.setState({ THEME_CD: e.target.value });
  }

  getSecInfoFromDB = resultList => {
    const managerSetMembersCopy = [];

    resultList.map(obj => {
      managerSetMembersCopy.push(obj);
      return managerSetMembersCopy;
    });

    this.setState({
      managerSetMembers: managerSetMembersCopy,
    });
  };

  getSecInfoFromDBAll = resultList => {
    const userSetMembersCopy = [];
    const pstnSetMembersCopy = [];
    const deptSetMembersCopy = [];
    const dutySetMembersCopy = [];
    const grpSetMembersCopy = [];

    resultList.map(obj => {
      if (resultList.findIndex(o => o.ACNT_TYPE === 'U' && obj.ACNT_TYPE === 'U') > -1) {
        // 구성원
        userSetMembersCopy.push(obj);
      } else if (resultList.findIndex(o => o.ACNT_TYPE === 'D' && obj.ACNT_TYPE === 'D') > -1) {
        // 부서
        deptSetMembersCopy.push(obj);
      } else if (resultList.findIndex(o => o.ACNT_TYPE === 'T' && obj.ACNT_TYPE === 'T') > -1) {
        // 직책
        dutySetMembersCopy.push(obj);
      } else if (resultList.findIndex(o => o.ACNT_TYPE === 'V' && obj.ACNT_TYPE === 'V') > -1) {
        // 가상그룹
        grpSetMembersCopy.push(obj);
      } else if (resultList.findIndex(o => o.ACNT_TYPE === 'P' && obj.ACNT_TYPE === 'P') > -1) {
        // 직위
        pstnSetMembersCopy.push(obj);
      }

      return resultList; // userSetMembersCopy;
      // return pstnSetMembersCopy;
    });

    for (let i = 0; i < pstnSetMembersCopy.length; i += 1) {
      pstnSetMembersCopy[i].id = pstnSetMembersCopy[i].ID;
      pstnSetMembersCopy[i].title = pstnSetMembersCopy[i].TITLE;
      pstnSetMembersCopy[i].deptName = pstnSetMembersCopy[i].DEPTNAME;
    }

    for (let i = 0; i < deptSetMembersCopy.length; i += 1) {
      deptSetMembersCopy[i].id = deptSetMembersCopy[i].ID;
      deptSetMembersCopy[i].title = deptSetMembersCopy[i].TITLE;
      deptSetMembersCopy[i].deptName = deptSetMembersCopy[i].DEPTNAME;
    }

    for (let i = 0; i < dutySetMembersCopy.length; i += 1) {
      dutySetMembersCopy[i].id = dutySetMembersCopy[i].ID;
      dutySetMembersCopy[i].title = dutySetMembersCopy[i].TITLE;
      dutySetMembersCopy[i].deptName = dutySetMembersCopy[i].DEPTNAME;
    }

    for (let i = 0; i < grpSetMembersCopy.length; i += 1) {
      grpSetMembersCopy[i].id = grpSetMembersCopy[i].ID;
      grpSetMembersCopy[i].title = grpSetMembersCopy[i].TITLE;
      grpSetMembersCopy[i].deptName = grpSetMembersCopy[i].DEPTNAME;
    }

    this.setState({
      userSetMembers: userSetMembersCopy,
      pstnSetMembers: pstnSetMembersCopy,
      deptSetMembers: deptSetMembersCopy,
      dutySetMembers: dutySetMembersCopy,
      grpSetMembers: grpSetMembersCopy,
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
      this.state.BIZGRP_ID !== '' &&
      this.state.BIZGRP_ID !== null &&
      this.state.THEME_CD !== '' &&
      this.state.THEME_CD !== null &&
      mngCnt > 0 &&
      usrCnt > 0
    ) {
      // 사이트명이나 URL이 중복되지 않았으면 TRUE
      if (!this.props.getNameChk && !this.props.getUrlChk) return true;

      // 사이트명이나 URL이 중복되었더라도 최초값과 같으면 TRUE
      if (this.state.NAME_KOR === this.state.orgVal.tmpName || `${this.state.URL}/` === this.state.orgVal.tmpUrl || this.state.URL === this.state.orgVal.tmpUrl)
        return true;

      // 이외에는 FALSE
      message.error(`${intlObj.get(messages.chkInput)}`, 2);
      return false;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  };

  udtConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm(`${intlObj.get(messages.udtConfirm)}`, '', this.updateRow);
    }
  };

  updateRow = () => {
    if (this.state.URL.charAt(this.state.URL.length - 1) !== '/') {
      this.setState(prevState => ({ URL: `${prevState.URL.replace('http://', '')}/` }));
    } else {
      this.setState(prevState => ({ URL: `${prevState.URL.replace('http://', '')}` }));
    }
    this.setState({ readOnly: 'true' });

    // alert(`this.state.pstnSetMembers ${this.state.pstnSetMembers[1].toString()}`);

    this.props.updateSite(
      this.state.SITE_ID,
      this.state.NAME_KOR,
      this.state.NAME_ENG,
      this.state.NAME_CHN,
      this.state.URL.charAt(this.state.URL.length - 1) !== '/' ? `${this.state.URL}/` : `${this.state.URL}`,
      this.state.BIZGRP_ID,
      this.state.THEME_CD,
      this.state.managerSetMembers,
      this.state.userSetMembers,
      this.state.pstnSetMembers,
      this.state.deptSetMembers,
      this.state.dutySetMembers,
      this.state.grpSetMembers,
    );
  };

  delConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.deleteRow);
  };

  deleteRow() {
    // console.log(this.state.delData);
    // alert(`삭제할 로우의 코드그룹ID : ${this.state.delData}`);
    // this.onRowsDeselected(this.state.delData);
    this.state.delData.push(Number(this.state.SITE_ID));

    this.props.delSite(this.state.delData, this.props.history);
  }

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
    this.setState({
      allOrgShow: true,
    });
  };

  allOrgClose = () => {
    this.setState({
      allOrgShow: false,
    });
  };

  // selectbox 값 변경 시
  handleSelect(e) {
    this.setState({ BIZGRP_ID: e });
  }

  getDataFromOrganization = resultObj => {
    const managerSetMembersFromOrganization = resultObj.selectedUsers;

    this.setState({
      managerSetMembers: managerSetMembersFromOrganization,
    });
  };

  // 조직도에서 가져온 리스트 뷰
  returnManagerList = resultObj => {
    this.setState({
      managerSetMembers: resultObj,
    });
  };

  returnUserList = resultObj => {
    this.setState({
      userSetMembers: resultObj,
    });
  };

  returnDutyList = resultObj => {
    this.setState({
      dutySetMembers: resultObj,
    });
  };

  returnPstnList = resultObj => {
    this.setState({
      pstnSetMembers: resultObj,
    });
  };

  returnGrpList = resultObj => {
    this.setState({
      grpSetMembers: resultObj,
    });
  };

  returnDetpList = resultObj => {
    this.setState({
      deptSetMembers: resultObj,
    });
  };

  // 조직도로부터 데이터 가져오는 함수
  getDataFromOrganizationAll = resultObj => {
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

  skinRow = data =>
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
        {/* <Radio value={skin.CODE_CD} readOnly={this.state.readOnly === 'true'}> */}
        <Radio value={skin.CODE_CD} disabled={this.state.readOnly === 'true'}>
          <span className="skinItem">
            <img src={`/portal/setting/skin-option${skin.CODE_CD}.png`} alt={skin.CODE_CD} />
          </span>
        </Radio>
      </li>
    ));

  botBtn = mode => {
    if (mode === 'true') {
      // 상세
      return (
        <>
          <div style={{ float: 'left' }}>
            <ErrorBoundary>
              <StyledButton className="btn-light" onClick={this.delConfirm}>
                {intlObj.get(messages.lblDelete)}
              </StyledButton>
              <Link to="/admin/adminmain/siteadmin" style={{ marginLeft: 10 }}>
                <StyledButton className="btn-light">{intlObj.get(messages.lblList)}</StyledButton>
              </Link>
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <StyledButton
              className="btn-primary"
              onClick={() => {
                this.setState(prevState => ({
                  readOnly: 'false',
                  orgVal: {
                    tmpNameKor: prevState.NAME_KOR,
                    tmpNameEng: prevState.NAME_ENG,
                    tmpNameChn: prevState.NAME_CHN,
                    tmpUrl: prevState.URL,
                    tmpBizGrp: prevState.BIZGRP_ID,
                    tmpTheme: prevState.THEME_CD,
                    tmpManagerSetMembers: prevState.managerSetMembers,
                    tmpUserSetMembersTheme: prevState.userSetMembers,
                    tmpPstnSetMembersTheme: prevState.pstnSetMembers,
                    tmpDeptSetMembersTheme: prevState.deptSetMembers,
                    tmpDutySetMembersTheme: prevState.dutySetMembers,
                    tmpGrpSetMembersTheme: prevState.grpSetMembers,
                  },
                  URL: prevState.URL.replace('http://', ''),
                  // nameValid: true,
                  urlValid: true,
                }));

                /*
                 * 수정모드로 바뀔 때, 사이트명의 값을 선택하고, 포커스를 준다.
                 * "수정모드로 바뀔 때" 이기 때문에, 상세 모드에서의 "수정"버튼의
                 * Onclick에 넣는다.
                 */
                // this.nameRef.select();
                this.nameRef.focus();
              }}
            >
              {intlObj.get(messages.lblUdt)}
            </StyledButton>
          </ErrorBoundary>
        </>
      );
    }
    if (mode === 'false') {
      // 수정
      return (
        <>
          <div style={{ float: 'left' }}>
            <ErrorBoundary>
              <Link to="/admin/adminmain/siteadmin">
                <StyledButton className="btn-light">{intlObj.get(messages.lblList)}</StyledButton>
              </Link>
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <StyledButton
              className="btn-light btn-cancel"
              onClick={() => {
                // this.nameRef.blur();
                this.setState(prevState => ({
                  readOnly: 'true',
                  NAME_KOR: prevState.orgVal.tmpNameKor,
                  NAME_ENG: prevState.orgVal.tmpNameEng,
                  NAME_CHN: prevState.orgVal.tmpNameChn,
                  URL: prevState.orgVal.tmpUrl,
                  BIZGRP_ID: prevState.orgVal.tmpBizGrp,
                  THEME_CD: prevState.orgVal.tmpTheme,
                  managerSetMembers: prevState.orgVal.tmpManagerSetMembers,
                  userSetMembers: prevState.orgVal.tmpUserSetMembersTheme,
                  pstnSetMembers: prevState.orgVal.tmpPstnSetMembersTheme,
                  deptSetMembers: prevState.orgVal.tmpDeptSetMembersTheme,
                  dutySetMembers: prevState.orgVal.tmpDutySetMembersTheme,
                  grpSetMembers: prevState.orgVal.tmpGrpSetMembersTheme,
                }));
              }}
            >
              {intlObj.get(messages.lblCancel)}
            </StyledButton>
          </ErrorBoundary>
          <ErrorBoundary>
            <StyledButton className="btn-primary" onClick={this.udtConfirm}>
              {intlObj.get(messages.lblSave)}
            </StyledButton>
          </ErrorBoundary>
        </>
      );
    }
    return '';
  };

  mngList = mode => {
    if (mode === 'true') {
      // 상세
      return (
        <div className="authorityList">
          <ErrorBoundary>
            <SiteManagerList managerList={this.state.managerSetMembers} delFlag={false} returnManagerList={this.returnManagerList} />
          </ErrorBoundary>
        </div>
      );
    }
    if (mode === 'false') {
      // 수정
      return (
        <div>
          <div className="authorityList">
            <ErrorBoundary>
              <SiteManagerList managerList={this.state.managerSetMembers} delFlag returnManagerList={this.returnManagerList} />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <StyledButton className="textLinkBtn btn-xs btn-secondary" onClick={this.managerOrgOpen}>
              &lt; {intlObj.get(messages.lblEdit)}
            </StyledButton>
          </ErrorBoundary>
        </div>
      );
    }
    return '';
  };

  allList = mode => {
    if (mode === 'true') {
      // 상세
      return (
        <div className="authorityList">
          <ErrorBoundary>
            <SiteManagerList
              userList={this.state.userSetMembers}
              pstnList={this.state.pstnSetMembers}
              deptList={this.state.deptSetMembers}
              dutyList={this.state.dutySetMembers}
              grpList={this.state.grpSetMembers}
              returnUserList={this.returnUserList}
              returnDutyList={this.returnDutyList}
              returnPstnList={this.returnPstnList}
              returnGrpList={this.returnGrpList}
              returnDetpList={this.returnDetpList}
              delFlag={false}
              siteIdParam={this.state.SITE_ID}
            />
          </ErrorBoundary>
        </div>
      );
    }
    if (mode === 'false') {
      // 수정
      return (
        <div>
          <div className="authorityList">
            <ErrorBoundary>
              <SiteManagerList
                userList={this.state.userSetMembers}
                pstnList={this.state.pstnSetMembers}
                deptList={this.state.deptSetMembers}
                dutyList={this.state.dutySetMembers}
                grpList={this.state.grpSetMembers}
                returnUserList={this.returnUserList}
                returnDutyList={this.returnDutyList}
                returnPstnList={this.returnPstnList}
                returnGrpList={this.returnGrpList}
                returnDetpList={this.returnDetpList}
                delFlag
                siteIdParam={this.state.SITE_ID}
              />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <StyledButton className="textLinkBtn btn-xs btn-secondary" onClick={this.allOrgOpen}>
              &lt; {intlObj.get(messages.lblEdit)}
            </StyledButton>
          </ErrorBoundary>
        </div>
      );
    }
    return '';
  };

  title = mode => {
    if (mode === 'true') return `${intlObj.get(messages.titleSiteDetail)}`;
    if (mode === 'false') return `${intlObj.get(messages.titleSiteUdt)}`;
    return `${intlObj.get(messages.titleSiteDetail)}`;
  };

  urlInput = mode => {
    if (mode === 'true') {
      return (
        <ErrorBoundary>
          <Input
            title="URL"
            value={this.state.URL}
            onChange={this.onChangeURL}
            // onKeyPress={this.onKeyPressURL}
            // onBlur={this.onBlurURL}
            readOnly
          />
        </ErrorBoundary>
      );
    }
    if (mode === 'false') {
      return (
        <div>
          <span className="mainUrlTxt">http://</span>
          <ErrorBoundary>
            <Input
              placeholder={intlObj.get(messages.lblURLPlaceholder)}
              title="URL"
              value={this.state.URL}
              onChange={this.onChangeURL}
              // onKeyPress={this.onKeyPressURL}
              // onBlur={this.onBlurURL}
              maxlength="380"
              style={{ width: 285, marginRight: 10 }}
            />
          </ErrorBoundary>
          <span className="mainUrlTxt">/</span>
        </div>
      );
    }
    return '';
  };

  // const dupNameChk = (stat) => {
  //   if (this.state.readOnly === 'true') return '';

  //   if (this.state.NAME_KOR !== '' && this.state.NAME_KOR !== this.state.orgVal.tmpName) {
  //     if (stat) return (<font color="RED">{intlObj.get(messages.dupName)}</font>);
  //     return (<font color="GREEN">{intlObj.get(messages.dupNameX)}</font>);
  //   }
  //   return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
  // };

  dupNameChkK = stat => {
    if (this.state.readOnly === 'true') return '';

    if (this.state.NAME_KOR !== '') {
      if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
      return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
    }
    return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
  };

  dupNameChkC = stat => {
    if (this.state.readOnly === 'true') return '';

    if (this.state.NAME_CHN !== '') {
      if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
      return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
    }
    return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
  };

  dupNameChkE = stat => {
    if (this.state.readOnly === 'true') return '';

    if (this.state.NAME_ENG !== '') {
      if (stat) return <font color="RED">{intlObj.get(messages.dupName)}</font>;
      return <font color="GREEN">{intlObj.get(messages.dupNameX)}</font>;
    }
    return ''; // (<font color="RED">사이트명이 잘못되었습니다.</font>);
  };

  dupUrlChk = stat => {
    if (this.state.readOnly === 'true') return '';

    if (this.state.URL !== '' && `http://${this.state.URL}/` !== this.state.orgVal.tmpUrl && `http://${this.state.URL}` !== this.state.orgVal.tmpUrl) {
      if (stat) return <font color="RED">{intlObj.get(messages.dupUrl)}</font>;
      return <font color="GREEN">{intlObj.get(messages.dupUrlX)}</font>;
    }
    return ''; // (<font color="RED">URL이 잘못되었습니다.</font>);
  };

  render() {
    // 조직도로부터 데이터 가져오는 함수

    const homeRow = this.props.loadHome.map(keycomp => <Option key={keycomp.BIZGRP_ID.toString()}>{lang.get('NAME', keycomp)}</Option>);

    return (
      <div>
        {this.state.managerOrgShow ? (
          <ErrorBoundary>
            <OrganizationRole
              show={this.state.managerOrgShow}
              closeModal={this.managerOrgClose}
              getDataFromOrganization={this.getDataFromOrganization}
              // 조직도로 가져갈 데이터
              selectedUsers={this.state.managerSetMembers.slice()}
              orgName="관리권한조직도"
              ROLE_CD="SM"
            />
          </ErrorBoundary>
        ) : (
          ''
        )}
        <ErrorBoundary>
          <Organization
            siteIdParam={this.state.SITE_ID}
            isTreeCheckbox
            show={this.state.allOrgShow}
            closeModal={this.allOrgClose}
            userTab
            pstnTab
            dutyTab
            grpTab
            getDataFromOrganization={this.getDataFromOrganizationAll}
            // 조직도로 가져갈 데이터
            selectedUsers={this.state.userSetMembers.slice()}
            checkedDept={this.state.deptSetMembers.slice()}
            checkedPstn={this.state.pstnSetMembers.slice()}
            checkedDuty={this.state.dutySetMembers.slice()}
            checkedGrp={this.state.grpSetMembers.slice()}
            orgName="접속권한조직도"
          />
        </ErrorBoundary>
        <StyleSiteAdminDtl>
          <h3 className="pageTitle regist">{this.title(this.state.readOnly)}</h3>
          <StyleSiteAdminForm className={this.state.readOnly === 'true' ? 'modeD' : ''}>
            <ErrorBoundary>
              <Form>
                <table className="adminTbl siteAdminTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="s1">{intlObj.get(messages.titleSiteNameKor)}</label>
                      </th>
                      <td>
                        {/* {this.state.SITE_ID} */}
                        <FormItem
                          {...formItemLayout}
                          hasFeedback={this.state.readOnly === 'false'}
                          validateStatus={this.state.nameValid_Kor && !this.props.getNameChk ? 'success' : 'error'}
                        >
                          <Input
                            // eslint-disable-next-line no-return-assign
                            ref={nameRef => (this.nameRef = nameRef)} // Default로 포커스를 줄 수 없어서 가변으로 주기 위한 방법
                            placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                            title="NAME_KOR"
                            // value={lang.get('NAME', this.props.siteInfoRow)}
                            value={this.state.NAME_KOR}
                            // onChange={this.onChangeName}
                            onChange={e => this.onChangeName(e, 'NAME_KOR')}
                            maxlength="200"
                            readOnly={this.state.readOnly === 'true'}
                            // autoFocus={this.state.readOnly === 'false'}
                          />
                          <span className="tipText">{this.dupNameChkK(this.props.getNameChkK)}</span>
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s1">{intlObj.get(messages.titleSiteNameEng)}</label>
                      </th>
                      <td>
                        {/* {this.state.SITE_ID} */}
                        <FormItem
                          {...formItemLayout}
                          hasFeedback={this.state.readOnly === 'false'}
                          validateStatus={this.state.nameValid_Eng && !this.props.getNameChk ? 'success' : 'error'}
                        >
                          <Input
                            // eslint-disable-next-line no-return-assign
                            ref={nameRef => (this.nameRef = nameRef)} // Default로 포커스를 줄 수 없어서 가변으로 주기 위한 방법
                            placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                            title="NAME_ENG"
                            // value={lang.get('NAME', this.props.siteInfoRow)}
                            value={this.state.NAME_ENG}
                            // onChange={this.onChangeName}
                            onChange={e => this.onChangeName(e, 'NAME_ENG')}
                            maxlength="200"
                            readOnly={this.state.readOnly === 'true'}
                            // autoFocus={this.state.readOnly === 'false'}
                          />
                          <span className="tipText">{this.dupNameChkE(this.props.getNameChkE)}</span>
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s1">{intlObj.get(messages.titleSiteNameChn)}</label>
                      </th>
                      <td>
                        {/* {this.state.SITE_ID} */}
                        <FormItem
                          {...formItemLayout}
                          hasFeedback={this.state.readOnly === 'false'}
                          validateStatus={this.state.nameValid_Chn && !this.props.getNameChk ? 'success' : 'error'}
                        >
                          <Input
                            // eslint-disable-next-line no-return-assign
                            ref={nameRef => (this.nameRef = nameRef)} // Default로 포커스를 줄 수 없어서 가변으로 주기 위한 방법
                            placeholder={intlObj.get(messages.lblSiteNamePlaceholder)}
                            title="NAME_CHN"
                            // value={lang.get('NAME', this.props.siteInfoRow)}
                            value={this.state.NAME_CHN}
                            // onChange={this.onChangeName}
                            onChange={e => this.onChangeName(e, 'NAME_CHN')}
                            maxlength="200"
                            readOnly={this.state.readOnly === 'true'}
                            // autoFocus={this.state.readOnly === 'false'}
                          />
                          <span className="tipText">{this.dupNameChkC(this.props.getNameChkC)}</span>
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s2">URL</label>
                      </th>
                      <td>
                        <FormItem
                          {...formItemLayout}
                          hasFeedback={this.state.readOnly === 'false'}
                          validateStatus={this.state.urlValid && !this.props.getUrlChk ? 'success' : 'error'}
                        >
                          {this.urlInput(this.state.readOnly)}
                          <span className="tipText">{this.dupUrlChk(this.props.getUrlChk)}</span>
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s3">{intlObj.get(messages.lblMng)}</label>
                      </th>
                      <td>
                        <FormItem {...formItemLayout}>
                          {/* // 리턴 뷰 사용 */}
                          {this.mngList(this.state.readOnly)}
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s4">{intlObj.get(messages.lblView)}</label>
                      </th>
                      <td>
                        <FormItem {...formItemLayout}>{this.allList(this.state.readOnly)}</FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s4">HOME{/* {intlObj.get(messages.lblSkin)} */}</label>
                      </th>
                      <td>
                        <FormItem
                          {...formItemLayout}
                          // hasFeedback
                          // validateStatus={this.state.nameValid && !this.props.getNameChk ? 'success' : 'error'}
                        >
                          <Select
                            // defaultValue="1"
                            value={this.state.BIZGRP_ID === '-1' ? '' : this.state.BIZGRP_ID}
                            onChange={this.handleSelect}
                            className="selectOpt"
                            style={{ width: 200 }}
                            dropdownStyle={{ fontSize: 13 }}
                            notFoundContent="선택하세요"
                            placeholder="선택하세요"
                            disabled={this.state.readOnly === 'true'}
                            defaultActiveFirstOption
                          >
                            {homeRow}
                          </Select>
                          {}
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="s5">{intlObj.get(messages.lblSkin)}</label>
                      </th>
                      <td style={{ paddingRight: 20 }}>
                        <FormItem {...formItemLayout}>
                          <div className="skinWrapper">
                            <RadioGroup
                              onChange={this.onChangeTheme}
                              // value={this.props.siteInfoRow.THEME_CD}
                              value={this.state.THEME_CD}
                              readOnly={this.state.readOnly === 'true'}
                            >
                              <ul className="skinList">{this.skinRow(this.props.loadSkin)}</ul>
                            </RadioGroup>
                          </div>
                        </FormItem>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
            </ErrorBoundary>
          </StyleSiteAdminForm>
          <div className="buttonWrapper">{this.botBtn(this.state.readOnly)}</div>
          {/* <LeftMenu /> */}
        </StyleSiteAdminDtl>
      </div>
    );
  }
}

SiteDetail.propTypes = {
  getSiteInfo: PropTypes.func,
  chkName: PropTypes.func,
  chkUrl: PropTypes.func,
  siteInfoRow: PropTypes.array,
  siteSecRowI: PropTypes.array,
  siteSecRowV: PropTypes.array,
  location: PropTypes.object,
  match: PropTypes.object,
  updateSite: PropTypes.func,
  delList: PropTypes.func,
  delSite: PropTypes.func,
  SITE_ID: PropTypes.number,
  getSkinList: PropTypes.func,
  getHomeList: PropTypes.func,
  loadSkin: PropTypes.array,
  loadHome: PropTypes.array,
  history: PropTypes.object,
  getNameChk: PropTypes.bool,
  getUrlChk: PropTypes.bool,
  getNameChkE: PropTypes.string.isRequired,
  getNameChkK: PropTypes.string.isRequired,
  getNameChkC: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSiteInfo: siteId => dispatch(actions.getSiteInfo(siteId)),
  chkName: (keywordType, NAME_KOR) => dispatch(actions.chkName(keywordType, NAME_KOR)),
  chkUrl: (keywordType, URL) => dispatch(actions.chkUrl(keywordType, URL)),
  historyPush: url => dispatch(push(url)),
  updateSite: (
    siteId,
    nameKor,
    nameEng,
    nameChn,
    url,
    bizGrpId,
    themeCd,
    managerSetMembers,
    userSetMembers,
    pstnSetMembers,
    deptSetMembers,
    dutySetMembers,
    grpSetMembers,
  ) =>
    dispatch(
      actions.updateSite(
        siteId,
        nameKor,
        nameEng,
        nameChn,
        url,
        bizGrpId,
        themeCd,
        managerSetMembers,
        userSetMembers,
        pstnSetMembers,
        deptSetMembers,
        dutySetMembers,
        grpSetMembers,
      ),
    ),
  delSite: (delData, history) => dispatch(actions.delSite(delData, history)),
  getSkinList: () => dispatch(actions.getSkinList()),
  getHomeList: siteId => dispatch(actions.getHomeList(siteId)),
});

const mapStateToProps = createStructuredSelector({
  siteInfoRow: selectors.makeSelectSiteInfo(),
  siteSecRowI: selectors.makeSelectSiteSecI(),
  siteSecRowV: selectors.makeSelectSiteSecV(),
  delList: selectors.makeDelRow(),
  loadSkin: selectors.makeSkinList(),
  loadHome: selectors.makeHomeList(),
  getNameChk: selectors.makeNameCheck(),
  getNameChkK: selectors.makeNameCheckK(),
  getNameChkC: selectors.makeNameCheckC(),
  getNameChkE: selectors.makeNameCheckE(),
  getUrlChk: selectors.makeUrlCheck(),
  // mySkin: selectors.mySkin(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'SiteInfo', saga });
const withReducer = injectReducer({ key: 'SiteInfo', reducer });

export default compose(withReducer, withSaga, withConnect)(SiteDetail);
