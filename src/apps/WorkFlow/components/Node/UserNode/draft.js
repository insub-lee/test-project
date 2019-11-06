import React, { Component } from 'react';
import { Button } from 'antd';

import Organization from 'containers/portal/components/Organization';

class UserNodeDraft extends Component {
  state = {
    stepInfo: {},
    allOrgShow: false,
    userSetMembers: [],
    pstnSetMembers: [],
    deptSetMembers: [],
    dutySetMembers: [],
    grpSetMembers: [],
  };

  componentDidMount = () => {
    const { setDraftStepInfo, draftStepInfo, stepInfo } = this.props;
    // getStepInfo();
    setDraftStepInfo(stepInfo.STEP, { ACCOUNT_ID: [999, 111], STEP: stepInfo.STEP, NODE_ID: stepInfo.NODE_ID });
  };

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
      stepUsersName += item.NAME_KOR;
      stepUsers.push({ ...item, ID: item.USER_ID });
    });
    resultObj.checkedPstn.forEach(item => {
      stepUsersName += item.NAME_KOR;
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDept.forEach(item => {
      stepUsersName += item.NAME_KOR;
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedDuty.forEach(item => {
      stepUsersName += item.NAME_KOR;
      stepUsers.push({ ...item, ID: item.id });
    });
    resultObj.checkedGrp.forEach(item => {
      stepUsersName += item.NAME_KOR;
      stepUsers.push({ ...item, ID: item.id });
    });

    const info = {
      ...this.state.stepInfo,
      STEP_USERS: stepUsers,
      stepUsersName,
    };

    this.props.changeStepInfo(info);
  };

  render = () => {
    const { viewType, approvalProcess, nodeInfo, setApprovalProcessQueId, record } = this.props;
    return (
      <div>
        {/* <Button size="small" type="primary" style={{ position: 'absolute', right: '0px', top: '-2px' }} onClick={() => this.openOrganizationPopup(record)}>
          선택
        </Button> */}
        draftStep
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
      </div>
    );
  };
}

export default UserNodeDraft;
