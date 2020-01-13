import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Divider, Form, Input, Button, Select, Checkbox, Radio } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Organization from 'containers/portal/components/Organization';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import Wrapper from './Wrapper';
import SignLine from './SignLine';
import SignLineConfirmModal from './SignLineConfirmModal';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const optionList = [
  {
    label: '문서변경',
    value: 1,
  },
  {
    label: '권한위임',
    value: 2,
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const createStepUsersName = (item, stepType) => {
  let str = '';
  if (stepType === 'U') {
    str = `${item.NAME_KOR} ${item.PSTN_NAME_KOR};`;
  } else {
    str = `${item.NAME_KOR};`;
  }
  return str;
};

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepInfo: {},
      isAgree: false,
      stepUsers: [],
      stepUsersName: '',
      allOrgShow: false,
      userSetMembers: [],
      pstnSetMembers: [],
      deptSetMembers: [],
      dutySetMembers: [],
      grpSetMembers: [],
      activeStep: -1,
    };

    this.prcNameRef = React.createRef();
  }

  componentDidMount() {
    const { prcId, getProcessData } = this.props;
    if (prcId !== -1) {
      const payload = { prcId };
      getProcessData(payload);
    }
  }

  componentWillUnmount() {
    this.props.initProcessData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.processInfo.PRC_ID !== this.props.processInfo.PRC_ID) {
      this.props.processCallbackFunc(this.props.processInfo.PRC_ID);
    }
  }

  onDragEnd = (dropResult) => {
    if (!dropResult.destination) {
      return;
    }

    const { source, destination } = dropResult;
    const { processStep, setProcessStep } = this.props;
    setProcessStep(reorder(processStep, source.index, destination.index).map((item, index) => ({ ...item, STEP: index + 1 })));
    this.initStepData();
  };

  removeItem = (itemIdx) => {
    const { processStep, setProcessStep } = this.props;
    processStep.splice(itemIdx, 1);
    setProcessStep(processStep.map((item, index) => ({ ...item, STEP: index + 1 })));
    this.initStepData();
  };

  changeGubun = (val) => {
    const isAgree = val === '2' || val === '3';
    this.setState({ isAgree });
  };

  // onAdd = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (err) {
  //       return;
  //     }

  //     const { processInfo, processStep, setProcessStep } = this.props;
  //     if (processStep.filter(item => item.STEP === Number(values.step)).length === 0) {
  //       const info = {
  //         PRC_ID: processInfo.PRC_ID,
  //         STEP: Number(values.step),
  //         STEP_TYPE: values.stepType,
  //         GUBUN: Number(values.gubun),
  //         STEP_USERS: this.state.stepUsers,
  //         stepUsersName: this.state.stepUsersName,
  //         APPV_AUTH: values.appvAuth,
  //         AGREE_TYPE: values.agreeType === undefined ? '' : values.agreeType,
  //       };
  //       processStep.push(info);
  //       setProcessStep(processStep);
  //       this.initStepData();
  //     }
  //   });
  // };

  onAddStep = (e) => {
    e.preventDefault();
    const { processInfo, processStep, setProcessStep } = this.props;
    const info = {
      PRC_ID: processInfo.PRC_ID,
      STEP: processStep.length + 1,
      STEP_TYPE: 'U',
      GUBUN: 1,
      STEP_USERS: [],
      stepUsersName: '',
      APPV_AUTH: [],
      AGREE_TYPE: '',
    };
    processStep.push(info);
    setProcessStep(processStep);
  };

  // 초기화
  initStepData = () => {
    this.props.form.resetFields();
    this.setState({
      stepInfo: {},
      isAgree: false,
      stepUsers: [],
      stepUsersName: '',
      userSetMembers: [],
      pstnSetMembers: [],
      deptSetMembers: [],
      dutySetMembers: [],
      grpSetMembers: [],
      activeStep: -1,
    });
  };

  // 적용
  applyStepInfo = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const { changeStepInfo } = this.props;
      const { stepInfo } = this.state;
      const info = {
        ...stepInfo,
        STEP_TYPE: values.stepType,
        GUBUN: Number(values.gubun),
        STEP_USERS: this.state.stepUsers,
        stepUsersName: this.state.stepUsersName,
        APPV_AUTH: values.appvAuth,
        AGREE_TYPE: values.agreeType === undefined ? '' : values.agreeType,
      };
      changeStepInfo(info);
      this.initStepData();
    });
  };

  // 조직도 관련
  openOrganizationPopup = () => {
    this.setState({ allOrgShow: true });
  };

  allOrgClose = () => {
    this.setState({ allOrgShow: false });
  };

  // 조직도로부터 데이터 가져오는 함수
  getDataFromOrganizationAll = (resultObj) => {
    const stepUsers = [];

    let stepUsersName = '';
    resultObj.selectedUsers.forEach((item) => {
      stepUsersName += createStepUsersName(item, 'U');
      stepUsers.push({ ...item, ID: item.USER_ID });
    });
    resultObj.checkedPstn.forEach((item) => {
      stepUsersName += createStepUsersName(item, 'P');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDept.forEach((item) => {
      stepUsersName += createStepUsersName(item, 'D');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDuty.forEach((item) => {
      stepUsersName += createStepUsersName(item, 'T');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedGrp.forEach((item) => {
      stepUsersName += createStepUsersName(item, 'V');
      stepUsers.push({ ...item, ID: item.id });
    });

    this.setState({
      userSetMembers: resultObj.selectedUsers,
      pstnSetMembers: resultObj.checkedPstn,
      deptSetMembers: resultObj.checkedDept,
      dutySetMembers: resultObj.checkedDuty,
      grpSetMembers: resultObj.checkedGrp,
      stepUsers,
      stepUsersName,
    });
  };

  onConfirm = (e, btnAction) => {
    e.preventDefault();
    const { processInfo, setProcessInfo, setModalVisible } = this.props;
    const prcName = this.props.form.getFieldValue('prcName');

    if (prcName === undefined || prcName === '') {
      window.alert('결재선명을 입력해주세요');
      return;
    }
    setProcessInfo({ ...processInfo, NAME_KOR: prcName });
    setModalVisible(true);
  };

  onSaveProcess = (e) => {
    e.preventDefault();
    const { processStep, saveProcessInfo, setSpinning } = this.props;

    const prcName = this.props.form.getFieldValue('prcName');

    // if (prcName === undefined || prcName === '') {
    //   window.alert('결재선명을 입력해주세요');
    //   return;
    // }

    const prcData = {
      NAME_KOR: prcName,
      prcStep: processStep.map(item => ({
        ...item,
        STEP_USERS: item.STEP_USERS.map(step => step.ID),
      })),
    };
    setSpinning(true);
    saveProcessInfo(prcData);
  };

  onUpdateProcess = (e) => {
    e.preventDefault();
    const {
      processInfo, processStep, updateProcessInfo, setSpinning,
    } = this.props;
    const prcName = this.props.form.getFieldValue('prcName');
    const prcData = {
      PRC_ID: processInfo.PRC_ID,
      NAME_KOR: prcName,
      prcStep: processStep.map(item => ({
        ...item,
        STEP_USERS: item.STEP_USERS.map(step => step.ID),
      })),
    };
    setSpinning(true);
    updateProcessInfo(prcData);
  };

  onDeleteProcess = (e) => {
    e.preventDefault();
    const { processInfo, deleteProcessInfo } = this.props;
    const prcData = {
      PRC_ID: processInfo.PRC_ID,
    };
    deleteProcessInfo(prcData);
  };

  onActiveStep = (stepInfo) => {
    this.setState((prevState) => {
      const { activeStep } = prevState;
      const isDupStep = activeStep === stepInfo.STEP;
      return {
        activeStep: isDupStep ? -1 : stepInfo.STEP,
        stepInfo: isDupStep ? {} : stepInfo,
        isAgree: isDupStep ? false : stepInfo.STEP_TYPE === 2 || stepInfo.STEP_TYPE === 3,
        stepUsersName: stepInfo.stepUsersName,
        userSetMembers: stepInfo.STEP_TYPE === 'U' ? stepInfo.STEP_USERS : [],
        pstnSetMembers: stepInfo.STEP_TYPE === 'P' ? stepInfo.STEP_USERS : [],
        deptSetMembers: stepInfo.STEP_TYPE === 'D' ? stepInfo.STEP_USERS : [],
        dutySetMembers: stepInfo.STEP_TYPE === 'T' ? stepInfo.STEP_USERS : [],
        grpSetMembers: stepInfo.STEP_TYPE === 'V' ? stepInfo.STEP_USERS : [],
      };
    });
  };

  modalCloseHandler = () => {
    this.props.setModalVisible(false);
  };

  render() {
    const {
      stepInfo, isAgree, stepUsersName, activeStep,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      prcId, processInfo, processStep, processCallbackFunc, modalVisible, spinning, setSpinning,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 28 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const isStepInfo = Object.prototype.hasOwnProperty.call(stepInfo, 'STEP');

    return (
      <Wrapper>
        <Organization
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
        />
        <SignLineConfirmModal
          visible={modalVisible}
          processInfo={processInfo}
          processStep={processStep}
          saveProcessInfo={this.onSaveProcess}
          updateProcessInfo={this.onUpdateProcess}
          closeHandler={this.modalCloseHandler}
          spinning={spinning}
          setSpinning={spinning}
        />
        <Row>
          <Col span={24}>
            <Form {...formItemLayout} onSubmit={this.onAdd}>
              <Row>
                <Col span={14}>
                  <Form.Item>
                    {getFieldDecorator('prcName', {
                      initialValue: processInfo.NAME_KOR,
                    })(<Input placeholder="결재선명을 입력해 주세요." />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col span={10}>
                  <SignLine
                    processStep={processStep}
                    activeStep={activeStep}
                    action={{
                      removeItem: this.removeItem,
                      onActiveStep: this.onActiveStep,
                      onAddStep: this.onAddStep,
                      onDragEnd: this.onDragEnd,
                    }}
                  />
                </Col>
                <Col span={14}>
                  <div className="content-body">
                    <Divider orientation="left">단계정보 설정</Divider>
                    <Form.Item label="단계">
                      {getFieldDecorator('step', {
                        initialValue: stepInfo.STEP,
                      })(<Input style={{ width: 100 }} readOnly />)}
                    </Form.Item>
                    <Form.Item label="유형">
                      {getFieldDecorator('stepType', {
                        initialValue: stepInfo.STEP_TYPE,
                      })(<Select style={{ width: 120 }}>
                        <Option value="U">사용자</Option>
                        <Option value="D">부서</Option>
                        <Option value="V">그룹</Option>
                      </Select>)}
                    </Form.Item>
                    <Form.Item label="결재구분">
                      {getFieldDecorator('gubun', {
                        initialValue: stepInfo.GUBUN !== undefined ? stepInfo.GUBUN.toString() : '',
                      })(<Select style={{ width: 120 }} onChange={val => this.changeGubun(val)}>
                        <Option value="1">결재</Option>
                        <Option value="2">합의(개인)</Option>
                        <Option value="3">합의(부서)</Option>
                        <Option value="4">전결</Option>
                      </Select>)}
                    </Form.Item>
                    <Form.Item label="승인자">
                      <React.Fragment>
                        {getFieldDecorator('stepUsers', {
                          initialValue: stepUsersName,
                        })(<Input style={{ width: '70%' }} readOnly />)}
                        <Button size="small" type="primary" style={{ right: '-8px' }} onClick={this.openOrganizationPopup}>
                          선택
                        </Button>
                      </React.Fragment>
                    </Form.Item>
                    <Form.Item label="권한">
                      {getFieldDecorator('appvAuth', {
                        initialValue: stepInfo.APPV_AUTH,
                      })(<CheckboxGroup options={optionList} />)}
                    </Form.Item>
                    <Form.Item label="합의구분">
                      {getFieldDecorator('agreeType', {
                        initialValue: stepInfo.AGREE_TYPE,
                      })(<Radio.Group disabled={!isAgree}>
                        <Radio value="SE">순차합의</Radio>
                        <Radio value="PA">병렬합의</Radio>
                      </Radio.Group>)}
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                      }}
                    >
                      <Button type="primary" htmlType="button" onClick={this.applyStepInfo} disabled={!isStepInfo}>
                        적용
                      </Button>
                      {/* {isStepInfo ? (
                        <Button type="primary" htmlType="button" onClick={this.applyStepInfo}>
                          적용
                        </Button>
                      ) : (
                        <React.Fragment>
                          <Button type="default" htmlType="button" onClick={this.initStepData}>
                            초기화
                          </Button>
                          <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                            추가
                          </Button>
                        </React.Fragment>
                      )} */}
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '15px', marginBottom: '15px' }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            {processInfo.PRC_ID === -1 ? (
              <Button type="primary" onClick={e => this.onConfirm(e, 'I')}>
                저장
              </Button>
            ) : (
              <React.Fragment>
                <Button type="primary" onClick={e => this.onDeleteProcess(e)}>
                  삭제
                </Button>
                <Button type="primary" onClick={e => this.onConfirm(e, 'U')} style={{ marginLeft: '8px' }}>
                  수정
                </Button>
                {/* {prcId === -1 && (
                  <Button type="primary" htmlType="button" onClick={() => processCallbackFunc(processInfo.PRC_ID)} style={{ marginLeft: '8px' }}>
                    빌더적용
                  </Button>
                )} */}
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

Process.propTypes = {
  form: PropTypes.object.isRequired,
  prcId: PropTypes.number,
  processInfo: PropTypes.object.isRequired,
  processStep: PropTypes.array.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  spinning: PropTypes.bool.isRequired,
  setProcessInfo: PropTypes.func.isRequired,
  setProcessStep: PropTypes.func.isRequired,
  saveProcessInfo: PropTypes.func.isRequired,
  updateProcessInfo: PropTypes.func.isRequired,
  deleteProcessInfo: PropTypes.func.isRequired,
  getProcessData: PropTypes.func.isRequired,
  processCallbackFunc: PropTypes.func,
  initProcessData: PropTypes.func.isRequired,
  changeStepInfo: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setSpinning: PropTypes.func.isRequired,
};

Process.defaultProps = {
  prcId: -1,
  processCallbackFunc: () => {},
};

const mapStateToProps = createStructuredSelector({
  processInfo: selectors.makeProcessInfo(),
  processStep: selectors.makeProcessStep(),
  modalVisible: selectors.makeModalVisible(),
  spinning: selectors.makeSpinning(),
});

const mapDispatchToProps = dispatch => ({
  setProcessInfo: processInfo => dispatch(actions.setProcessInfo(processInfo)),
  setProcessStep: processStep => dispatch(actions.setProcessStep(processStep)),
  saveProcessInfo: processInfo => dispatch(actions.saveProcessInfo(processInfo)),
  updateProcessInfo: processInfo => dispatch(actions.updateProcessInfo(processInfo)),
  deleteProcessInfo: processInfo => dispatch(actions.deleteProcessInfo(processInfo)),
  getProcessData: payload => dispatch(actions.getProcessData(payload)),
  initProcessData: () => dispatch(actions.initProcessData()),
  changeStepInfo: stepInfo => dispatch(actions.changeStepInfo(stepInfo)),
  setModalVisible: visible => dispatch(actions.setModalVisible(visible)),
  setSpinning: spin => dispatch(actions.setSpinning(spin)),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.Admin.Process', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.Admin.Process', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const PrcForm = Form.create({ name: 'prcForm' });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  PrcForm,
)(Process);
