import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Table, Row, Col, Checkbox, Button, Icon } from 'antd';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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
    width: '102px',
  },
  {
    dataIndex: 'VERSION',
    title: 'REV.',
    align: 'center',
    width: '48px',
  },
  {
    dataIndex: 'TITLE',
    title: '제목',
    width: '410px',
    ellipsis: true,
  },
];

class TaskTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSelectedRows: [],
      rightSelectedRows: [],
    };
  }

  onLeftSelectRow = row => {
    this.setState(prevState => {
      const { leftSelectedRows } = prevState;
      const rowIdx = leftSelectedRows.findIndex(iNode => iNode.TASK_SEQ === row.TASK_SEQ);
      if (rowIdx > -1) {
        leftSelectedRows.splice(rowIdx, 1);
        return { leftSelectedRows };
      }
      leftSelectedRows.push(row);
      return { leftSelectedRows };
    });
  };

  onRightSelectRow = row => {
    this.setState(prevState => {
      const { rightSelectedRows } = prevState;
      const rowIdx = rightSelectedRows.findIndex(iNode => iNode.TASK_SEQ === row.TASK_SEQ);
      if (rowIdx > -1) {
        rightSelectedRows.splice(rowIdx, 1);
        return { rightSelectedRows };
      }
      rightSelectedRows.push(row);
      return { rightSelectedRows };
    });
  };

  onClickAddSelectRow = () => {
    this.props.setSelectedList('ADD', this.state.leftSelectedRows, this.removeCheck);
  };

  onClickRemoveSelectRow = () => this.props.setSelectedList('REMOVE', this.state.rightSelectedRows, this.removeCheck);

  removeCheck = flag => {
    if (flag === 'ADD') {
      this.setState({ leftSelectedRows: [] });
    } else {
      this.setState({ rightSelectedRows: [] });
    }
  };

  render() {
    const { sourceList, selectedList, submitTask } = this.props;
    const { leftSelectedRows, rightSelectedRows } = this.state;
    const leftRowSelection = {
      selectedRowKeys: leftSelectedRows.map(item => item.TASK_SEQ),
      getCheckboxProps: item => ({ disabled: item.disabled }),
      onChange: (selectedRowKeys, selectedRows) =>
        this.setState({
          leftSelectedRows: selectedRows,
        }),
    };

    const rightRowSelection = {
      selectedRowKeys: rightSelectedRows.map(item => item.TASK_SEQ),
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          rightSelectedRows: selectedRows,
        });
      },
    };

    return (
      <TaskTransferWrapper>
        <Row gutter={0}>
          <Col span={11}>
            <div className="taskTransferTitle">
              <span>폐기 대상 사내표</span>
              <span>{sourceList.length}건</span>
            </div>
            <div className="taskTransferList">
              <Table
                className="taskTransferTable"
                bordered
                columns={columns}
                dataSource={sourceList}
                size="small"
                pagination={false}
                rowKey={record => record.TASK_SEQ}
                rowSelection={leftRowSelection}
                scroll={{ y: 250, x: 600 }}
                onRow={row => ({
                  onClick: () => {
                    if (row.disabled) return;
                    this.onLeftSelectRow(row);
                  },
                })}
              />
            </div>
          </Col>
          <Col span={2}>
            <div className="userAddWrapper">
              <div>
                <div>
                  <StyledButton className="btn-light btn-sm" onClick={this.onClickAddSelectRow}>
                    <Icon type="double-right" />
                  </StyledButton>
                </div>
                <div>
                  <StyledButton className="btn-light btn-sm" onClick={this.onClickRemoveSelectRow}>
                    <Icon type="double-left" />
                  </StyledButton>
                </div>
              </div>
            </div>
          </Col>
          <Col span={11}>
            <div className="taskTransferTitle">
              <span>선택된 사내표준</span>
              <span>{selectedList.length}건</span>
            </div>
            <div className="taskTransferList">
              <Table
                className="taskTransferTable"
                bordered
                columns={columns}
                dataSource={selectedList}
                size="small"
                pagination={false}
                rowKey={record => record.TASK_SEQ}
                rowSelection={rightRowSelection}
                scroll={{ y: 250, x: 600 }}
                onRow={row => ({
                  onClick: () => {
                    this.onRightSelectRow(row);
                  },
                })}
              />
            </div>
          </Col>
        </Row>
        <div className="applyButtonWrapper">
          {/* <StyledButton className="btn-sm btn-gray btn-first" onClick={() => false}>
            취소
          </StyledButton> */}
          <StyledButton className="btn-sm btn-primary" onClick={submitTask}>
            등록
          </StyledButton>
        </div>
      </TaskTransferWrapper>
    );
  }
}

TaskTransfer.propTypes = {
  setSelectedList: PropTypes.func,
  submitTask: PropTypes.func,
  sourceList: PropTypes.array,
  selectedList: PropTypes.array,
};

TaskTransfer.defaultProps = {
  setSelectedList: () => false,
  submitTask: () => false,
  sourceList: [],
  selectedList: [],
};

export default TaskTransfer;
