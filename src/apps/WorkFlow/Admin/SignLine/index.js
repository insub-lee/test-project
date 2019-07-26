import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table, PageHeader, Button } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Organization from 'containers/portal/components/Organization';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

const getStepTypeName = stepType => {
  let stepTypeNm = '사용자';
  if (stepType === 'D') stepTypeNm = '부서';
  else if (stepType === 'V') stepTypeNm = '그룹';
  return stepTypeNm;
};

const getGubunName = gubun => {
  let gubunNm = '결재';
  if (gubun === 2) gubunNm = '합의(개인)';
  else if (gubun === 3) gubunNm = '합의(부서)';
  else if (gubun === 4) gubunNm = '전결';
  return gubunNm;
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

class SignLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepInfo: {},
      allOrgShow: false,
      userSetMembers: [],
      pstnSetMembers: [],
      deptSetMembers: [],
      dutySetMembers: [],
      grpSetMembers: [],
    };
  }

  componentDidMount() {
    const { prcId } = this.props;
    if (prcId !== -1) {
      this.props.getProcessData({ prcId });
    }
  }

  componentWillUnmount() {
    this.props.initProcessData();
  }

  beforeOpenOrganizationPopup = stepInfo => {
    this.setState({
      stepInfo,
      userSetMembers: stepInfo.STEP_TYPE === 'U' ? stepInfo.STEP_USERS : [],
      pstnSetMembers: stepInfo.STEP_TYPE === 'P' ? stepInfo.STEP_USERS : [],
      deptSetMembers: stepInfo.STEP_TYPE === 'D' ? stepInfo.STEP_USERS : [],
      dutySetMembers: stepInfo.STEP_TYPE === 'T' ? stepInfo.STEP_USERS : [],
      grpSetMembers: stepInfo.STEP_TYPE === 'V' ? stepInfo.STEP_USERS : [],
    });
  };

  // 조직도 관련
  openOrganizationPopup = stepInfo => {
    this.beforeOpenOrganizationPopup(stepInfo);
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

    const info = {
      ...this.state.stepInfo,
      STEP_USERS: stepUsers,
      stepUsersName,
    };

    this.props.changeStepInfo(info);
  };

  // 부모에서 데이터 조회시 호출할 함수
  getProcessDataCall = () => {
    return this.props.processStep;
  };

  render() {
    const { processStep } = this.props;
    const columns = [
      {
        title: '단계',
        dataIndex: 'STEP',
        key: 'step',
        width: '10%',
        render: text => `${text}단계`,
      },
      {
        title: '유형',
        dataIndex: 'STEP_TYPE',
        key: 'stepType',
        width: '10%',
        render: text => getStepTypeName(text),
      },
      {
        title: '결재구분',
        dataIndex: 'GUBUN',
        key: 'gubun',
        width: '10%',
        render: text => getGubunName(text),
      },
      {
        title: '결재자',
        dataIndex: 'stepUsersName',
        key: 'stepUsersName',
        render: (text, record) => (
          <div style={{ position: 'relative' }}>
            <span style={{ marginRight: '50px' }}>{text}</span>
            {!record.IS_STEP_USERS && (
              <Button
                size="small"
                type="primary"
                style={{ position: 'absolute', right: '0px', top: '-2px' }}
                onClick={() => this.openOrganizationPopup(record)}
              >
                선택
              </Button>
            )}
          </div>
        ),
      },
    ];

    return (
      <div>
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
        <PageHeader title="결재선" />
        <div>
          <Table columns={columns} dataSource={processStep.map((item, index) => ({ ...item, key: index }))} bordered pagination={false} size="small" />
        </div>
      </div>
    );
  }
}

SignLine.propTypes = {
  prcId: PropTypes.number,
  processStep: PropTypes.array,
  getProcessData: PropTypes.func.isRequired,
  initProcessData: PropTypes.func.isRequired,
  changeStepInfo: PropTypes.func.isRequired,
};

SignLine.defaultProps = {
  prcId: 44,
  processStep: [],
};

const mapStateToProps = createStructuredSelector({
  processInfo: selectors.makeProcessInfo(),
  processStep: selectors.makeProcessStep(),
});

const mapDispatchToProps = dispatch => ({
  getProcessData: payload => dispatch(actions.getProcessData(payload)),
  initProcessData: () => dispatch(actions.initProcessData()),
  changeStepInfo: stepInfo => dispatch(actions.changeStepInfo(stepInfo)),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.Admin.SignLine', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.Admin.SignLine', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(SignLine);
