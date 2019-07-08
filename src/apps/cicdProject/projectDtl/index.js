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
import * as feed from 'components/Feedback/functions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import StyleProjectDtlForm from './StyleProjectDtlForm';
import StyleProjectDtl from './StyleProjectDtl';
import { BtnDkGray, LinkBtnList, BtnLgtGray } from './buttons.style';

const FormItem = Form.Item;
const { TextArea } = Input;
const Options = Select.Option;
const RadioGroup = Radio.Group;

class ProjectDtl extends React.Component {
  constructor(props) {
    super(props);

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
      visibility: '',
      replication: '',
      use: '',
      modalVisible: false,
      modalMsg: null,
      projectCatgs: '',
      projectNames: props.location.state.PRJ_NM,
      projectExplanations: '',
      visibilitys: '',
      replications: '',
      authenticationKeys: '',
      uses: '',
      settings: 0,
      readOnly: 'true',
      dataDefault: 'D',
    };

    this.props.getProjectDtl(this.state.projectNames);
    this.props.handleLoadingParam();
    this.props.getDefaultList();
    this.setDefault = this.setDefault.bind(this);
  }

  componentDidMount() {
    this.setDefault();
  }

  componentWillReceiveProps(nextProps) {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    if (this.state.readOnly === 'false') return;

    managerSetMembersDefault.push({
    });

    grpSetMembersDefault.push({
    });

    this.setState({
      projectNames: nextProps.projectData.PRJ_NM,
      projectExplanations: nextProps.projectData.PRJ_DESC,
      visibilitys: nextProps.projectData.OPEN_RANGE,
      replications: nextProps.projectData.REPL_ABLE_YN,
      authenticationKeys: nextProps.projectData.AUTH_KEY,
      uses: nextProps.projectData.REDIS_USE_YN,
      settings: nextProps.projectData.REDIS_CAP,
      projectCatgs: nextProps.projectData.PRJ_CATG,
      managerSetMembers: nextProps.projectData.distMemList,
      grpSetMembers: nextProps.projectData.adminMemList,
    });

    if (this.state.dataDefault !== 'D') {
      if (nextProps.updateCheck === 'success') {
        message.success('수정되었습니다.', 2);
      } else {
        message.error('오류입니다.', 2);
      }
    }
  }

  // 데이터 변경 확인
  onChangeName(e, lang) {
    if (this.state.readOnly === 'false') {
      if (lang === 'PROJECT_NAME') {
        this.setState({ PROJECT_NAME: e.target.value });
      } else if (lang === 'PROJECT_EXPLANATION') {
        this.setState({ projectExplanations: e.target.value });
      } else if (lang === 'AUTHENTICATION_KEY') {
        this.setState({ authenticationKeys: e.target.value });
      }
    }
  }

  // 공개설정
  onChangeVisibility = (e) => {
    if (this.state.readOnly === 'false') {
      this.setState({
        visibilitys: e.target.value,
      });
    }
  }

  // 복제허용
  onChangeReplication = (e) => {
    if (this.state.readOnly === 'false') {
      this.setState({
        replications: e.target.value,
      });
    }
  }

  // Redis 사용여부
  onChangeUse = (e) => {
    if (this.state.readOnly === 'false') {
      this.setState({
        uses: e.target.value,
      });
    }
  }

  // Redis 용량설정
  onChangeSetting = (e) => {
    if (this.state.readOnly === 'false') {
      this.setState({
        settings: e.target.value,
      });
    }
  }

  setDefault = () => {
    const managerSetMembersDefault = [];
    const grpSetMembersDefault = [];

    managerSetMembersDefault.push({
    });

    grpSetMembersDefault.push({
    });

    this.setState({
      dataDefault: 'D',
    });
  }

  handleDivionChange = (event) => {
    this.setState({
      divion: event,
    });
  }

  updConfirm = () => {
    if (this.vaildChk()) {
      feed.showConfirm('수정하시겠습니까?', '', this.handleUpdate);
    }
  };

  vaildChk = () => {
    if (this.state.projectExplanations === undefined || this.state.projectExplanations === '') {
      message.error('프로젝트 설명을 입력해주세요.', 2);
      return false;
    } else if (this.state.visibilitys === undefined || this.state.visibilitys === '') {
      message.error('공개설정을 선택해주세요.', 2);
      return false;
    } else if (this.state.replications === undefined || this.state.replications === '') {
      message.error('복제허용을 선택해주세요.', 2);
      return false;
    } else if (this.state.authenticationKeys === undefined || this.state.authenticationKeys === '') {
      message.error('인증키를 입력해주세요.', 2);
      return false;
    } else if (this.state.managerSetMembers === undefined || this.state.managerSetMembers === '') {
      message.error('Distributor를 선택헤주세요.', 2);
      return false;
    } else if (this.state.grpSetMembers === undefined || this.state.grpSetMembers === '') {
      message.error('Administrator를 선택해주세요.', 2);
      return false;
    } else if (this.state.uses === undefined || this.state.uses === '') {
      message.error('Redis 사용여부를 선택해주세요.', 2);
      return false;
    } else if (this.state.settings === undefined || this.state.settings === '') {
      message.error('Redis 용량설정을 선택해주세요.', 2);
      return false;
    }
    return true;
  }

  handleUpdate = () => {
    this.setState({
      readOnly: 'true',
      dataDefault: 'F',
    });

    const { projectUpdate } = this.props;

    const param = {};

    param.PRJ_CATG = this.state.projectCatgs;
    param.PRJ_NM = this.state.projectNames;
    param.PRJ_DESC = this.state.projectExplanations;
    param.OPEN_RANGE = this.state.visibilitys;
    param.REPL_ABLE_YN = this.state.replications;
    param.AUTH_KEY = this.state.authenticationKeys;
    param.REDIS_USE_YN = this.state.uses;
    param.REDIS_CAP = this.state.settings;
    param.MANAGER_SET_MEMBERS = this.state.managerSetMembers;
    param.GRP_SET_MEMBERS = this.state.grpSetMembers;

    projectUpdate(param);
    // this.props.getProjectDtl(this.state.projectNames);
  }

  regSite = () => {
    // 저장 프로세스
    this.props.projectDtl(
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

  render() {
    const {
      defaultBox,
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

    const mngList = (mode) => {
      if (mode === 'true') { // 상세
        return (
          <div className="authorityList">
            <ErrorBoundary>
              <SiteManagerList
                managerList={this.state.managerSetMembers}
                delFlag={false}
                returnManagerList={returnManagerList}
              />
            </ErrorBoundary>
          </div>
        );
      } else if (mode === 'false') { // 수정
        return (
          <div>
            <div className="authorityList">
              <ErrorBoundary>
                <SiteManagerList
                  managerList={this.state.managerSetMembers}
                  delFlag={true}
                  returnManagerList={returnManagerList}
                />
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <button
                className="textLinkBtn"
                onClick={this.allOrgOpen}
              >&lt; 수정
              </button>
            </ErrorBoundary>
          </div>
        );
      }
      return '';
    };

    const memList = (mode) => {
      if (mode === 'true') { // 상세
        return (
          <div className="authorityList">
            <ErrorBoundary>
              <SiteManagerList
                managerList={this.state.grpSetMembers}
                delFlag={false}
                returnManagerList={returnGrpList}
              />
            </ErrorBoundary>
          </div>
        );
      } else if (mode === 'false') { // 수정
        return (
          <div>
            <div className="authorityList">
              <ErrorBoundary>
                <SiteManagerList
                  managerList={this.state.grpSetMembers}
                  delFlag={true}
                  returnManagerList={returnGrpList}
                />
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <button
                className="textLinkBtn"
                onClick={this.allMemOpen}
              >&lt; 수정
              </button>
            </ErrorBoundary>
          </div>
        );
      }
      return '';
    };

    const botBtn = (mode) => {
      if (mode === 'true') { // 상세
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <ErrorBoundary>
                <Link to="/apps/cicdProject/projectList">
                  <LinkBtnList>목록으로</LinkBtnList>
                </Link>
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <div style={{ float: 'right' }}>
                <BtnDkGray onClick={() => {
                  this.setState({
                    readOnly: 'false',
                  });

                  /*
                  * 수정모드로 바뀔 때, 사이트명의 값을 선택하고, 포커스를 준다.
                  * "수정모드로 바뀔 때" 이기 때문에, 상세 모드에서의 "수정"버튼의
                  * Onclick에 넣는다.
                  */
                  // this.nameRef.select();
                  // this.nameRef.focus();
                }}
                >수정
                </BtnDkGray>
              </div>
            </ErrorBoundary>
          </React.Fragment>
        );
      } else if (mode === 'false') { // 수정
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <ErrorBoundary>
                <Link to="/apps/cicdProject/projectList">
                  <LinkBtnList>목록으로</LinkBtnList>
                </Link>
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <div style={{ float: 'right' }}>
                <BtnLgtGray onClick={() => {
                  this.setState({
                    readOnly: 'true',
                    projectExplanations: this.props.projectData.PRJ_DESC,
                    visibilitys: this.props.projectData.OPEN_RANGE,
                    replications: this.props.projectData.REPL_ABLE_YN,
                    authenticationKeys: this.props.projectData.AUTH_KEY,
                    uses: this.props.projectData.REDIS_USE_YN,
                    settings: this.props.projectData.REDIS_CAP,
                    managerSetMembers: this.props.projectData.distMemList,
                    grpSetMembers: this.props.projectData.adminMemList,
                  });
                }
                }
                >취소
                </BtnLgtGray>
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div style={{ float: 'right' }}>
                <BtnDkGray onClick={this.updConfirm}>저장</BtnDkGray>
              </div>
            </ErrorBoundary>
          </React.Fragment>
        );
      }
      return '';
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
          <h2> 프로젝트 상세 </h2>
        </div>
        <div>
          <ErrorBoundary>
            <Organization
              show={this.state.allOrgShow}
              closeModal={this.allOrgClose}
              getDataFromOrganization={getDataFromOrganizationAll}
              selectedUsers={this.state.managerSetMembers.slice()}
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
              selectedUsers={this.state.grpSetMembers.slice()}
              userTab={true}
              pstnTab={true}
              dutyTab={true}
              grpTab={true}
            />
          </ErrorBoundary>
          <StyleProjectDtl>
            <StyleProjectDtlForm className={this.state.readOnly === 'true' ? 'modeD' : ''}>
              <table className="adminTbl siteAdminTbl">
                <tbody>
                  <tr>
                    <th className="required">
                      <label htmlFor="s1">프로젝트 구분</label>
                    </th>
                    <td>
                      <Select
                        defaultValue={defaultBox}
                        value={this.state.projectCatgs}
                        style={{ width: 300 }}
                        notFoundContent="프로젝트 구분을 선택하세요."
                        placeholder="프로젝트 구분을 선택하세요."
                        defaultActiveFirstOption={false}
                        onChange={this.handleDivionChange}
                        disabled={this.state.readOnly === 'true'}
                      >
                        {divionListCombo.map(divionListComboKey => <Options key={divionListComboKey.CODE_CD}>{divionListComboKey.NAME_KOR}</Options>)}
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
                          value={this.state.projectNames}
                          onChange={e => this.onChangeName(e, 'PROJECT_NAME')}
                          id="s1"
                          readOnly="true"
                        // autoFocus // Default로 포커스를 주는 법
                        />
                      </div>
                      {/* {this.state.projectNames}
                      <BtnGray
                        title="중복확인"
                        className="searchBtn"
                        onClick={this.onDupCheckYn}
                      >
                        중복확인
                      </BtnGray> */}
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
                          value={this.state.projectExplanations}
                          onChange={e => this.onChangeName(e, 'PROJECT_EXPLANATION')}
                          readOnly={this.state.readOnly === 'true'}
                        />
                      </ErrorBoundary>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s3">공개설정</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeVisibility} value={this.state.visibilitys} readOnly={this.state.readOnly === 'true'}>
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
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeReplication} value={this.state.replications} readOnly={this.state.readOnly === 'true'}>
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
                          value={this.state.authenticationKeys}
                          onChange={e => this.onChangeName(e, 'AUTHENTICATION_KEY')}
                          readOnly={this.state.readOnly === 'true'}
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
                          {mngList(this.state.readOnly)}
                        </div>
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
                          {memList(this.state.readOnly)}
                        </div>
                      </FormItem>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s8">Redis 사용여부</label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeUse} value={this.state.uses} readOnly={this.state.readOnly === 'true'}>
                        <Radio value="N" name="use">미사용</Radio>
                        <Radio value="Y" name="use">사용</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                  <tr>
                    <th className="required">
                      <label htmlFor="s9">Redis 용량설정 </label>
                    </th>
                    <td>
                      <RadioGroup style={{ padding: 2 }} onChange={this.onChangeSetting} value={this.state.settings} readOnly={this.state.readOnly === 'true'}>
                        <Radio value={2} name="setting">2Gb</Radio>
                        <Radio value={4} name="setting">4Gb</Radio>
                        <Radio value={8} name="setting">8Gb</Radio>
                      </RadioGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td> ※ 위 기준용량 외 추가 용량 필요시 담당자에게 문의 해주세요.<br />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyleProjectDtlForm>
            <div className="buttonWrapper">
              {botBtn(this.state.readOnly)}
            </div>
          </StyleProjectDtl>
          <Modal
            title="확인"
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

ProjectDtl.propTypes = {
  projectDtl: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  getDefaultList: PropTypes.func, //eslint-disable-line
  getDefault: PropTypes.array, //eslint-disable-line
  dupCheck: PropTypes.func.isRequired, //eslint-disable-line
  handleLoadingParam: PropTypes.func.isRequired,
  divionListCombo: PropTypes.array.isRequired,
  getProjectDtl: PropTypes.func, //eslint-disable-line
  projectData: PropTypes.object,
  projectUpdate: PropTypes.func.isRequired,
  location: PropTypes.object, // eslint-disable-line
  updateCheck: PropTypes.string,
  projectUpdateFlag: PropTypes.func.isRequired,
  dataSets: PropTypes.string, // eslint-disable-line
};

ProjectDtl.defaultProps = {
  projectData: null,
  updateCheck: null,
};

// 가져올때
const mapStateToProps = createStructuredSelector({
  projectDtl: selectors.makeProjectDtl(),
  getDefault: selectors.makeDefaultList(),
  dupCheck: selectors.makeDupCheck(),
  dupCheckFlag: selectors.dupCheckFlag(),
  divionListCombo: selectors.makeDivionListCombo(),
  projectData: selectors.projectData(),
  updateCheck: selectors.updateCheck(),
});

// 내보낼때
const mapDispatchToProps = dispatch => (
  {
    projectDtl: (
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
      // divion,
    ) =>
      dispatch(actions.projectDtl(
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
        // divion,
      )),
    // new add
    dupCheck: (keywordType, DUP_VAL) => dispatch(actions.dupCheck(keywordType, DUP_VAL)),
    handleLoadingParam: () => dispatch(actions.loadingParam()),
    getDefaultList: () => dispatch(actions.getDefaultList()),
    // loading 시 data get
    getProjectDtl: param => dispatch(actions.getProjectDtl(param)),
    projectUpdate: param => dispatch(actions.projectUpdate(param)),
    projectUpdateFlag: param => dispatch(actions.projectUpdateFlag(param)),
  }
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'ProjectDtl', saga });
const withReducer = injectReducer({ key: 'ProjectDtl', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectDtl);
