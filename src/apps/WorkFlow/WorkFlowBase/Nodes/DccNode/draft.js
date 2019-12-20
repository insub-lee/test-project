import React, { Component } from 'react';
import * as ApproveConst from 'apps/Workflow/WorkFlowBase/Nodes/Constants/approveconst';

class DccNodeDraft extends Component {
  componentDidMount = () => {
    const { stepInfo, setDraftStepInfoByApi } = this.props;
    setDraftStepInfoByApi(stepInfo, {
      key: 'dccInfo',
      url: `/api/mdcs/v1/common/DccInfoHandler/${ApproveConst.DCC}`,
      type: 'get',
      params: {},
    });
  };

  render = () => <div>DCC 노드</div>;
}

export default DccNodeDraft;
