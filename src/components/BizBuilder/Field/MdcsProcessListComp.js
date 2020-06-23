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
      div {
        display: inline-block;
      }
      .mdcsDeptName {
        width: 40%;
      }
      .mdcsPstnName {
        width: 17%;
      }
      .mdcsUserName {
        width: 18%;
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
    const { fieldSelectData, CONFIG } = this.props;

    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const prcInfo = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initDataBind(prcInfo);
      }
    }
    // const { sagaKey, submitExtraHandler, formData } = this.props;
    // const url = '/api/mdcs/v1/common/ProcessResultHandler';
    // submitExtraHandler(sagaKey, 'POST', url, { PARAM: { WORK_SEQ: formData.WORK_SEQ, TASK_SEQ: formData.TASK_SEQ } }, this.initData);
  }

  initDataBind = response => {
    const { list, processList } = response;
    const resultList = [...list];

    processList.forEach(item => {
      if (item.NODE_ID === 107 || item.NODE_ID === 106 || item.NODE_ID === 112) {
        const appvMemeber = JSON.parse(item.APPV_MEMBER);
        if (appvMemeber.length > 0) {
          appvMemeber.forEach(subNode => {
            const findIdx = list.findIndex(iNode => iNode.NODE_ID === item.NODE_ID && iNode.ORG_APPV_USER_ID === subNode.USER_ID);
            if (findIdx === -1)
              resultList.push({
                NODE_ID: item.NODE_ID,
                APPV_STATUS: 0,
                APPV_DTTM: '',
                DRAFT_USER_NAME: subNode.NAME_KOR,
                PSTN_NAME: subNode.PSTN_NAME_KOR,
                DRAFT_DEPT_NAME: subNode.DEPT_NAME_KOR,
              });
          });
        }
      }
    });

    const draftList = resultList.filter(fNode => fNode.NODE_ID === 101 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const approveList = resultList.filter(fNode => fNode.NODE_ID === 107 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const reviewerList = resultList.filter(fNode => fNode.NODE_ID === 106 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const mailReviewerList = resultList.filter(fNode => fNode.NODE_ID === 112 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);

    let draftNode = [];
    if (draftList && draftList.length > 0 && approveList && approveList.length > 0) {
      draftNode = [
        <tr key="MdcsProcessListComp-draftList-approveList" className="mdcsProcessRow">
          <td>
            <div className="mdcsDeptName">{draftList[0].DRAFT_DEPT_NAME}</div>
            <div className="mdcsPstnName">{draftList[0].PSTN_NAME}</div>
            <div className="mdcsUserName">{draftList[0].DRAFT_USER_NAME}</div>
            <div className="mdcsAppvDttm">{draftList[0].APPV_DTTM}</div>
            <div className="mdcsAppvStatus">
              {draftList[0].APPV_STATUS === 2 || draftList[0].APPV_STATUS === 20 ? (
                <Icon type="check-circle" />
              ) : (
                (draftList[0].APPV_STATUS === 3 && <Icon type="stop" />) || ''
              )}
            </div>
          </td>
          <td>
            <div className="mdcsDeptName">{approveList[0].DRAFT_DEPT_NAME}</div>
            <div className="mdcsPstnName">{approveList[0].PSTN_NAME}</div>
            <div className="mdcsUserName">{approveList[0].DRAFT_USER_NAME}</div>
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
          <div className="mdcsDeptName">{node.DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.PSTN_NAME}</div>
          <div className="mdcsUserName">{node.DRAFT_USER_NAME}</div>
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
            <tr key={`MdcsProcessListComp-reviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        reviewerNode.push(
          <tr key={`MdcsProcessListComp-reviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
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
          <div className="mdcsDeptName">{node.DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{node.PSTN_NAME}</div>
          <div className="mdcsUserName">{node.DRAFT_USER_NAME}</div>
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
            <tr key={`MdcsProcessListComp-mailReviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
              {tempNode}
            </tr>,
          );
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        mailReviewerNode.push(
          <tr key={`MdcsProcessListComp-mailReviewerList_${node.RESULT_ID}_${idx}`} className="mdcsProcessRow">
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
