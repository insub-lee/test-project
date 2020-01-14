import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Tree, Table, List } from 'antd';
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
      checkedKeys: [],
      selectedRowKeys: [],
      selDataList: [],
    };
  }

  componentDidMount() {
    this.props.getDeptList({});
    const tempUserList = [];
    const { processRule } = this.props;
    const { DRAFT_PROCESS_STEP: processStep } = processRule;
    processStep.forEach(item => {
      item.APPV_MEMBER.forEach(user => {
        tempUserList.push({
          ...user,
          NODE_ID: item.NODE_ID,
        });
      });
    });

    if (processRule.DRAFT_RECEIVE !== undefined && processRule.DRAFT_RECEIVE.APPV_MEMBER.length > 0) {
      processRule.DRAFT_RECEIVE.APPV_MEMBER.forEach(user => {
        tempUserList.push({
          ...user,
          NODE_ID: processRule.DRAFT_RECEIVE.NODE_ID,
        });
      });
    }

    if (processRule.DRAFT_REFER !== undefined && processRule.DRAFT_REFER.APPV_MEMBER.length > 0) {
      processRule.DRAFT_REFER.APPV_MEMBER.forEach(user => {
        tempUserList.push({
          ...user,
          NODE_ID: processRule.DRAFT_REFER.NODE_ID,
        });
      });
    }

    this.setState({ selDataList: tempUserList });
  }

  onTreeNodeSelect = (selectedKeys, info) => {
    if (selectedKeys !== undefined && selectedKeys.length > 0) {
      this.props.getDeptUserList(selectedKeys[0]);
    } else {
      this.props.initDeptUserList();
    }
  };

  onTreeNodeCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys });
  };

  onDeptUserCheck = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleAddUser = (nodeId, nodeType) => {
    if (nodeType === 'ND') {
      const { checkedKeys } = this.state;
      const { deptList } = this.props;
      const selectedDept = deptList.filter(dept => checkedKeys.includes(`${dept.DEPT_ID}`));

      this.setState(prevState => {
        const { selDataList } = prevState;
        selectedDept.forEach(dept => {
          if (selDataList.filter(item => item.NODE_ID === nodeId && dept.DEPT_ID === item.DEPT_ID).length === 0) {
            selDataList.push({
              NODE_ID: nodeId,
              DEPT_ID: dept.DEPT_ID,
              DEPT_NAME_KOR: dept.NAME_KOR,
            });
          }
        });
        return {
          selDataList,
          checkedKeys: [],
        };
      });
    } else {
      const { selectedRowKeys } = this.state;
      const { deptUserList } = this.props;
      const selectedUser = deptUserList.filter(user => selectedRowKeys.includes(user.USER_ID));

      this.setState(prevState => {
        const { selDataList } = prevState;
        selectedUser.forEach(user => {
          if (selDataList.filter(item => item.NODE_ID === nodeId && user.USER_ID === item.USER_ID).length === 0) {
            selDataList.push({
              NODE_ID: nodeId,
              USER_ID: user.USER_ID,
              NAME_KOR: user.NAME_KOR,
              PSTN_NAME_KOR: user.PSTN_NAME_KOR,
              DEPT_ID: user.DEPT_ID,
              DEPT_NAME_KOR: user.DEPT_NAME_KOR,
            });
          }
        });
        return {
          selDataList,
          selectedRowKeys: [],
        };
      });
    }
  };

  handleDeleteSelectedUser = (row, nodeType) => {
    this.setState(prevState => {
      const { selDataList } = prevState;
      let selectedIdx = -1;
      if (nodeType === 'ND') {
        selectedIdx = selDataList.findIndex(item => item.NODE_ID === row.NODE_ID && item.DEPT_ID === row.DEPT_ID);
      } else {
        selectedIdx = selDataList.findIndex(item => item.NODE_ID === row.NODE_ID && item.USER_ID === row.USER_ID);
      }
      selDataList.splice(selectedIdx, 1);
      return {
        selDataList,
      };
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedRowKeys: [],
      selDataList: [],
    });
    this.props.initDeptUserList();
    this.props.onCloseModal();
  };

  handleComplete = () => {
    const { processRule } = this.props;
    const { DRAFT_PROCESS_STEP: processStep } = processRule;
    const { selDataList } = this.state;
    processStep.map(item => {
      item.APPV_MEMBER.splice(0, item.APPV_MEMBER.length);
      selDataList.forEach(user => {
        if (item.NODE_ID === user.NODE_ID) {
          item.APPV_MEMBER.push(user);
        }
      });
    });

    // processRule.DRAFT_RECEIVE.APPV_MEMBER = [];
    // processRule.DRAFT_REFER.APPV_MEMBER = [];
    // selDataList.forEach(item => {
    //   if (processRule.DRAFT_RECEIVE.NODE_ID === item.NODE_ID) {
    //     processRule.DRAFT_RECEIVE.APPV_MEMBER.push(item);
    //   }
    //   if (processRule.DRAFT_REFER.NODE_ID === item.NODE_ID) {
    //     processRule.DRAFT_REFER.APPV_MEMBER.push(item);
    //   }
    // });

    this.props.onComplete(processRule);
  };

  getColumns = () => [
    {
      title: '',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      render: (text, record) => <span>{`${record.NAME_KOR} ${record.PSTN_NAME_KOR}`}</span>,
    },
  ];

  render() {
    const { visible, processRule, deptList, deptUserList } = this.props;
    const { checkedKeys, selectedRowKeys, selDataList } = this.state;
    const { DRAFT_PROCESS_STEP: processStep } = processRule;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onDeptUserCheck,
    };
    console.debug(this.props);
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
        maskClosable={false}
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
                      checkedKeys={checkedKeys}
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
                    processStep.filter(x => x.APPV_METHOD == 1).map(item => {
                      if (item.PARENT_PRC_RULE_ID !== 0 && item.NODE_TYPE !== 'NS') {
                        return (
                          <li key={`btn_${item.NODE_ID}`}>
                            <StyledButton className="btn-gray btn_sm" onClick={() => this.handleAddUser(item.NODE_ID, item.NODE_TYPE)}>
                              {`${item.NODE_NAME_KOR} >>`}
                            </StyledButton>
                          </li>
                        );
                      }
                    })}
                  {/* {processRule.DRAFT_RECEIVE !== undefined && (
                    <li>
                      <StyledButton
                        className="btn-gray btn_sm"
                        onClick={() => this.handleAddUser(processRule.DRAFT_RECEIVE.NODE_ID, processRule.DRAFT_RECEIVE.NODE_TYPE)}
                      >
                        {processRule.DRAFT_RECEIVE.NODE_NAME_KOR} 추가
                      </StyledButton>
                    </li>
                  )}
                  {processRule.DRAFT_REFER !== undefined && (
                    <li>
                      <StyledButton
                        className="btn-gray btn_sm"
                        onClick={() => this.handleAddUser(processRule.DRAFT_REFER.NODE_ID, processRule.DRAFT_REFER.NODE_TYPE)}
                      >
                        {processRule.DRAFT_REFER.NODE_NAME_KOR} 추가
                      </StyledButton>
                    </li>
                  )} */}
                </ul>
              </div>
            </Col>
            <Col span={10}>
              <div className="basicWrapper selectedWrapper">
                {processStep.length > 0 &&
                  processStep.filter(x => x.APPV_METHOD == 1).map(item => {
                    if (item.PARENT_PRC_RULE_ID !== 0 && item.NODE_TYPE !== 'NS') {
                      return (
                        <React.Fragment key={`node_${item.NODE_ID}`}>
                          <h4>{item.NODE_NAME_KOR}</h4>
                          <ul>
                            {selDataList.map(user => {
                              if (item.NODE_ID === user.NODE_ID) {
                                return (
                                  <li>
                                    <span>{item.NODE_TYPE === 'ND' ? `- ${user.DEPT_NAME_KOR}` : `- ${user.NAME_KOR} ${user.PSTN_NAME_KOR}`}</span>
                                    <button type="button" onClick={() => this.handleDeleteSelectedUser(user, item.NODE_TYPE)}>
                                      {` X `}
                                    </button>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </React.Fragment>
                      );
                    }
                  })}
                {/* {processRule.DRAFT_RECEIVE !== undefined && (
                  <React.Fragment>
                    <h4>{processRule.DRAFT_RECEIVE.NODE_NAME_KOR}</h4>
                    <ul>
                      {selDataList.map(item => {
                        if (processRule.DRAFT_RECEIVE.NODE_ID === item.NODE_ID) {
                          return (
                            <li>
                              <span>
                                {processRule.DRAFT_RECEIVE.NODE_TYPE === 'ND' ? `- ${item.DEPT_NAME_KOR}` : `- ${item.NAME_KOR} ${item.PSTN_NAME_KOR}`}
                              </span>
                              <button type="button" onClick={() => this.handleDeleteSelectedUser(item, processRule.DRAFT_RECEIVE.NODE_TYPE)}>
                                {` X `}
                              </button>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </React.Fragment>
                )}
                {processRule.DRAFT_REFER !== undefined && (
                  <React.Fragment>
                    <h4>{processRule.DRAFT_REFER.NODE_NAME_KOR}</h4>
                    <ul>
                      {selDataList.map(item => {
                        if (processRule.DRAFT_REFER.NODE_ID === item.NODE_ID) {
                          return (
                            <li>
                              <span>{processRule.DRAFT_REFER.NODE_TYPE === 'ND' ? `- ${item.DEPT_NAME_KOR}` : `- ${item.NAME_KOR} ${item.PSTN_NAME_KOR}`}</span>
                              <button type="button" onClick={() => this.handleDeleteSelectedUser(item, processRule.DRAFT_REFER.NODE_TYPE)}>
                                {` X `}
                              </button>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </React.Fragment>
                )} */}
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
  processRule: PropTypes.object,
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
  processRule: {},
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
