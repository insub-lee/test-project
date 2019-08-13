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
import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import { BtnLgtGrayCircle, BtnGray, BtnDkGray, LinkBtnList } from './buttons.style';

import messages from '../messages';

import StyleServiceForm from './StyleServiceForm.js';
import StyleServiceDtl from './StyleServiceDtl.js';

const Options = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class ServiceReg extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      projectName: 'project1',
      serviceName: null,
      serviceDesc: null,
      devSetMembers: [], // 구성원
      // grpSetMembers: [], // 가상그룹
      cpus: 0,
      memory: 0,
      instances: 0,
      disk: 0,
      allOrgShow: false,
      modalVisible: false,
      modalMsg: null,
    };
  }

  componentDidMount() {
    // this.setDefault();
  }

  componentWillReceiveProps(nextProps) {
    console.log('=======  componentWillReceiveProps   ===========');
    console.log(nextProps.dupCheck);
    console.log(nextProps.saveCheck);
    if (nextProps.dupCheck !== null) {
      this.setState({
        modalMsg: nextProps.dupCheck === 'Y' ? '중복된 서비스명입니다.' : '사용가능한 서비스명입니다.',
      });
    }

    if (nextProps.saveCheck !== null) {
      const msg = `서비스가 생성되었습니다.
                  서비스명 : ${this.state.serviceName}
                  서비스 개요 : ${this.state.serviceDesc}`;

      this.setState({
        modalMsg: nextProps.saveCheck === 'success' ? msg : `${intlObj.get(messages.regFail)}`,
      });
    }
  }

  componentDidUpdate() {
    console.log('========   componentDidUpdate   ========');
    console.log(this.props.dupCheck);
    console.log(this.props.saveCheck);
    if (this.props.dupCheck !== null) {
      this.handleShowModal();
    }

    if (this.props.saveCheck !== null) {
      this.handleShowModal();
    }
  }

  // setDefault = () => {
  //   const devSetMembersDefault = [];

  //   devSetMembersDefault.push({
  //     // USER_ID: '20284',
  //     EMP_NO: '2003351',
  //   });
  //   console.log('@@@@@@@@@@@@@@@@@@@');
  //   this.setState({
  //     devSetMembers: devSetMembersDefault,
  //   });
  // }

  handleDupCheck = () => {
    const { serviceDupChk } = this.props;
    const param = {};
    param.PRJ_NM = this.state.projectName;
    param.SRV_NM = this.state.serviceName;

    serviceDupChk(param);
  }

  handleSaveConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.regConfirm)}`, '', this.handleSave);
  }

  handleSave = () => {
    const { serviceSave } = this.props;

    const param = {};
    param.PRJ_NM = this.state.projectName;
    param.SRV_NM = this.state.serviceName;
    param.SRV_DESC = this.state.serviceDesc;
    param.CPUS = this.state.cpus;
    param.MEM = this.state.memory;
    param.INSTANCES = this.state.instances;
    param.DISK = this.state.disk;
    param.devMember = this.state.devSetMembers;

    serviceSave(param);
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
      serviceName: this.props.dupCheck === 'Y' ? null : this.state.serviceName,
    });

    const { serviceDupChkValChg } = this.props;
    serviceDupChkValChg({
      dupCheck: null,
    });

    const { serviceSaveFlag } = this.props;
    serviceSaveFlag({
      saveCheck: null,
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

    return (
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
        <StyleServiceDtl>
          <h3 className="pageTitle regist"><b>서비스 생성</b></h3>
          <StyleServiceForm>
            <table className="adminTbl siteAdminTbl">
              <tbody>
                <tr>
                  <th> 서비스명 </th>
                  <td>
                    <Input onChange={this.handleServiceNameChange} value={this.state.serviceName} />
                    <BtnGray
                      title="중복확인"
                      className="searchBtn"
                      onClick={this.handleDupCheck}
                    >
                      중복확인
                    </BtnGray>
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
                      autoFocus // Default로 포커스를 주는 법
                      onChange={this.handleServiceDescChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th> Developer </th>
                  <td>
                    <FormItem {...formItemLayout}>
                      <div className="authorityList">
                        {/* // 리턴 뷰 사용 */}
                        <ErrorBoundary>
                          <SiteManagerList
                            userList={this.state.devSetMembers}
                            delFlag={true}
                            returnUserList={returnUserList}
                          />
                        </ErrorBoundary>
                      </div>
                      <button onClick={this.allOrgOpen} className="textLinkBtn">&lt; {intlObj.get(messages.lblEdit)}</button>
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
                      defaultValue={this.state.cpus}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleCpusChange}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>Memory <br />
                    <Select
                      defaultValue={this.state.memory}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleMemoryChange}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>INSTANCES <br />
                    <Select
                      defaultValue={this.state.instances}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleInstancesChange}
                    >
                      {<Options key="1">1</Options>}
                      {<Options key="2">2</Options>}
                      {<Options key="3">3</Options>}
                      {<Options key="4">4</Options>}
                    </Select>
                  </td>
                  <td>DISK <br />
                    <Select
                      defaultValue={this.state.disk}
                      style={{ width: 150 }}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      onChange={this.handleDiskChange}
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
            <div style={{ float: 'left' }}>
              <ErrorBoundary>
                <Link to="/apps/cicdService/serviceList">
                  <LinkBtnList>{intlObj.get(messages.lblList)}</LinkBtnList>
                </Link>
              </ErrorBoundary>
            </div>
            <BtnDkGray onClick={this.handleSaveConfirm}>{intlObj.get(messages.lblReg)}</BtnDkGray>
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

ServiceReg.propTypes = {
  serviceDupChk: PropTypes.func.isRequired,
  serviceDupChkValChg: PropTypes.func.isRequired,
  serviceSave: PropTypes.func.isRequired,
  serviceSaveFlag: PropTypes.func.isRequired,
  dupCheck: PropTypes.string,
  saveCheck: PropTypes.string,
  getDefault: PropTypes.array, //eslint-disable-line
};

ServiceReg.defaultProps = {
  dupCheck: null,
  saveCheck: null,
};

const mapStateToProps = createStructuredSelector({
  dupCheck: selectors.dupCheck(),
  saveCheck: selectors.saveCheck(),
});

export function mapDispatchToProps(dispatch) {
  return {
    serviceDupChk: param => dispatch(actions.serviceDupChk(param)),
    serviceDupChkValChg: param => dispatch(actions.serviceDupChkValChg(param)),
    serviceSave: param => dispatch(actions.serviceSave(param)),
    serviceSaveFlag: param => dispatch(actions.serviceSaveFlag(param)),
  };
}

const withReducer = injectReducer({ key: 'cicdServiceReg', reducer });
const withSaga = injectSaga({ key: 'cicdServiceReg', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ServiceReg);
