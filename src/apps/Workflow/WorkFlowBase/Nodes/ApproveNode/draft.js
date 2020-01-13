import React, { Component } from 'react';
import * as ApproveConst from '../Constants/approveconst';
import * as Degree from '../Constants/modifyconst';
import * as DraftType from '../Constants/draftconst';

class ApproveNodeDraft extends Component {
  componentDidMount = () => {
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
          approveType: ApproveConst.APPROVER,
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
            approveType: ApproveConst.APPROVER,
            degreeFlag: degree,
            draftType,
            nodeIds: fullNodeIds,
          },
        },
      });
    }
  }

  render = () => {
    return <div>필수심의권자 노드</div>;
  };
}

export default ApproveNodeDraft;
