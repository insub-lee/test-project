import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Table, Row, Col, Checkbox, Button, Icon } from 'antd';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import TaskTransferWrapper from './TaskTransferWrapper';

// Component Attribute 및 Event Method 정리
// <UserSelect
//   initUserList={this.state.selectedUserList}  **초기값 셋팅 (int)
//   treeDataSource={list} ** 부서정보 Data Bind
//   onTreeSelect={this.onTreeSelect} ** 부서 선택 이벤트 (이 이벤트에서 비동기 해당 부서원을 DataBind해 Props(userDataList)로 전달하는 기능으로 활용)
//   userDataList={result.userList && result.userList.list}
//   onUserSelectHandler={this.onUserSelect} ** add 버튼 클릭 이벤트
//   onUserSelectedComplete={this.onUserSelectedComplete}  확인버튼 클릭이벤트
//   onCancel={this.onCancel} 취소 버튼 이벤트
//   onUserDelete={this.onUserDelete} 선택된 사용자 삭제 이벤트
// ></UserSelect>

const columns = [
  {
    dataIndex: 'DOCNUMBER',
    title: '문서번호',
    align: 'center',
    width: '25%',
  },
  {
    dataIndex: 'VERSION',
    title: 'REV.',
    align: 'center',
    width: '20%',
  },
  {
    dataIndex: 'TITLE',
    title: '제목',
    align: 'center',
    width: '50%',
    ellipsis: true,
  },
];

const TaskTransfer = ({ sourceList, selectedList }) => (
  <TaskTransferWrapper>
    <Row gutter={0}>
      <Col span={11}>
        <div className="taskTransferTitle">
          <span>폐기 대상 사내표</span>
          <span>건</span>
        </div>
        <div className="taskTransferList">
          <Table bordered columns={columns} dataSource={sourceList} size="small" pagination={false} />
        </div>
      </Col>
      <Col span={2}>
        <div className="userAddWrapper">
          <div>
            <StyledButton className="btn-light btn-sm" onClick={() => false}>
              <Icon type="double-right" />
            </StyledButton>
          </div>
          <div>
            <StyledButton className="btn-light btn-sm" onClick={() => false}>
              <Icon type="double-left" />
            </StyledButton>
          </div>
        </div>
      </Col>
      <Col span={11}>
        <div className="taskTransferTitle">
          <span>선택된 사내표준</span>
          <span>건</span>
        </div>
        <div className="taskTransferList">
          <Table bordered columns={columns} dataSource={selectedList} size="small" pagination={false} />
        </div>
      </Col>
    </Row>
    <div className="applyButtonWrapper">
      <StyledButton className="btn-sm btn-gray btn-first" onClick={() => false}>
        취소
      </StyledButton>
      <StyledButton className="btn-sm btn-primary" onClick={() => false}>
        등록
      </StyledButton>
    </div>
  </TaskTransferWrapper>
);

TaskTransfer.propTypes = {
  selectedDeptId: PropTypes.number,
  selectedUserList: PropTypes.array,
  initUserList: PropTypes.array,
};

TaskTransfer.defaultProps = {
  selectedDeptId: -1,
};

export default TaskTransfer;
