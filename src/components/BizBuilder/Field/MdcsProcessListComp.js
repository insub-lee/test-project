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
        width: 15%;
      }
      .mdcsUserName {
        width: 20%;
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

  initData = (id, response) => {
    const { list } = response;
    const draftList = list.filter(fNode => fNode.NODE_ID === 101 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const approveList = list.filter(fNode => fNode.NODE_ID === 107 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const reviewerList = list.filter(fNode => fNode.NODE_ID === 106 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const mailReviewerList = list.filter(fNode => fNode.NODE_ID === 112 && fNode.DRAFT_USER_NAME && fNode.DRAFT_USER_NAME.length > 0);
    const draftNode = [
      <tr className="mdcsProcessRow">
        <td>
          <div className="mdcsDeptName">{draftList[0].DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{draftList[0].PSTN_NAME}</div>
          <div className="mdcsUserName">{draftList[0].DRAFT_USER_NAME}</div>
          <div className="mdcsAppvDttm">{draftList[0].APPV_DTTM}</div>
          <div className="mdcsAppvStatus">{draftList[0].APPV_STATUS ? <Icon type="check-circle" /> : ''}</div>
        </td>
        <td>
          <div className="mdcsDeptName">{approveList[0].DRAFT_DEPT_NAME}</div>
          <div className="mdcsPstnName">{approveList[0].PSTN_NAME}</div>
          <div className="mdcsUserName">{approveList[0].DRAFT_USER_NAME}</div>
          <div className="mdcsAppvDttm">{approveList[0].APPV_DTTM}</div>
          <div className="mdcsAppvStatus">{approveList[0].APPV_STATUS ? <Icon type="check-circle" /> : ''}</div>
        </td>
      </tr>,
    ];
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
          <div className="mdcsAppvStatus">{node.APPV_STATUS === 2 ? <Icon type="check-circle" /> : ''}</div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          reviewerNode.push(<tr className="mdcsProcessRow">{tempNode}</tr>);
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        reviewerNode.push(<tr className="mdcsProcessRow">{tempNode}</tr>);
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
          <div className="mdcsAppvStatus">{node.APPV_STATUS === 2 ? <Icon type="check-circle" /> : ''}</div>
        </td>
      );
      if (idx % 2 === 0) {
        if (idx + 1 === maxCnt) {
          tempNode = [itemNode, dummyNode];
          mailReviewerNode.push(<tr className="mdcsProcessRow">{tempNode}</tr>);
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        mailReviewerNode.push(<tr className="mdcsProcessRow">{tempNode}</tr>);
      }
    });
    this.setState({ draftNode, reviewerNode, mailReviewerNode });
  };

  componentDidMount() {
    const { sagaKey, submitExtraHandler, formData } = this.props;
    const url = '/api/mdcs/v1/common/ProcessResultHandler';
    submitExtraHandler(sagaKey, 'POST', url, { PARAM: { WORK_SEQ: formData.WORK_SEQ, TASK_SEQ: formData.TASK_SEQ } }, this.initData);
  }

  render() {
    const { draftNode, reviewerNode, mailReviewerNode } = this.state;
    return (
      <StyledWrap>
        <table className="mdcsProcessList">
          <thead>
            <tr className="mdcsProcessRow">
              <th>Preparer</th>
              <th>Approver</th>
            </tr>
          </thead>
          <tbody>{draftNode}</tbody>
        </table>
        <table className="mdcsProcessList">
          <thead>
            <tr className="mdcsProcessRow">
              <th colSpan="2">필수심의권자</th>
            </tr>
          </thead>
          <tbody>{reviewerNode}</tbody>
        </table>
        <table className="mdcsProcessList">
          <thead>
            <tr className="mdcsProcessRow">
              <th colSpan="2">Mail 심의권자</th>
            </tr>
          </thead>
          <tbody>{mailReviewerNode}</tbody>
        </table>
      </StyledWrap>
    );
  }
}

export default MdcsProcessListComp;
