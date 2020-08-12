import React, { Component } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const StyledWrap = styled.div`
  table.mdcsProcessList {
    width: 100%;
    margin-bottom: 2px;
    & > thead > tr.mdcsProcessRow > th,
    & > tbody > tr.mdcsProcessRow > td {
      width: 50%;
      border: solid 1px #cccccc;
      padding: 4px;
      line-height: 100%;
      div {
        display: inline-block;
        vertical-align: middle;
      }
      .mdcsDeptName {
        width: 30%;
      }
      .mdcsPstnName {
        width: 15%;
      }
      .mdcsUserName {
        width: 30%;
      }
      .mdcsAppvDttm {
        width: 20%;
      }
      .mdcsAppvStatus {
        width: 5%;
      }
    }
  }
`;

class MdcsProcessListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftNode: [],
      reviewerNode: [],
      mailReviewerNode: [],
    };
  }

  componentDidMount() {
    const { sagaKey, submitExtraHandler, formData, draftInfo, isObsCheck, exDraftId } = this.props;
    const { DRAFT_ID, REL_TYPE } = draftInfo;
    const { MIG_YN, OBS_DRAFT_ID } = formData;
    let draftId = DRAFT_ID;
    if (isObsCheck && OBS_DRAFT_ID !== 0) {
      draftId = OBS_DRAFT_ID;
    }
    if (exDraftId && exDraftId > 0) {
      draftId = exDraftId;
    }
    const url = '/api/workflow/v1/common/process/ProcessPreviewHandler';
    submitExtraHandler(sagaKey, 'POST', url, { PARAM: { draftId, isMig: MIG_YN } }, this.initDataBind);
  }

  initDataBind = (id, response) => {
    const { prcPreViewList } = response;

    const draftList = prcPreViewList.filter(fNode => fNode.NODE_ID === 101 && fNode.APPV_USER_NAME && fNode.APPV_USER_NAME.length > 0);
    const approveList = prcPreViewList.filter(fNode => fNode.NODE_ID === 107 && fNode.APPV_USER_NAME && fNode.APPV_USER_NAME.length > 0);
    const reviewerList = prcPreViewList.filter(fNode => fNode.NODE_ID === 106 && fNode.APPV_USER_NAME && fNode.APPV_USER_NAME.length > 0);
    const mailReviewerList = prcPreViewList.filter(fNode => fNode.NODE_ID === 112 && fNode.APPV_USER_NAME && fNode.APPV_USER_NAME.length > 0);

    let draftNode = [];
    if (draftList && draftList.length > 0 && approveList && approveList.length > 0) {
      draftNode = [
        <tr key="MdcsProcessListComp-draftList-approveList" className="mdcsProcessRow">
          <td>
            <div className="mdcsDeptName">{draftList[0].APPV_DEPT_NAME}</div>
            <div className="mdcsPstnName">{draftList[0].APPV_PSTN_NAME}</div>
            <div className="mdcsUserName">{draftList[0].APPV_USER_NAME}</div>
            <div className="mdcsAppvDttm">{draftList[0].APPV_DTTM}</div>
            <div className="mdcsAppvStatus">
              <Icon type="check-circle" />
            </div>
          </td>
          <td>
            <div className="mdcsDeptName">{approveList[0].APPV_DEPT_NAME}</div>
            <div className="mdcsPstnName">{approveList[0].APPV_PSTN_NAME}</div>
            <div className="mdcsUserName">{approveList[0].APPV_USER_NAME}</div>
            <div className="mdcsAppvDttm">{approveList[0].APPV_DTTM}</div>
            <div className="mdcsAppvStatus">
              {approveList[0].APPV_STATUS === 2 || approveList[0].APPV_STATUS === 20 ? (
                <Icon type="check-circle" />
              ) : (
                (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''
              )}
            </div>
          </td>
        </tr>,
      ];
    }

    const dummyNode = (
      <td>
        <div className="mdcsDeptName"></div>
        <div className="mdcsPstnName"></div>
        <div className="mdcsUserName"></div>
        <div className="mdcsAppvDttm"></div>
        <div className="mdcsAppvStatus"></div>
      </td>
    );

    const reviewerNode = [];
    let tempNode = [];
    let maxCnt = reviewerList.length;
    reviewerList.forEach((node, idx) => {
      const itemNode = (
        <td>
          <div className="mdcsDeptName">{node.APPV_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.APPV_PSTN_NAME}</div>
          <div className="mdcsUserName">{node.APPV_USER_NAME}</div>
          <div className="mdcsAppvDttm">{node.APPV_DTTM}</div>
          <div className="mdcsAppvStatus">
            {node.APPV_STATUS === 2 || node.APPV_STATUS === 20 ? <Icon type="check-circle" /> : (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''}
          </div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          reviewerNode.push(
            <tr key={`MdcsProcessListComp-reviewerList_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        reviewerNode.push(
          <tr key={`MdcsProcessListComp-reviewerList_${idx}`} className="mdcsProcessRow">
            {tempNode}
          </tr>,
        );
      }
    });
    const mailReviewerNode = [];
    maxCnt = mailReviewerList.length;
    mailReviewerList.forEach((node, idx) => {
      const itemNode = (
        <td>
          <div className="mdcsDeptName">{node.APPV_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.APPV_PSTN_NAME}</div>
          <div className="mdcsUserName">{node.APPV_USER_NAME}</div>
          <div className="mdcsAppvDttm">{node.APPV_DTTM}</div>
          <div className="mdcsAppvStatus">
            {node.APPV_STATUS === 2 || node.APPV_STATUS === 20 ? <Icon type="check-circle" /> : (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''}
          </div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          mailReviewerNode.push(
            <tr key={`MdcsProcessListComp-mailReviewerList_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        mailReviewerNode.push(
          <tr key={`MdcsProcessListComp-mailReviewerList_${idx}`} className="mdcsProcessRow">
            {tempNode}
          </tr>,
        );
      }
    });
    this.setState({ draftNode, reviewerNode, mailReviewerNode });
  };

  render() {
    const { draftNode, reviewerNode, mailReviewerNode } = this.state;
    return (
      <StyledWrap>
        {draftNode && draftNode.length > 0 && (
          <table className="mdcsProcessList">
            <thead>
              <tr className="mdcsProcessRow">
                <th>Preparer</th>
                <th>Approver</th>
              </tr>
            </thead>
            <tbody>{draftNode}</tbody>
          </table>
        )}
        {reviewerNode && reviewerNode.length > 0 && (
          <table className="mdcsProcessList">
            <thead>
              <tr className="mdcsProcessRow">
                <th colSpan="2">필수 심의권자</th>
              </tr>
            </thead>
            <tbody>{reviewerNode}</tbody>
          </table>
        )}
        {mailReviewerNode && mailReviewerNode.length > 0 && (
          <table className="mdcsProcessList">
            <thead>
              <tr className="mdcsProcessRow">
                <th colSpan="2">Mail 심의권자</th>
              </tr>
            </thead>
            <tbody>{mailReviewerNode}</tbody>
          </table>
        )}
      </StyledWrap>
    );
  }
}

export default MdcsProcessListComp;
