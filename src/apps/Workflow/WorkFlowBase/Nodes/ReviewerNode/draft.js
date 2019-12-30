import React, { Component } from 'react';
import * as ApproveConst from 'apps/Workflow/WorkFlowBase/Nodes/Constants/approveconst';
import * as DraftType from 'apps/Workflow/WorkFlowBase/Nodes/Constants/draftconst';

class ReviewerNodeDraft extends Component {
  componentDidMount = () => {
    const {
      stepInfo,
      setDraftStepInfoByApi,
      externalData: { fullNodeIds, degree, draftType },
    } = this.props;
    console.debug('##Reviewer', this.props);
    setDraftStepInfoByApi(stepInfo, {
      key: 'approveInfo',
      url: '/api/mdcs/v1/common/ApproveInfoHandler',
      type: 'post',
      params: {
        PARAM: {
          approveType: ApproveConst.REVIEWER,
          degreeFlag: degree,
          draftType,
          nodeIds: fullNodeIds,
        },
      },
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.externalData.degree !== this.props.externalData.degree) {
      const {
        stepInfo,
        setDraftStepInfoByApi,
        externalData: { fullNodeIds, degree, draftType },
      } = this.props;
      setDraftStepInfoByApi(stepInfo, {
        key: 'approveInfo',
        url: '/api/mdcs/v1/common/ApproveInfoHandler',
        type: 'post',
        params: {
          PARAM: {
            approveType: ApproveConst.REVIEWER,
            degreeFlag: degree,
            draftType,
            nodeIds: fullNodeIds,
          },
        },
      });
    }
  }

  render = () => {
    console.log('DCC노드 프롭스', this.props);
    return <div>DCC 노드</div>;
  };
}

export default ReviewerNodeDraft;
