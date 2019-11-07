import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Tree, Table } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getTreeFromFlatData } from 'react-sortable-tree';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import StyledButton from 'apps/mdcs/styled/StyledButton';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyledWorkProcessModal from './StyledWorkProcessModal';

const getTreeData = deptList =>
  deptList.length > 0
    ? getTreeFromFlatData({
      flatData: deptList.map(item => ({
        title: item.NAME_KOR,
        value: `${item.DEPT_ID}`,
        key: `${item.DEPT_ID}`,
        parentValue: `${item.PRNT_ID}`,
      })),
      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: '-1',
    })
    : [];

class WorkProcessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selUserList: [],
    };
  }

  componentDidMount() {
    this.props.getDeptList({});
    const tempUserList = [];
    this.props.processStep.forEach(item => {
      item.APPV_MEMBER.forEach(user => {
        tempUserList.push({
          ...user,
          NODE_ID: item.NODE_ID,
        });
      });
    });
    this.setState({ selUserList: tempUserList });
  }

  onTreeNodeSelect = (selectedKeys, info) => {
    if (selectedKeys !== undefined && selectedKeys.length > 0) {
      this.props.getDeptUserList(selectedKeys[0]);
    } else {
      this.props.initDeptUserList();
    }
  };

  onTreeNodeCheck = (checkedKeys, info) => {
    console.debug('checked', checkedKeys, info);
  };

  onDeptUserCheck = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleAddUser = nodeId => {
    const { selectedRowKeys } = this.state;
    const { deptUserList } = this.props;
    const selectedUser = deptUserList.filter(user => selectedRowKeys.includes(user.USER_ID));

    this.setState(prevState => {
      const { selUserList } = prevState;
      selectedUser.forEach(user => {
        selUserList.push({
          NODE_ID: nodeId,
          USER_ID: user.USER_ID,
          USER_NAME: user.NAME_KOR,
          PSTN_NAME: user.PSTN_NAME_KOR,
        });
      });
      return {
        selectedUser,
        selectedRowKeys: [],
      };
    });
  };

  handleDeleteSelectedUser = (nodeId, user) => {
    this.setState(prevState => {
      const { selUserList } = prevState;
      return {
        selUserList: selUserList.filter(item => item.NODE_ID !== nodeId || (item.NODE_ID === nodeId && item.USER_ID !== user.USER_ID)),
      };
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedRowKeys: [],
      selUserList: [],
    });
    this.props.initDeptUserList();
    this.props.onCloseModal();
  };

  handleComplete = () => {
    const { processStep } = this.props;
    const { selUserList } = this.state;
    processStep.map(item => {
      item.APPV_MEMBER.splice(0, item.APPV_MEMBER.length);
      selUserList.forEach(user => {
        if (item.NODE_ID === user.NODE_ID) {
          item.APPV_MEMBER.push(user);
        }
      });
    });
    this.props.onComplete(processStep);
  };

  getColumns = () => [
    {
      title: '',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      render: (text, record) => <span>{`${record.NAME_KOR} ${record.PSTN_NAME_KOR}`}</span>,
    },
  ];

  getSelColumns = (nodeId, nodeName) => [
    {
      title: nodeName,
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      render: (text, record) => <span>{`${record.USER_NAME} ${record.PSTN_NAME}`}</span>,
    },
    {
      title: '',
      dataIndex: 'USER_ID',
      key: 'BTN_USER_ID',
      width: '20%',
      render: (text, record) => (
        <StyledButton className="btn-xs btn-gray" onClick={() => this.handleDeleteSelectedUser(nodeId, record)}>
          삭제
        </StyledButton>
      ),
    },
  ];

  render() {
    const { visible, processStep, deptList, deptUserList } = this.props;
    const { selectedRowKeys, selUserList } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onDeptUserCheck,
    };

    return (
      <Modal
        title="결재선지정"
        visible={visible}
        onOk={this.handleComplete}
        onCancel={this.handleCloseModal}
        width="55%"
        style={{ top: 50 }}
        footer={[
          <StyledButton key="close" onClick={this.handleCloseModal}>
            취소
          </StyledButton>,
          <StyledButton key="ok" className="btn-primary" onClick={this.handleComplete}>
            확인
          </StyledButton>,
        ]}
        destroyOnClose
      >
        <StyledWorkProcessModal>
          <Row gutter={0}>
            <Col span={10}>
              <div className="basicWrapper deptWrapper">
                <div className="deptTree">
                  {deptList.length > 0 && (
                    <Tree
                      checkable
                      defaultExpandedKeys={[`${deptList[0].DEPT_ID}`]}
                      onSelect={this.onTreeNodeSelect}
                      onCheck={this.onTreeNodeCheck}
                      treeData={getTreeData(deptList)}
                    />
                  )}
                </div>
                <div className="userList">
                  <Table
                    rowSelection={rowSelection}
                    columns={this.getColumns()}
                    dataSource={deptUserList.map(item => ({
                      ...item,
                      key: item.USER_ID,
                    }))}
                    pagination={false}
                    size="small"
                    // scroll
                    scroll={{ y: 296 }}
                  />
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className="btnWrapper">
                <ul>
                  {processStep.length > 0 &&
                    processStep.map(item => {
                      if (item.PARENT_PRC_RULE_ID !== 0) {
                        return (
                          <li key={`btn_${item.NODE_ID}`}>
                            <StyledButton className="btn-gray btn_sm" onClick={() => this.handleAddUser(item.NODE_ID)}>
                              {item.NODE_NAME_KOR} 추가
                            </StyledButton>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </Col>
            <Col span={10}>
              <div className="basicWrapper selectedWrapper">
                {processStep.length > 0 &&
                  processStep.map(item => {
                    if (item.PARENT_PRC_RULE_ID !== 0) {
                      return (
                        <div key={`sel_${item.NODE_ID}`}>
                          <Table
                            columns={this.getSelColumns(item.NODE_ID, item.NODE_NAME_KOR)}
                            dataSource={selUserList.filter(user => user.NODE_ID === item.NODE_ID)}
                            pagination={false}
                            size="small"
                            scroll={{ y: 157 }}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </Col>
          </Row>
        </StyledWorkProcessModal>
      </Modal>
    );
  }
}

WorkProcessModal.propTypes = {
  visible: PropTypes.bool,
  processStep: PropTypes.array,
  onComplete: PropTypes.func,
  onCloseModal: PropTypes.func,
  deptList: PropTypes.array,
  deptUserList: PropTypes.array,
  getDeptList: PropTypes.func,
  getDeptUserList: PropTypes.func,
  initDeptUserList: PropTypes.func,
};

WorkProcessModal.defaultProps = {
  visible: false,
  processStep: [],
  deptList: [],
  deptUserList: [],
};

const mapStateToProps = createStructuredSelector({
  deptList: selectors.makeSelectDeptList(),
  deptUserList: selectors.makeSelectDeptUserList(),
});

const mapDispatchToProps = dispatch => ({
  getDeptList: payload => dispatch(actions.getDeptList(payload)),
  getDeptUserList: deptId => dispatch(actions.getDeptUserList(deptId)),
  initDeptUserList: () => dispatch(actions.initDeptUserList()),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.WorkProcess.WorkProcessModal',
  reducer,
});
const withSaga = injectSaga({
  key: 'apps.WorkFlow.WorkProcess.WorkProcessModal',
  saga,
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(WorkProcessModal);
