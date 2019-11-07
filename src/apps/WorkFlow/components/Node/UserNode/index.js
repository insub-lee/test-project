import React, { Component } from 'react';

import OpinionModal from '../OpinionModal';

class UserNode extends Component {
  approvalRequestNode = this.approvalRequestNode.bind(this);

  componentDidMount = () => {
    // const { getStepInfo } = this.props;
    // getStepInfo();
  };

  approvalRequestNode(e, status, opinion) {
    const { approvalRequest } = this.props;
    approvalRequest(status, opinion);
  }

  render = () => {
    const { viewType, approvalProcess, nodeInfo, setApprovalProcessQueId } = this.props;
    return (
      <div>
        approval
        <OpinionModal visible={approvalProcess} approvalRequest={this.approvalRequestNode} closeHandler={() => setApprovalProcessQueId(0)} />
      </div>
    );
  };
}

export default UserNode;
