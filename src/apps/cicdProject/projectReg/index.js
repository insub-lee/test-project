import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Input, Select, Radio, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Organization from 'containers/portal/components/Organization';
import SiteManagerList from 'components/OrgReturnView';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import message from 'components/Feedback/message';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import StyleProjectRegForm from './StyleProjectRegForm';
import StyleProjectRegDtl from './StyleProjectRegDtl';
import { LinkBtnLgtGray, BtnDkGray, BtnGray } from './buttons.style';

const FormItem = Form.Item;
const { TextArea } = Input;
const Options = Select.Option;
const RadioGroup = Radio.Group;

class ProjectReg extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      NAME_KOR: '',
      NAME_CHN: '',
      NAME_ENG: '',
      allOrgShow: false,
      allMemShow: false,
      managerSetMembers: [], // 관리대상: 구성원
      userSetMembers: [], // 구성원
      pstnSetMembers: [], // 직위
      deptSetMembers: [], // 부서
      dutySetMembers: [], // 직책
      grpSetMembers: [], // 가상그룹
      defaultBox: [],
      divion: undefined,
      visibility: '',
      replication: '',
      use: '',
      setting: '',
      modalVisible: false,
      modalMsg: null,
      bytesCheck: 0,
    };

    this.props.getDefaultList();
    this.setDefault = this.setDefault.bind(this);

    this.props.handleLoadingParam();
  }

  componentDidMount() {
    this.setDefault();
  }

  componentWillReceiveProps(nextProps) {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    managerSetMembersDefault.push({
    });

    grpSetMembersDefault.push({
    });

    this.setState({
    });

    if (this.state.PROJECT_NAME !== undefined) {
      if (nextProps.dupCheckFlag !== null) {
        if (nextProps.dupCheckFlag === 'Y') {
          message.success('사용가능합니다.', 2);
        } else {
          message.error('중복입니다.', 2);
        }
      }
    }
  }

  // 공개설정
  onChangeVisibility = (e) => {
    this.setState({
      visibility: e.target.value,
    });
  }

  // 복제허용
  onChangeReplication = (e) => {
    this.setState({
      replication: e.target.value,
    });
  }

  // 데이터 변경 확인
  onChangeName(e, lang) {
    if (lang === 'NAME_CHN') {
      this.setState({ NAME_CHN: e.target.value });
    } else if (lang === 'NAME_ENG') {
      this.setState({ NAME_ENG: e.target.value });
    } else if (lang === 'PROJECT_NAME') {
      this.setState({ PROJECT_NAME: e.target.value });
    } else if (lang === 'PROJECT_EXPLANATION') {
      if (e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length === 500 || e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length >= 500) {
        this.bytes(e.target.value);
      } else if (e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length <= 500) {
        this.setState({ PROJECT_EXPLANATION: e.target.value });
        // 바이트 체크
        this.bytes(e.target.value);
      }
    } else if (lang === 'AUTHENTICATION_KEY') {
      this.setState({ AUTHENTICATION_KEY: e.target.value });
    }
  }

  // Redis 사용여부
  onChangeUse = (e) => {
    this.setState({
      use: e.target.value,
    });
  }

  // Redis 용량설정
  onChangeSetting = (e) => {
    this.setState({
      setting: e.target.value,
    });
  }

  // 중복체크
  onDupCheckYn = () => {
    this.props.dupCheck('DUP_CHECK', this.state.PROJECT_NAME);
  }

  setDefault = () => {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    managerSetMembersDefault.push({
    });

    grpSetMembersDefault.push({
    });

    this.setState({
    });
  }

  handleDivionChange = (event) => {
    this.setState({
      divion: event,
    });
  }

  regConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm('등록 하시겠습니까?', '', this.regSite);
    }
  }

  vaildChk = () => {
    if (this.state.divion === undefined || this.state.divion === '') {
      message.error('프로젝트 구분을 선택해주세요.', 2);
      return false;
    } else if (this.state.PROJECT_NAME === undefined || this.state.PROJECT_NAME === '') {
      message.error('프로젝트 명을 입력해주세요.', 2);
      return false;
    } else if (this.props.dupCheckFlag === 'N') {
      message.error('프로젝트명이 중복입니다. 확인부탁 드립니다.', 2);
      return false;
    } else if (this.props.dupCheckFlag === null) {
      message.error('중복확인버튼을 클릭하세요.', 2);
      return false;
    } else if (this.state.PROJECT_EXPLANATION === undefined || this.state.PROJECT_EXPLANATION === '') {
      message.error('프로젝트 설명을 입력해주세요.', 2);
      return false;
    } else if (this.state.visibility === undefined || this.state.visibility === '') {
      message.error('공개설정을 선택해주세요.', 2);
      return false;
    } else if (this.state.replication === undefined || this.state.replication === '') {
      message.error('복제허용을 선택해주세요.', 2);
      return false;
    } else if (this.state.AUTHENTICATION_KEY === undefined || this.state.AUTHENTICATION_KEY === '') {
      message.error('인증키를 입력해주세요.', 2);
      return false;
    } else if (this.state.managerSetMembers === undefined || this.state.managerSetMembers === '') {
      message.error('Distributor를 선택해주세요.', 2);
      return false;
    } else if (this.state.grpSetMembers === undefined || this.state.grpSetMembers === '') {
      message.error('Administrator를 선택해주세요.', 2);
      return false;
    } else if (this.state.use === undefined || this.state.use === '') {
      message.error('Redis 사용여부를 선택해주세요.', 2);
      return false;
    } else if (this.state.setting === undefined || this.state.setting === '') {
      message.error('Redis 용량설정을 선택해주세요.', 2);
      return false;
    }
    return true;
  }

  regSite = () => {
    // 저장 프로세스
    this.props.projectReg(
      this.state.NAME_KOR,
      this.state.NAME_CHN,
      this.state.NAME_ENG,
      this.state.BIZGRP_ID,
      this.state.managerSetMembers,
      this.state.userSetMembers,
      this.state.pstnSetMembers,
      this.state.deptSetMembers,
      this.state.dutySetMembers,
      this.state.grpSetMembers,
      this.props.history,
      this.state.PROJECT_NAME,
      this.state.PROJECT_EXPLANATION,
      this.state.AUTHENTICATION_KEY,
      this.state.visibility,
      this.state.replication,
      this.state.use,
      this.state.setting,
      this.state.divion,
    );
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

  allMemOpen = () => {
    this.setState({
      allMemShow: true,
    });
  };

  allMemClose = () => {
    this.setState({
      allMemShow: false,
    });
  };

  // modal
  handleShowModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  // byte check
  bytes = (value) => {
    this.setState({ bytesCheck: value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length });
  }

  render() {
    const {
      defaultBox,
      divion,
      visibility,
      replication,
      use,
      setting,
    } = this.state;

    const {
      divionListCombo,
    } = this.props;

    // 조직도에서 가져온 리스트 뷰
    const returnManagerList = (resultObj) => {
      this.setState({
        managerSetMembers: resultObj,
      });
    };

    const returnGrpList = (resultObj) => {
      this.setState({
        grpSetMembers: resultObj,
      });
    };

    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAll = (resultObj) => {
      // 구성원
      const devSetMembersFromOrganization = resultObj.selectedUsers;

      this.setState({
        managerSetMembers: devSetMembersFromOrganization, // 구성원
      });
    };

    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAlls = (resultObj) => {
      // 구성원
      const devSetMembersFromOrganizations = resultObj.selectedUsers;

      this.setState({
        grpSetMembers: devSetMembersFromOrganizations, // 구성원
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

    return (
      <form name="frmPopup" onSubmit={event => event.preventDefault()}>
        <div>
          <h2> 프로젝트 생성 </h2>
        </div>
        <div>
          <ErrorBoundary>
            <Organization
              show={this.state.allOrgShow}
              closeModal={this.allOrgClose}
              getDataFromOrganization={getDataFromOrganizationAll}
              userTab={true}
              pstnTab={true}
              dutyTab={true}
              grpTab={true}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <Organization
              show={this.state.allMemShow}
              closeModal={this.allMemClose}
              getDataFromOrganization={getDataFromOrganizationAlls}
              userTab={true}
              pstnTab={true}
              dutyTab={true}
              grpTab={true}
            />
          </ErrorBoundary>
          <StyleProjectRegDtl>
            <StyleProjectRegForm>
              <table className="adminTbl siteAdminTbl">
                <tbody>
                  <tr>
                    <th className="required">
                      <label htmlFor="s1">프로젝트 구분</label>
                    </th>
                    <td>
                      <Select
                        defaultValue={defaultBox}
                        value={divion}
                        style={{ width: 300 }}
                        notFoundContent="프로젝트 구분을 선택하세요."
                        placeholder="프로젝트 구분을 선택하세요."
                        defaultActiveFirstOption={false}
                        onChange={this.handleDivionChange}
                      >
                        { divionListCombo.map(divionListComboKey => <Options key={divionListComboKey.CODE_CD}>{divionListComboKey.NAME_KOR}</Options>) }
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s1">프로젝트 명</label>
                    </th>
                    <td>
                      <div className="authorityList">
                        <Input
                          placeholder="프로젝트 명을 입력해주세요."
                          title="PROJECT_NAME"
                          value={this.state.PROJECT_NAME}
                          onChange={e => this.onChangeName(e, 'PROJECT_NAME')}
                          id="s1"
                          onKeyUp={(e) => {
                            // 한글입력제한(임시)
                            this.setState({ PROJECT_NAME: e.target.value.replace(/[^a-z0-9_]/gi, '') });
                          }}
                          autoFocus // Default로 포커스를 주는 법
                        />
                      </div>
                      <BtnGray
                        title="중복확인"
                        className="searchBtn"
                        onClick={this.onDupCheckYn}
                      >
                        중복확인
                      </BtnGray>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s2">프로젝트 설명</label>
                    </th>
                    <td>
                      <ErrorBoundary>
                        <TextArea
                          placeholder="프로젝트 설명을 입력해주세요."
                          autosize={{ minRows: 3, maxRow: 4 }}
                          id="s2"
                          onChange={e => this.onChangeName(e, 'PROJECT_EXPLANATION')}
                        />
                        <div style={{ float: 'right' }}>
                          {this.state.bytesCheck} / 500 byte
                        </div>
                      </ErrorBoundary>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s3">공개설정</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeVisibility} value={visibility}>
                        <Radio value="public" name="visibility">공개</Radio>
                        <Radio value="inside" name="visibility">내부</Radio>
                        <Radio value="private" name="visibility">비밀</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s4">복제허용</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeReplication} value={replication}>
                        <Radio value="Y" name="replication">허용</Radio>
                        <Radio value="N" name="replication">비허용</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s5">인증키</label>
                    </th>
                    <td>
                      <ErrorBoundary>
                        <Input
                          placeholder="인증키 생성 버튼을 클릭해주세요."
                          title="AUTHENTICATION_KEY"
                          value={this.state.AUTHENTICATION_KEY}
                          onChange={e => this.onChangeName(e, 'AUTHENTICATION_KEY')}
                          id="s5"
                        />
                      </ErrorBoundary>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s6">Distributor</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        <div className="authorityList">
                          {/* // 리턴 뷰 사용 */}
                          <ErrorBoundary>
                            <SiteManagerList
                              managerList={this.state.managerSetMembers}
                              delFlag={true}
                              returnManagerList={returnManagerList}
                            />
                          </ErrorBoundary>
                        </div>
                        <button onClick={this.allOrgOpen} className="textLinkBtn">&lt; 조직도 </button>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s7">Administrator</label>
                    </th>
                    <td>
                      <FormItem {...formItemLayout}>
                        <div className="authorityList">
                          {/* // 리턴 뷰 사용 */}
                          <ErrorBoundary>
                            <SiteManagerList
                              managerList={this.state.grpSetMembers}
                              delFlag={true}
                              returnGrpList={returnGrpList}
                            />
                          </ErrorBoundary>
                        </div>
                        <button onClick={this.allMemOpen} className="textLinkBtn">&lt; 조직도 </button>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s8">Redis 사용여부</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeUse} value={use}>
                        <Radio value="N" name="use">미사용</Radio>
                        <Radio value="Y" name="use">사용</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s9">Redis 용량설정</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeSetting} value={setting}>
                        <Radio value="2" name="setting">2Gb</Radio>
                        <Radio value="4" name="setting">4Gb</Radio>
                        <Radio value="8" name="setting">8Gb</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td> ※ 위 기준용량 외 추가 용량 필요시 담당자에게 문의 해주세요.<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;담당자 : 김표성 책임｜이메일 : hyoweong.kim@skhynix.com｜연락처 : 02-518-2528
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyleProjectRegForm>
            <div className="buttonWrapper">
              <ErrorBoundary>
                <LinkBtnLgtGray> <Link to="/apps/cicdProject/projectList"> 취소 </Link> </LinkBtnLgtGray>
              </ErrorBoundary>
              <ErrorBoundary>
                <BtnDkGray onClick={this.regConfirm}> 저장 </BtnDkGray>
              </ErrorBoundary>
            </div>
          </StyleProjectRegDtl>
          <Modal
            title="중복확인"
            visible={this.state.modalVisible}
            onOk={this.handleModalOk}
            okText="확인"
          >
            <p>{this.state.modalMsg}</p>
          </Modal>
        </div>
      </form>
    );
  }
}

ProjectReg.propTypes = {
  projectReg: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  getDefaultList: PropTypes.func, //eslint-disable-line
  getDefault: PropTypes.array, //eslint-disable-line
  dupCheck: PropTypes.func.isRequired, //eslint-disable-line
  dupCheckFlag: PropTypes.string,
  // projectDupChkValChg: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  divionListCombo: PropTypes.array.isRequired,
};

ProjectReg.defaultProps = {
  dupCheckFlag: null,
};

// 가져올때
const mapStateToProps = createStructuredSelector({
  projectReg: selectors.makeProjectReg(),
  getDefault: selectors.makeDefaultList(),
  dupCheck: selectors.makeDupCheck(),
  dupCheckFlag: selectors.dupCheckFlag(),
  divionListCombo: selectors.makeDivionListCombo(),
});

// 내보낼때
const mapDispatchToProps = dispatch => (
  {
    projectReg: (
      nameKor,
      nameChn,
      nameEng,
      bizgrpId,
      managerSetMembers,
      userSetMembers,
      pstnSetMembers,
      deptSetMembers,
      dutySetMembers,
      grpSetMembers,
      history,
      projectName,
      projectExplanation,
      authenticationKey,
      visibility,
      replication,
      use,
      setting,
      divion,
    ) =>
      dispatch(actions.projectReg(
        nameKor,
        nameChn,
        nameEng,
        bizgrpId,
        managerSetMembers,
        userSetMembers,
        pstnSetMembers,
        deptSetMembers,
        dutySetMembers,
        grpSetMembers,
        history,
        projectName,
        projectExplanation,
        authenticationKey,
        visibility,
        replication,
        use,
        setting,
        divion,
      )),
    // new add
    dupCheck: (keywordType, DUP_VAL) => dispatch(actions.dupCheck(keywordType, DUP_VAL)),
    handleLoadingParam: () => dispatch(actions.loadingParam()),
    getDefaultList: () => dispatch(actions.getDefaultList()),
  }
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'ProjectReg', saga });
const withReducer = injectReducer({ key: 'ProjectReg', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectReg);
