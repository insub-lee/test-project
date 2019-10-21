import React, { Component } from 'react';
import * as ApproveConst from 'apps/WorkFlow/WorkFlowBase/Nodes/Constants/approveconst';

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

  render = () => {
    return <div>DCC 노드</div>;
  };
}

export default DccNodeDraft;
