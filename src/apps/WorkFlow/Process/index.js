import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col, Divider, Form, Input, Button, Select, Checkbox, Radio } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Organization from 'containers/portal/components/Organization';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import Wrapper from './Wrapper';
import ItemBody from './TableBuilder/ItemBody';

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
    // this.props.initProcessData();
  }

  onDragEnd = dropResult => {
    if (!dropResult.destination) {
      return;
    }

    const { source, destination } = dropResult;
    const { processStep, setProcessStep } = this.props;
    setProcessStep(reorder(processStep, source.index, destination.index).map((item, index) => ({ ...item, STEP: index + 1 })));
    this.initStepData();
  };

  removeItem = itemIdx => {
    const { processStep, setProcessStep } = this.props;
    processStep.splice(itemIdx, 1);
    setProcessStep(processStep.map((item, index) => ({ ...item, STEP: index + 1 })));
    this.initStepData();
  };

  changeGubun = val => {
    const isAgree = val === '2' || val === '3';
    this.setState({ isAgree });
  };

  onAdd = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const { processInfo, processStep, setProcessStep } = this.props;
      if (processStep.filter(item => item.STEP === Number(values.step)).length === 0) {
        const info = {
          PRC_ID: processInfo.PRC_ID,
          STEP: Number(values.step),
          STEP_TYPE: values.stepType,
          GUBUN: Number(values.gubun),
          STEP_USERS: this.state.stepUsers,
          stepUsersName: this.state.stepUsersName,
          APPV_AUTH: values.appvAuth,
          AGREE_TYPE: values.agreeType === undefined ? '' : values.agreeType,
        };
        processStep.push(info);
        setProcessStep(processStep);
        this.initStepData();
      }
    });
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
      // if (processStep.filter(item => item.STEP === Number(values.step)).length === 0) {
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
  getDataFromOrganizationAll = resultObj => {
    const stepUsers = [];

    let stepUsersName = '';
    resultObj.selectedUsers.forEach(item => {
      stepUsersName += createStepUsersName(item, 'U');
      stepUsers.push({ ...item, ID: item.USER_ID });
    });
    resultObj.checkedPstn.forEach(item => {
      stepUsersName += createStepUsersName(item, 'P');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDept.forEach(item => {
      stepUsersName += createStepUsersName(item, 'D');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDuty.forEach(item => {
      stepUsersName += createStepUsersName(item, 'T');
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedGrp.forEach(item => {
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

  onSaveProcess = e => {
    e.preventDefault();
    const { processStep, saveProcessInfo } = this.props;

    const prcName = this.props.form.getFieldValue('prcName');

    if (prcName === undefined || prcName === '') {
      window.alert('결재선명을 입력해주세요');
      return;
    }

    const prcData = {
      NAME_KOR: prcName,
      prcStep: processStep.map(item => ({
        ...item,
        STEP_USERS: item.STEP_USERS.map(step => step.ID),
      })),
    };
    saveProcessInfo(prcData);
  };

  onUpdateProcess = e => {
    e.preventDefault();
    const { processInfo, processStep, updateProcessInfo } = this.props;
    const prcName = this.props.form.getFieldValue('prcName');
    const prcData = {
      PRC_ID: processInfo.PRC_ID,
      NAME_KOR: prcName,
      prcStep: processStep.map(item => ({
        ...item,
        STEP_USERS: item.STEP_USERS.map(step => step.ID),
      })),
    };
    updateProcessInfo(prcData);
  };

  onActiveStep = stepInfo => {
    this.setState(prevState => {
      const { activeStep } = prevState;
      const isDupStep = activeStep === stepInfo.STEP;
      return {
        activeStep: isDupStep ? -1 : stepInfo.STEP,
        stepInfo: isDupStep ? {} : stepInfo,
        isAgree: isDupStep ? false : stepInfo.STEP_TYPE === 2 || stepInfo.STEP_TYPE === 3,
        stepUsersName: stepInfo.stepUsersName,
      };
    });
  };

  render() {
    const { stepInfo, isAgree, stepUsersName, activeStep } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { prcId, processInfo, processStep, processCallbackFunc } = this.props;
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
        <Row gutter={16}>
          <Col span={24}>
            <Form {...formItemLayout} onSubmit={this.onAdd}>
              <Row gutter={16}>
                <Col span={14}>
                  <Form.Item>
                    {getFieldDecorator('prcName', {
                      initialValue: processInfo.NAME_KOR,
                    })(<Input placeholder="결재선명을 입력해 주세요." />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: '10px' }}>
                <Col span={10}>
                  <div className="content-body" style={{ minHeight: '514px' }}>
                    <Divider orientation="left">결재선</Divider>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                      <ItemBody
                        items={processStep}
                        dropId="process"
                        activeStep={activeStep}
                        action={{ removeItem: this.removeItem, onActiveStep: this.onActiveStep }}
                      />
                    </DragDropContext>
                  </div>
                </Col>
                <Col span={14}>
                  <div className="content-body">
                    <Divider orientation="left">단계정보</Divider>
                    <Form.Item label="단계">
                      {getFieldDecorator('step', {
                        initialValue: isStepInfo ? stepInfo.STEP : processStep.length + 1,
                      })(<Input style={{ width: 100 }} readOnly={isStepInfo} />)}
                    </Form.Item>
                    <Form.Item label="유형">
                      {getFieldDecorator('stepType', {
                        initialValue: stepInfo.STEP_TYPE,
                      })(
                        <Select style={{ width: 120 }}>
                          <Option value="U">사용자</Option>
                          <Option value="D">부서</Option>
                          <Option value="V">그룹</Option>
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="결재구분">
                      {getFieldDecorator('gubun', {
                        initialValue: isStepInfo ? stepInfo.GUBUN.toString() : '',
                      })(
                        <Select style={{ width: 120 }} onChange={val => this.changeGubun(val)}>
                          <Option value="1">결재</Option>
                          <Option value="2">합의(개인)</Option>
                          <Option value="3">합의(부서)</Option>
                          <Option value="4">전결</Option>
                        </Select>,
                      )}
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
                      })(
                        <Radio.Group disabled={!isAgree}>
                          <Radio value="SE">순차합의</Radio>
                          <Radio value="PA">병렬합의</Radio>
                        </Radio.Group>,
                      )}
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                      }}
                    >
                      {isStepInfo ? (
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
                      )}
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
              <Button type="primary" onClick={e => this.onSaveProcess(e)}>
                저장
              </Button>
            ) : (
              <React.Fragment>
                <Button type="primary" onClick={e => this.onUpdateProcess(e)}>
                  수정
                </Button>
                {prcId === -1 && (
                  <Button type="primary" htmlType="button" onClick={() => processCallbackFunc(processInfo.PRC_ID)} style={{ marginLeft: '8px' }}>
                    빌더적용
                  </Button>
                )}
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
  setProcessStep: PropTypes.func.isRequired,
  saveProcessInfo: PropTypes.func.isRequired,
  updateProcessInfo: PropTypes.func.isRequired,
  getProcessData: PropTypes.func.isRequired,
  processCallbackFunc: PropTypes.func.isRequired,
  initProcessData: PropTypes.func.isRequired,
  changeStepInfo: PropTypes.func.isRequired,
};

Process.defaultProps = {
  prcId: 39,
};

const mapStateToProps = createStructuredSelector({
  processInfo: selectors.makeProcessInfo(),
  processStep: selectors.makeProcessStep(),
});

const mapDispatchToProps = dispatch => ({
  setProcessStep: processStep => dispatch(actions.setProcessStep(processStep)),
  saveProcessInfo: processInfo => dispatch(actions.saveProcessInfo(processInfo)),
  updateProcessInfo: processInfo => dispatch(actions.updateProcessInfo(processInfo)),
  getProcessData: payload => dispatch(actions.getProcessData(payload)),
  initProcessData: () => dispatch(actions.initProcessData()),
  changeStepInfo: stepInfo => dispatch(actions.changeStepInfo(stepInfo)),
});

const withReducer = injectReducer({ key: 'apps.Workflow.Process', reducer });
const withSaga = injectSaga({ key: 'apps.Workflow.Process', saga });
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
