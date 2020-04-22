import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import styled from 'styled-components';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';

const StyledCustomTable = tableComp => styled(tableComp)`
  .ant-table .ant-table-content .ant-table-body table .ant-table-tbody > tr > td,
  .ant-table .ant-table-content .ant-table-body table .ant-table-thead > tr > th {
    padding: 8px 4px;
  }
`;

const AntdTable = StyledCustomTable(StyledAntdTable(Table));

const columns = [
  {
    title: 'Rev.',
    dataIndex: 'VERSION',
    key: 'TASK_SEQ',
    width: '30px',
    align: 'center',
  },
  {
    title: 'Date.',
    dataIndex: 'END_DTTM',
    width: '60px',
    align: 'center',
    render: text => (text ? text.split(' ')[0] : ''),
  },
  {
    title: 'Short Description(Including the Para./clause)',
    dataIndex: 'REMARK',
    width: '550px',
    render: text => <Icon type="check-circle" />,
  },
];

class MdcsRevisionHistoryListComp extends Component {
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
      <tr>
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
          reviewerNode.push(<tr>{tempNode}</tr>);
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        reviewerNode.push(<tr>{tempNode}</tr>);
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
          mailReviewerNode.push(<tr>{tempNode}</tr>);
        } else tempNode = [itemNode];
      } else {
        tempNode.push(itemNode);
        mailReviewerNode.push(<tr>{tempNode}</tr>);
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
      <div className="mdcsProcessList">
        <table>
          <thead>
            <th>Preparer</th>
            <th>Approver</th>
          </thead>
          <tbody>{draftNode}</tbody>
        </table>
        <table>
          <thead>
            <th colSpan="2">필수심의권자</th>
          </thead>
          <tbody>{reviewerNode}</tbody>
        </table>
        <table>
          <thead>
            <th colSpan="2">Mail 심의권자</th>
          </thead>
          <tbody>{mailReviewerNode}</tbody>
        </table>
      </div>
    );
  }
}

export default MdcsRevisionHistoryListComp;
