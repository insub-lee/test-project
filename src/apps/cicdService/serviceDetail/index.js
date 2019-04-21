import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Form, Input, Select, Checkbox, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Organization from 'containers/portal/components/Organization';

import SiteManagerList from 'components/OrgReturnView';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import { intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import { BtnLgtGrayCircle, BtnGray, BtnDkGray, LinkBtnList, BtnDelete, BtnLgtGray } from './buttons.style';

import messages from '../messages';

import StyleServiceForm from './StyleServiceForm.js';
import StyleServiceDtl from './StyleServiceDtl.js';

const Options = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class ServiceDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      projectName: props.location.state.PRJ_NM,
      serviceName: props.location.state.SRV_NM,
      serviceDesc: null,
      readOnly: 'true',
      devSetMembers: [], // 구성원
      cpus: 0,
      memory: 0,
      instances: 0,
      disk: 0,
      allOrgShow: false,
      modalVisible: false,
      modalMsg: null,
    };

    const param = {};
    param.PRJ_NM = this.state.projectName;
    param.SRV_NM = this.state.serviceName;
    this.props.serviceInfo(param);
  }

  componentDidMount() {
    // this.setDefault();
  }

  // componentWillReceiveProps(nextProps) {
  //   const devSetMembersDefault = [];
  //   // const grpSetMembersDefault = [];

  //   devSetMembersDefault.push({
  //     USER_ID: nextProps.getDefault.USER_ID,
  //     EMP_NO: nextProps.getDefault.EMP_NO,
  //     NAME_KOR: nextProps.getDefault.NAME_KOR,
  //     NAME_ENG: nextProps.getDefault.NAME_ENG,
  //     NAME_CHN: nextProps.getDefault.NAME_CHN,
  //     NAME_JPN: nextProps.getDefault.NAME_JPN,
  //     NAME_ETC: nextProps.getDefault.NAME_ETC,
  //     DEPT_NAME_KOR: nextProps.getDefault.DEPT_NAME_KOR,
  //     DEPT_NAME_ENG: nextProps.getDefault.DEPT_NAME_ENG,
  //     DEPT_NAME_CHN: nextProps.getDefault.DEPT_NAME_CHN,
  //     DEPT_NAME_JPN: nextProps.getDefault.DEPT_NAME_JPN,
  //     DEPT_NAME_ETC: nextProps.getDefault.DEPT_NAME_ETC,
  //     PSTN_NAME_KOR: nextProps.getDefault.PSTN_NAME_KOR,
  //     PSTN_NAME_ENG: nextProps.getDefault.PSTN_NAME_ENG,
  //     PSTN_NAME_CHN: nextProps.getDefault.PSTN_NAME_CHN,
  //     PSTN_NAME_JPN: nextProps.getDefault.PSTN_NAME_JPN,
  //     PSTN_NAME_ETC: nextProps.getDefault.PSTN_NAME_ETC,
  //     DUTY_NAME_KOR: nextProps.getDefault.DUTY_NAME_KOR,
  //     DUTY_NAME_ENG: nextProps.getDefault.DUTY_NAME_ENG,
  //     DUTY_NAME_CHN: nextProps.getDefault.DUTY_NAME_CHN,
  //     DUTY_NAME_JPN: nextProps.getDefault.DUTY_NAME_JPN,
  //     DUTY_NAME_ETC: nextProps.getDefault.DUTY_NAME_ETC,
  //   });

  //   // grpSetMembersDefault.push({
  //   //   id: '100',
  //   //   title: '기본정보/그룹원추가',
  //   //   NAME_KOR: '강지명',
  //   //   ACNT_TYPE: 'V',
  //   // });

  //   this.setState({
  //     devSetMembers: devSetMembersDefault,
  //     // grpSetMembers: grpSetMembersDefault,
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateCheck !== null) {
      this.setState({
        modalMsg: nextProps.updateCheck === 'success' ? `${intlObj.get(messages.udtComplete)}` : `${intlObj.get(messages.udtFail)}`,
      });
    }

    if (this.state.readOnly === 'false') return;

    this.setState({
      projectName: nextProps.serviceData.PRJ_NM,
      serviceName: nextProps.serviceData.SRV_NM,
      serviceDesc: nextProps.serviceData.SRV_DESC,
      devSetMembers: nextProps.serviceData.devMemberList,
      cpus: nextProps.serviceData.CPUS,
      memory: nextProps.serviceData.MEM,
      instances: nextProps.serviceData.INSTANCES,
      disk: nextProps.serviceData.DISK,
    });
  }

  componentDidUpdate() {
    if (this.props.updateCheck !== null) {
      this.handleShowModal();
    }
  }

  // setDefault = () => {
  //   const devSetMembersDefault = [];
  //   // const grpSetMembersDefault = [];

  //   // devSetMembersDefault.push({
  //   //   USER_ID: 51181,
  //   //   EMP_NO: 'X0101006',
  //   //   NAME_KOR: '이용혁',
  //   //   NAME_ENG: '이용혁',
  //   //   // NAME_CHN: '',
  //   //   // NAME_JPN: '',
  //   //   // NAME_ETC: '',
  //   //   // DEPT_NAME_KOR: '',
  //   //   // DEPT_NAME_ENG: '',
  //   //   // DEPT_NAME_CHN: '',
  //   //   // DEPT_NAME_JPN: this.props.getDefault.DEPT_NAME_JPN,
  //   //   // DEPT_NAME_ETC: this.props.getDefault.DEPT_NAME_ETC,
  //   //   // PSTN_NAME_KOR: this.props.getDefault.PSTN_NAME_KOR,
  //   //   // PSTN_NAME_ENG: this.props.getDefault.PSTN_NAME_ENG,
  //   //   // PSTN_NAME_CHN: this.props.getDefault.PSTN_NAME_CHN,
  //   //   // PSTN_NAME_JPN: this.props.getDefault.PSTN_NAME_JPN,
  //   //   // PSTN_NAME_ETC: this.props.getDefault.PSTN_NAME_ETC,
  //   //   // DUTY_NAME_KOR: this.props.getDefault.DUTY_NAME_KOR,
  //   //   // DUTY_NAME_ENG: this.props.getDefault.DUTY_NAME_ENG,
  //   //   // DUTY_NAME_CHN: this.props.getDefault.DUTY_NAME_CHN,
  //   //   // DUTY_NAME_JPN: this.props.getDefault.DUTY_NAME_JPN,
  //   //   // DUTY_NAME_ETC: this.props.getDefault.DUTY_NAME_ETC,
  //   // });

  //   // grpSetMembersDefault.push({
  //   //   id: '100',
  //   //   title: '기본정보/그룹원추가',
  //   //   NAME_KOR: '강지명',
  //   //   ACNT_TYPE: 'V',
  //   // });

  //   this.setState({
  //     devSetMembers: devSetMembersDefault,
  //     // grpSetMembers: grpSetMembersDefault,
  //   });
  // }

  udtConfirm = () => {
    // if (this.vaildChk()) {
    //   feed.showConfirm(`${intlObj.get(messages.udtConfirm)}`, '', this.updateRow);
    // }
    feed.showConfirm(`${intlObj.get(messages.udtConfirm)}`, '', this.handleUpdate);
  };

  handleUpdate = () => {
    const { serviceUpdate } = this.props;

    const param = {};
    param.PRJ_NM = this.state.projectName;
    param.SRV_NM = this.state.serviceName;
    param.SRV_DESC = this.state.serviceDesc;
    param.CPUS = this.state.cpus;
    param.MEM = this.state.memory;
    param.INSTANCES = this.state.instances;
    param.DISK = this.state.disk;
    param.devMember = this.state.devSetMembers;

    serviceUpdate(param);
  }

  handleServiceNameChange = (e) => {
    this.setState({
      serviceName: e.target.value,
    });
  }

  handleServiceDescChange = (e) => {
    this.setState({
      serviceDesc: e.target.value,
    });
  }

  handleCpusChange = (value) => {
    this.setState({
      cpus: value,
    });
  }

  handleMemoryChange = (value) => {
    this.setState({
      memory: value,
    });
  }

  handleInstancesChange = (value) => {
    this.setState({
      instances: value,
    });
  }

  handleDiskChange = (value) => {
    this.setState({
      disk: value,
    });
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

  handleShowModal = () => {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalOk = () => {
    // feed.showConfirm('생성하시겠습니까?', '', this.handleSave);
    this.setState({
      modalVisible: false,
    });

    const { serviceUpdateFlag } = this.props;
    serviceUpdateFlag({
      updateCheck: null,
    });
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

    const returnUserList = (resultObj) => {
      this.setState({
        devSetMembers: resultObj,
      });
    };

    // 조직도로부터 데이터 가져오는 함수
    const getDataFromOrganizationAll = (resultObj) => {
      // 구성원
      const devSetMembersFromOrganization = resultObj.selectedUsers;

      this.setState({
        devSetMembers: devSetMembersFromOrganization, // 구성원
      });
    };

    const mngList = (mode) => {
      if (mode === 'true') { // 상세
        return (
          <div className="authorityList">
            <ErrorBoundary>
              <SiteManagerList
                isDeptSelectbox={true}
                managerList={this.state.devSetMembers}
                delFlag={false}
                returnManagerList={returnUserList}
                siteIdParam={this.state.siteParam}
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
                  isDeptSelectbox={true}
                  managerList={this.state.devSetMembers}
                  delFlag={true}
                  returnManagerList={returnUserList}
                  siteIdParam={this.state.siteParam}
                />
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <button
                className="textLinkBtn"
                onClick={this.allOrgOpen}
              >&lt; {intlObj.get(messages.lblEdit)}
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
                <BtnDelete onClick={this.delConfirm}>{intlObj.get(messages.lblDelete)}</BtnDelete>
                <Link to="/apps/cicdService/serviceList" style={{ marginLeft: 23 }}>
                  <LinkBtnList>{intlObj.get(messages.lblList)}</LinkBtnList>
                </Link>
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <BtnDkGray onClick={() => {
                // const tempVal = {
                //   tmpNameKor: this.state.NAME_KOR,
                //   tmpNameEng: this.state.NAME_ENG,
                //   tmpNameChn: this.state.NAME_CHN,
                //   tmpUrl: this.state.URL,
                //   tmpBizGrp: this.state.BIZGRP_ID,
                //   tmpTheme: this.state.THEME_CD,
                //   tmpManagerSetMembers: this.state.managerSetMembers,
                //   tmpUserSetMembersTheme: this.state.userSetMembers,
                //   tmpPstnSetMembersTheme: this.state.pstnSetMembers,
                //   tmpDeptSetMembersTheme: this.state.deptSetMembers,
                //   tmpDutySetMembersTheme: this.state.dutySetMembers,
                //   tmpGrpSetMembersTheme: this.state.grpSetMembers,
                // };

                this.setState({
                  readOnly: 'false',
                  // orgVal: tempVal,
                  // URL: this.state.URL.replace('http://', '').replace('.skhynix.com/', ''),
                  // nameValid: true,
                  // urlValid: true,
                });

                /*
                 * 수정모드로 바뀔 때, 사이트명의 값을 선택하고, 포커스를 준다.
                 * "수정모드로 바뀔 때" 이기 때문에, 상세 모드에서의 "수정"버튼의
                 * Onclick에 넣는다.
                 */
                // this.nameRef.select();
                // this.nameRef.focus();
                }}
              >{intlObj.get(messages.lblUdt)}
              </BtnDkGray>
            </ErrorBoundary>
          </React.Fragment>
        );
      } else if (mode === 'false') { // 수정
        return (
          <React.Fragment>
            <div style={{ float: 'left' }}>
              <ErrorBoundary>
                <Link to="/apps/cicdService/serviceList">
                  <LinkBtnList>{intlObj.get(messages.lblList)}</LinkBtnList>
                </Link>
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <BtnLgtGray onClick={() => {
                // this.nameRef.blur();
                this.setState({
                  readOnly: 'true',
                  // NAME_KOR: this.state.orgVal.tmpNameKor,
                  // NAME_ENG: this.state.orgVal.tmpNameEng,
                  // NAME_CHN: this.state.orgVal.tmpNameChn,
                  // URL: this.state.orgVal.tmpUrl,
                  // BIZGRP_ID: this.state.orgVal.tmpBizGrp,
                  // THEME_CD: this.state.orgVal.tmpTheme,
                  // managerSetMembers: this.state.orgVal.tmpManagerSetMembers,
                  // userSetMembers: this.state.orgVal.tmpUserSetMembersTheme,
                  // pstnSetMembers: this.state.orgVal.tmpPstnSetMembersTheme,
                  // deptSetMembers: this.state.orgVal.tmpDeptSetMembersTheme,
                  // dutySetMembers: this.state.orgVal.tmpDutySetMembersTheme,
                  // grpSetMembers: this.state.orgVal.tmpGrpSetMembersTheme,
                });
              }
            }
              >{intlObj.get(messages.lblCancel)}
              </BtnLgtGray>
            </ErrorBoundary>
            <ErrorBoundary>
              <BtnDkGray onClick={this.udtConfirm}>{intlObj.get(messages.lblSave)}</BtnDkGray>
            </ErrorBoundary>
          </React.Fragment>
        );
      }
      return '';
    };

    return (
      <div>
        <ErrorBoundary>
          <Organization
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
            selectedUsers={this.state.devSetMembers.slice()}
          />
        </ErrorBoundary>
        <StyleServiceDtl>
          <h3 className="pageTitle regist"><b>서비스 생성</b></h3>
          <StyleServiceForm className={this.state.readOnly === 'true' ? 'modeD' : ''}>
            <table className="adminTbl siteAdminTbl">
              <tbody>
                <tr>
                  <th> 서비스명 </th>
                  <td>
                    {this.state.serviceName}
                  </td>
                </tr>
                <tr>
                  <th> 서비스 개요 </th>
                  <td>
                    <TextArea
                      placeholder="서비스 개요"
                      title="NAME_CHN"
                      maxLength="200"
                      id="s1"
                      value={this.state.serviceDesc}
                      autoFocus // Default로 포커스를 주는 법
                      onChange={this.handleServiceDescChange}
                      readOnly={this.state.readOnly === 'true'}
                    />
                  </td>
                </tr>
                <tr>
                  <th> Developer </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <div className="authorityList">
                        {/* // 리턴 뷰 사용 */}
                        {mngList(this.state.readOnly)}
                      </div>
                    </FormItem>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <br />
          <h3 className="pageTitle regist"><b>설치 Application</b></h3>
          <StyleServiceForm>
            <div>
              ※ Git / Jenkins / Nexus 는 기본으로 설치되어 있습니다. <br />
              사용하실 이미지를 선택하시거나 아래 설치할 항목을 선택하세요.
            </div>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td>
                    <BtnLgtGrayCircle
                      title=""
                      className="searchBtn"
                    >
                      JDK1.4
                      Maven 1.3
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title=""
                      className="searchBtn"
                    >
                      JDK1.4
                      Maven 1.3
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="NodeJS"
                      className="searchBtn"
                    >
                      JDK1.4
                      Maven 1.3
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="JDK"
                      className="searchBtn"
                    >
                      JDK1.4
                      Maven 1.3
                    </BtnLgtGrayCircle>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div>
              별도 환경 구성을 원하시는 경우 Custom 버튼을 클릭하여 설치하실 항목을 선태갛여 주세요.
              <BtnGray
                title="중복확인"
                className="searchBtn"
              >
                Customize
              </BtnGray>
            </div>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td> Build tool </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="maven"
                      className="searchBtn"
                    >
                      maven
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="python"
                      className="searchBtn"
                    >
                      python
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="NodeJS"
                      className="searchBtn"
                    >
                      NodeJS
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="JDK"
                      className="searchBtn"
                    >
                      JDK
                    </BtnLgtGrayCircle>
                  </td>
                </tr>
                <tr>
                  <td> application </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="apache"
                      className="searchBtn"
                    >
                      apache
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="tomcat"
                      className="searchBtn"
                    >
                      tomcat
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="nginX"
                      className="searchBtn"
                    >
                      nginX
                    </BtnLgtGrayCircle>
                  </td>
                  <td>
                    <BtnLgtGrayCircle
                      title="weblogic"
                      className="searchBtn"
                    >
                      weblogic
                    </BtnLgtGrayCircle>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <br />
          <h3 className="pageTitle regist"><b>Service</b></h3>
          <StyleServiceForm>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td>CPUs <br />
                    <Select
                      value={this.state.cpus}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleCpusChange}
                      disabled={this.state.readOnly === 'true'}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>Memory <br />
                    <Select
                      value={this.state.memory}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleMemoryChange}
                      disabled={this.state.readOnly === 'true'}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>INSTANCES <br />
                    <Select
                      value={this.state.instances}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleInstancesChange}
                      disabled={this.state.readOnly === 'true'}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>DISK <br />
                    <Select
                      value={this.state.disk}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleDiskChange}
                      disabled={this.state.readOnly === 'true'}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <br />
          <h3 className="pageTitle regist"><b>Network</b></h3>
          <StyleServiceForm>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td>Service port <br />
                    <Input placeholder="서비스 포트 입력란" />
                  </td>
                  <td>Service port name <br />
                    <Input placeholder="서비스 포트명 입력란" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2"><br />
                    도메인 사용 <Checkbox />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <br />
          <h3 className="pageTitle regist"><b>Disk</b></h3>
          <StyleServiceForm>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td>Disk path (NAS) <br />
                    <Input placeholder="서비스 포트 입력란" readOnly="D" />
                  </td>
                  <td>Service path <br />
                    <Input placeholder="서비스 포트명 입력란" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2"><br />
                    도메인 사용 <Checkbox />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <br />
          <h3 className="pageTitle regist"><b>Health checks</b></h3>
          <StyleServiceForm>
            <table width="100%" className="siteAdminTbl">
              <tbody>
                <tr>
                  <td>Service Port name <br />
                    <Input placeholder="서비스 포트명" />
                  </td>
                  <td>path <br />
                    <Input placeholder="/" />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyleServiceForm>
          <div className="buttonWrapper">
            {botBtn(this.state.readOnly)}
          </div>
        </StyleServiceDtl>
        <Modal
          title="확인"
          visible={this.state.modalVisible}
          onOk={this.handleModalOk}
          okText="확인"
          footer={[
            '',
            <BtnGray onClick={this.handleModalOk}>확인</BtnGray>,
          ]}
        >
          <p>{this.state.modalMsg}</p>
        </Modal>
      </div>
    );
  }
}

ServiceDetail.propTypes = {
  serviceInfo: PropTypes.func.isRequired,
  serviceUpdate: PropTypes.func.isRequired,
  serviceUpdateFlag: PropTypes.func.isRequired,
  serviceData: PropTypes.object,
  updateCheck: PropTypes.string,
  getDefault: PropTypes.array, //eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
};

ServiceDetail.defaultProps = {
  serviceData: null,
  updateCheck: null,
};

const mapStateToProps = createStructuredSelector({
  serviceData: selectors.serviceData(),
  updateCheck: selectors.updateCheckVal(),
});

export function mapDispatchToProps(dispatch) {
  return {
    serviceInfo: param => dispatch(actions.serviceInfo(param)),
    serviceUpdate: param => dispatch(actions.serviceUpdate(param)),
    serviceUpdateFlag: param => dispatch(actions.serviceUpdateFlag(param)),
  };
}

const withReducer = injectReducer({ key: 'cicdServiceDetail', reducer });
const withSaga = injectSaga({ key: 'cicdServiceDetail', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(ServiceDetail);

