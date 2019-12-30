import React, { Component } from 'react';

import OpinionModal from '../OpinionModal';

class DccNode extends Component {
  approvalRequestNode = this.approvalRequestNode.bind(this);

  componentDidMount = () => {
    // const { getStepInfo } = this.props;
    // getStepInfo();
  };

  callback = () => {};

  approvalRequestNode(e, status, opinion) {
    const { approvalRequest } = this.props;
    approvalRequest(status, opinion, this.callback);
  }

  rejectRequestNode(e, status, opinion) {
    const { rejectRequest } = this.props;
    rejectRequest(status, opinion, this.callback);
  }

  render = () => {
    const { viewType, approvalProcess, nodeInfo, closeApprovalProcess } = this.props;
    return (
      <OpinionModal
        visible={approvalProcess}
        approvalRequest={this.approvalRequestNode}
        rejectRequestNode={this.rejectRequestNode}
        closeHandler={() => closeApprovalProcess()}
      />
    );
  };
}

export default DccNode;
