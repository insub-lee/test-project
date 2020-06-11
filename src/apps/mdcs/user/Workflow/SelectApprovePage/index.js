import React, { Component } from 'react';
import { Modal, Row, Col, Tree, Table, Button, Icon } from 'antd';
import { CloseCircleOutlined, AuditOutlined, WarningOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledWorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal/StyledWorkProcessModal';
import { getTreeFromFlatData } from 'react-sortable-tree';

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

class SelectApprovePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      prcStep: [],
      selectedRowKeys: [],
      selectedDeptKeys: [],
    };
  }

  componentDidMount() {
    const { getDeptList, processRule, visible } = this.props;
    const { DRAFT_PROCESS_STEP: processStep } = processRule;
    const tmpPrcStep = processStep.filter(f => f.APPV_METHOD === 1 && f.PARENT_PRC_RULE_ID !== 0 && f.NODE_TYPE !== 'NS');
    getDeptList();
    this.setState({ prcStep: tmpPrcStep, visible });
  }

  onTreeNodeSelect = (selectedKeys, info) => {
    const { getDeptUserList, initDeptUserList } = this.props;
    if (selectedKeys !== undefined && selectedKeys.length > 0) {
      getDeptUserList(selectedKeys[0]);
    } else {
      initDeptUserList();
    }
  };

  onTreeNodeCheck = checkedKeys => {
    this.setState({ selectedDeptKeys: checkedKeys });
  };

  onDeptUserCheck = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  getColumns = () => [
    {
      title: '',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      render: (text, record) => <span>{`${record.NAME_KOR} ${record.PSTN_NAME_KOR}`}</span>,
    },
  ];

  handleCloseModal = () => {
    this.setState({ visible: false });
  };

  handleComplete = () => {};

  handleAddUser = (nodeId, nodeType) => {
    const { prcStep, selectedDeptKeys } = this.state;
    const { deptList } = this.props;
    const tmpPrcStep = prcStep.map(step => {
      let selectMember = [];
      if (step.NODE_ID === nodeId) {
        if (nodeType === 'ND') {
          // 부서정보 처리 하기
          const selectDeptIds = deptList.filter(f => selectedDeptKeys.includes(f.DEPT_ID.toString()));
          const { APPV_MEMBER: appvMember } = step;
          selectMember = selectDeptIds.reduce((retIds, deptId) => {
            const idx = retIds.findIndex(f => f.DEPT_ID === deptId.DEPT_ID);
            if (idx === -1) retIds.splice(0, 0, { DEPT_ID: deptId.DEPT_ID, DEPT_NAME_KOR: deptId.NAME_KOR, ISFIXED: 'N' });
            return retIds;
          }, appvMember);
        } else {
          // 사용자 정보 처리 하기
        }
      }
      return { ...step, APPV_MEMBER: selectMember };
    });
    this.setState({ prcStep: tmpPrcStep, selectedDeptKeys: [] });
  };

  render() {
    const { prcStep, visible, selectedRowKeys, selectedDeptKeys } = this.state;
    const { deptList, deptUserList } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onDeptUserCheck,
    };
    return (
      <Modal
        title="결재선지정"
        visible={visible}
        // onOk={this.handleComplete}
        // onCancel={this.handleCloseModal}
        width="70%"
        style={{ top: 50, height: '500px' }}
        footer={[
          <StyledButton key="close" className="btn-light btn-sm" onClick={this.handleCloseModal}>
            취소
          </StyledButton>,
          <StyledButton key="ok" className="btn-primary btn-sm" onClick={this.handleComplete}>
            확인
          </StyledButton>,
        ]}
        destroyOnClose
        maskClosable={false}
      >
        <StyledWorkProcessModal>
          <Row gutter={0}>
            <Col span={8}>
              <div className="basicWrapper deptWrapper">
                <div className="deptTree">
                  {deptList.length > 0 && (
                    <Tree
                      checkable
                      defaultExpandedKeys={[`${deptList[0].DEPT_ID}`]}
                      checkedKeys={selectedDeptKeys}
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
            <Col span={6}>
              <div className="btnWrapper">
                <ul>
                  {prcStep.map(item => (
                    <li key={`btn_${item.NODE_ID}`}>
                      <Button
                        type="primary"
                        ghost
                        style={{ width: '150px', float: 'right', margin: '5px' }}
                        onClick={() => this.handleAddUser(item.NODE_ID, item.NODE_TYPE)}
                      >
                        {item.NODE_NAME_KOR}
                        <Icon type="double-right" style={{ float: 'right', marginTop: '4px' }} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col span={10}>
              <div className="basicWrapper selectedWrapper">
                {prcStep.map(item => (
                  <React.Fragment key={`node_${item.NODE_ID}`}>
                    <h4>
                      <AuditOutlined />
                      {'  '}
                      {item.NODE_NAME_KOR}
                    </h4>
                    <ul>
                      {item.APPV_MEMBER.length > 0 ? (
                        item.APPV_MEMBER.map(user => (
                          <li>
                            <span>
                              {item.NODE_TYPE === 'ND' ? (
                                <div>
                                  <TeamOutlined /> {user.DEPT_NAME_KOR}
                                </div>
                              ) : (
                                <div>
                                  <UserOutlined /> {`${user.NAME_KOR}/${user.PSTN_NAME_KOR} (${user.DEPT_NAME_KOR}) `}
                                </div>
                              )}
                            </span>
                            {user.ISFIXED !== 'Y' && (
                              <button type="button" onClick={() => this.handleDeleteSelectedUser(user, item.NODE_TYPE)}>
                                <CloseCircleOutlined />
                              </button>
                            )}
                          </li>
                        ))
                      ) : (
                        <li>
                          <span>
                            <WarningOutlined /> 선택 결재정보 없음
                          </span>
                        </li>
                      )}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
            </Col>
          </Row>
        </StyledWorkProcessModal>
      </Modal>
    );
  }
}

export default SelectApprovePage;
