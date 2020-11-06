import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fromJS } from 'immutable';
import { Row, Col, Tree, Table, Button, Icon, Input } from 'antd';
import { CloseCircleOutlined, AuditOutlined, WarningOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdPointTable from 'components/BizBuilder/styled/Table/StyledAntdPointTable';
import StyledWorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal/StyledWorkProcessModal';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import * as DraftNode from 'apps/Workflow/WorkFlowBase/Nodes/Constants/approveconst';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

const AntdPointTable = StyledAntdPointTable(Table);
const AntdSearchInput = StyledSearchInput(Input.Search);

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

class BuilderProcessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootKey: [],
      prcStep: [],
      selectedUserKeys: [],
      selectedDeptKeys: [],
      deptList: [],
      deptUserList: [],
      visible: false,
      curDistDeptList: [],
      tabIdx: 1,
    };
  }

  initDeptList = deptList => {
    const rootKey = deptList.filter(f => f.PRNT_ID === -1).map(n => n.DEPT_ID.toString());
    this.setState({ deptList, rootKey });
  };

  componentDidMount() {
    const { getDeptList, processRuleProc } = this.props;
    const processStep = fromJS(processRuleProc.DRAFT_PROCESS_STEP).toJS();
    const tmpPrcStep = processStep.filter(f => f.APPV_METHOD === 1 && f.PARENT_PRC_RULE_ID !== 0 && f.NODE_TYPE !== 'NS');
    this.setState({ prcStep: tmpPrcStep });
    getDeptList(this.initDeptList);
  }

  initDeptUserList = deptUserList => {
    this.setState({ deptUserList });
  };

  onTreeNodeSelect = (selectedKeys, info) => {
    const { getDeptUserList } = this.props;
    if (selectedKeys !== undefined && selectedKeys.length > 0) {
      getDeptUserList(selectedKeys[0], this.initDeptUserList);
    } else {
      this.setState({ deptUserList: [] });
    }
  };

  onTreeNodeCheck = checkedKeys => {
    this.setState({ selectedDeptKeys: checkedKeys });
  };

  onDeptUserCheck = selectedUserKeys => {
    this.setState({ selectedUserKeys });
  };

  getColumns = () => {
    let columns = [
      {
        title: '사용자 정보',
        dataIndex: 'USER_ID',
        key: 'USER_ID',
        render: (text, record) => (
          <span>
            <UserOutlined />
            {`${record.NAME_KOR}/${record.PSTN_NAME_KOR}`}
          </span>
        ),
      },
    ];

    if (this.state.tabIdx === 1) {
      columns = [
        {
          title: '사용자 정보',
          dataIndex: 'USER_ID',
          key: 'USER_ID',
          align: 'left',
          children: [
            {
              title: (
                <AntdSearchInput
                  placeholder="사용자 검색"
                  className="input-search-sm"
                  onSearch={val => this.onSearchUser(val)}
                  onPressEnter={e => this.onSearchUser(e.target.value)}
                />
              ),
              dataIndex: 'USER_ID',
              align: 'left',
              width: 150,
              ellipsis: true,
              render: (text, record) => (
                <span>
                  <UserOutlined />
                  {`${record.NAME_KOR} ${record.PSTN_ID !== -1 ? record.PSTN_NAME_KOR : ''}/${record.DEPT_NAME_KOR}`}
                </span>
              ),
            },
          ],
        },
      ];
    }
    return columns;
  };

  handleCloseModal = () => {
    this.setState({ visible: false });
  };

  handleComplete = () => {
    const { onComplete, processRuleProc } = this.props;
    const { prcStep } = this.state;

    const { DRAFT_PROCESS_STEP } = processRuleProc;
    const nProcStep = DRAFT_PROCESS_STEP.map(step => {
      const idx = prcStep.findIndex(f => f.PRC_RULE_ID === step.PRC_RULE_ID);
      if (idx > -1) return prcStep[idx];
      return step;
    });
    const tmpProc = { ...processRuleProc, DRAFT_PROCESS_STEP: nProcStep };
    onComplete(tmpProc);
  };

  handleAddUser = (prcRuleId, nodeId, nodeType) => {
    const { prcStep, selectedDeptKeys, deptList, selectedUserKeys, deptUserList } = this.state;

    const tmpPrcStep = prcStep.map(step => {
      const { APPV_MEMBER: appvMember } = step;
      if (step.PRC_RULE_ID === prcRuleId) {
        if (step.NODE_ID === DraftNode.DIST_NODE) {
          // 부서정보 처리 하기
          const selectDeptIds = deptList.filter(f => selectedDeptKeys.includes(f.DEPT_ID.toString()));
          const selectDeptMember = selectDeptIds.reduce((retIds, deptId) => {
            const idx = retIds.findIndex(f => f.DEPT_ID === deptId.DEPT_ID);
            if (idx === -1) retIds.splice(0, 0, { DEPT_ID: deptId.DEPT_ID, DEPT_NAME_KOR: deptId.NAME_KOR, ISFIXED: 'N' });
            return retIds;
          }, appvMember);
          return { ...step, APPV_MEMBER: selectDeptMember };
        }
        // 사용자 처리
        const selectUserIds = deptUserList.filter(f => selectedUserKeys.includes(f.USER_ID));
        const selectMember = selectUserIds.reduce((retIds, userId) => {
          const idx = retIds.findIndex(f => f.USER_ID === userId.USER_ID);
          if (idx === -1)
            retIds.splice(0, 0, {
              USER_ID: userId.USER_ID,
              NAME_KOR: userId.NAME_KOR,
              PSTN_NAME_KOR: userId.PSTN_NAME_KOR,
              DEPT_ID: userId.DEPT_ID,
              DEPT_NAME_KOR: userId.DEPT_NAME_KOR,
              ISFIXED: 'N',
            });
          return retIds;
        }, appvMember);
        return { ...step, APPV_MEMBER: selectMember };
      }
      return step;
    });
    this.setState({ prcStep: tmpPrcStep, selectedDeptKeys: [], selectedUserKeys: [] });
  };

  handleDeleteSelectedUser = (user, nodeId) => {
    const { prcStep } = this.state;
    const tempPrcStep = prcStep.map(step => {
      if (step.NODE_ID === nodeId) {
        const { APPV_MEMBER: appvList } = step;
        const idx = appvList.findIndex(f => f.USER_ID === user.USER_ID);
        if (idx > -1) appvList.splice(idx, 1);
      }
      return step;
    });
    this.setState({ prcStep: tempPrcStep });
  };

  onSearchUser = val => {
    if (!val || val === '' || val.length === 0) {
      this.setState({ deptUserList: [] });
      return false;
    }
    const { getUserListByName } = this.props;
    const payload = {
      USER_NAME: val,
    };

    getUserListByName(payload, response => {
      this.setState({ deptUserList: response.list }, () => {});
    });
  };

  onClickTab = tabIdx => {
    this.setState({
      tabIdx,
      deptUserList: [],
      selectedUserKeys: [],
      selectedDeptKeys: [],
    });
  };

  render() {
    const { customBtnText } = this.props;
    const { prcStep, selectedUserKeys, selectedDeptKeys, deptList, deptUserList, rootKey, tabIdx } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedUserKeys,
      onChange: this.onDeptUserCheck,
    };
    return (
      <StyledWorkProcessModal>
        <Row gutter={0}>
          <Col span={7}>
            <div className="basicWrapper deptWrapper">
              <div className="tabButtonWrapper">
                <Button className={tabIdx === 0 ? 'on' : ''} onClick={() => this.onClickTab(0)}>
                  전체
                </Button>
                <Button className={tabIdx === 1 ? 'on' : ''} onClick={() => this.onClickTab(1)}>
                  사용자
                </Button>
              </div>
              <div className="tabContentsWrapper">
                <div className="deptTree" style={{ display: `${tabIdx !== 0 ? 'none' : ''}` }}>
                  {tabIdx === 0 && deptList.length > 0 && (
                    <Tree
                      checkable
                      autoExpandParent={false}
                      defaultExpandedKeys={rootKey}
                      checkedKeys={selectedDeptKeys}
                      onSelect={this.onTreeNodeSelect}
                      onCheck={this.onTreeNodeCheck}
                      treeData={getTreeData(deptList)}
                      onExpand={this.onExpand}
                    />
                  )}
                </div>
                <div className="userList">
                  <AntdPointTable
                    rowSelection={rowSelection}
                    columns={this.getColumns()}
                    dataSource={deptUserList.map(item => ({
                      ...item,
                      key: item.USER_ID,
                    }))}
                    rowKey="USER_ID"
                    pagination={false}
                    size="small"
                    // scroll
                    scroll={{ y: tabIdx === 1 ? 395 : 220 }}
                    className={`${tabIdx === 1 ? 'non-top-border' : ''} page-custom`}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="btnWrapper">
              <ul>
                {prcStep.map(item => (
                  <li key={`btn_${item.NODE_ID}`}>
                    <StyledButton
                      className="btn-light btn-sm"
                      ghost
                      style={{ width: '150px' }}
                      onClick={() => this.handleAddUser(item.PRC_RULE_ID, item.NODE_ID, item.NODE_TYPE)}
                    >
                      {customBtnText ? item?.RULE_CONFIG?.Label : item.NODE_NAME_KOR}
                      <Icon type="double-right" />
                    </StyledButton>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col span={12}>
            <div className="basicWrapper selectedWrapper">
              {prcStep.map(item => (
                <React.Fragment key={`node_${item.NODE_ID}`}>
                  <h4>
                    <AuditOutlined />
                    {customBtnText ? item?.RULE_CONFIG?.Label : item.NODE_NAME_KOR}
                  </h4>
                  <ul>
                    {item.APPV_MEMBER.length > 0 ? (
                      item.APPV_MEMBER.map(user => (
                        <li key={user.USER_ID}>
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
                            <button type="button" onClick={() => this.handleDeleteSelectedUser(user, item.NODE_ID)}>
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
        <div className="applyButtonWrapper">
          <StyledButton className="btn-primary btn-sm" onClick={this.handleComplete}>
            적용
          </StyledButton>
        </div>
      </StyledWorkProcessModal>
    );
  }
}

BuilderProcessModal.propTypes = {
  visible: PropTypes.bool,
  processRule: PropTypes.object,
  onComplete: PropTypes.func,
  onCloseModal: PropTypes.func,
  deptList: PropTypes.array,
  deptUserList: PropTypes.array,
  getDeptList: PropTypes.func,
  getDeptUserList: PropTypes.func,
  initDeptUserList: PropTypes.func,
  customBtnText: PropTypes.bool, // true : RULE_CONFIG에서 Label값을 꺼내 버튼 text로 채움, false : NODE_NAME_KOR
};

BuilderProcessModal.defaultProps = {
  visible: false,
  processRule: {},
  deptList: [],
  deptUserList: [],
  customBtnText: false,
};

const mapStateToProps = createStructuredSelector({
  deptList: selectors.makeSelectDeptList(),
  deptUserList: selectors.makeSelectDeptUserList(),
});

const mapDispatchToProps = dispatch => ({
  getDeptList: payload => dispatch(actions.getDeptList(payload)),
  getDeptUserList: (deptId, callbackFunc) => dispatch(actions.getDeptUserList(deptId, callbackFunc)),
  initDeptUserList: () => dispatch(actions.initDeptUserList()),
  submitHandlerBySaga: (id, httpMethod, apiUrl, submitData, callbackFunc) =>
    dispatch(actions.submitHandlerBySaga(id, httpMethod, apiUrl, submitData, callbackFunc)),
  getUserListByName: (payload, callbackFunc) => dispatch(actions.getUserListByName(payload, callbackFunc)),
  getDeptListByName: (payload, callbackFunc) => dispatch(actions.getDeptListByName(payload, callbackFunc)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.WorkProcess.BuilderProcessModal',
  reducer,
});
const withSaga = injectSaga({
  key: 'apps.WorkFlow.WorkProcess.BuilderProcessModal',
  saga,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(BuilderProcessModal);
