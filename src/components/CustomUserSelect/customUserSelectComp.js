/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tree, Row, Col, Checkbox, Icon } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import UserSelectWrapper from 'components/BizBuilder/styled/Wrapper/UserSelectWrapper';

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
//   isWorkBuilder=BizBuilderBase에서 사용시 true => 등록 취소 버튼 삭제
// ></UserSelect>

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

class CustomUserSelectComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkUserList: [],
      selectedUserList: [],
    };
  }

  onInitComplete = id => {
    const { result } = this.props;
    const selectedUserList = result.initUserList && result.initUserList.userList;
    this.setState({
      selectedUserList,
    });
  };

  onInitUserSelect = () => {
    const { sagaKey, getCallDataHandler, initUserList } = this.props;
    if (initUserList && initUserList.length > 0) {
      const param = {
        PARAM: {
          userIds: initUserList,
        },
      };
      const apiAry = [{ key: 'initUserList', url: '/api/common/v1/account/userInfoByUserIds', type: 'POST', params: param }];
      getCallDataHandler(sagaKey, apiAry, this.onInitComplete);
    }
  };

  onInitTreeData = () => {
    const { sagaKey, getCallDataHandler, removeReduxState } = this.props;
    removeReduxState(sagaKey);
    const apiAry = [{ key: 'deptList', url: '/api/common/v1/account/deptSelectList', type: 'POST', params: { PARAM: { ROOT_DEPT_ID: 72761 } } }];
    getCallDataHandler(sagaKey, apiAry);
  };

  componentDidMount() {
    const { initUserList, treeDataSource } = this.props;
    this.setState({
      checkUserList: [],
      selectedUserList: [],
    });
    !treeDataSource && this.onInitTreeData();
    initUserList && this.onInitUserSelect();
  }

  getColumns = () => [
    {
      title: '',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
      render: (text, record) => <span>{`${record.NAME_KOR} ${record.PSTN_NAME_KOR}`}</span>,
    },
  ];

  onCheckUser = e => {
    this.setState(prevState => {
      const { checkUserList } = prevState;
      const idx = checkUserList.findIndex(x => x === e.target.value);
      if (idx === -1) {
        checkUserList.splice(idx, 0, e.target.value);
      } else if (!e.target.checked) {
        checkUserList.splice(idx, 1);
      }
      return { checkUserList };
    });
  };

  onSelectedUser = () => {
    const { userDataList, result } = this.props;
    const { checkUserList } = this.state;
    const nUserList = userDataList || (result && result.userList && result.userList.list);

    this.setState(prevState => {
      const { selectedUserList } = prevState;
      const resultUserList = selectedUserList !== undefined ? selectedUserList : [];
      checkUserList.forEach(chkUser => {
        const idx = resultUserList.findIndex(user => user.USER_ID === chkUser);
        if (idx === -1) {
          const addUser = nUserList.filter(user => user.USER_ID === chkUser).length > 0 ? nUserList.filter(user => user.USER_ID === chkUser)[0] : {};
          resultUserList.push(addUser);
        }
      });
      return { selectedUserList: resultUserList, checkUserList: [] };
    }, this.props.onUserSelectHandler(this.state.selectedUserList));
  };

  onDelete = userId => {
    this.setState(
      prevState => {
        const { selectedUserList } = prevState;
        const idx = selectedUserList.findIndex(x => x.USER_ID === userId);
        selectedUserList.splice(idx, 1);
        return selectedUserList;
      },
      () => {
        if (this.props.onUserDelete) this.props.onUserDelete(userId);
      },
    );
  };

  onTreeSelect = selectedKeys => {
    const { onTreeSelect, sagaKey, getCallDataHandler, apiUrl } = this.props;
    if (typeof onTreeSelect === 'function') {
      this.props.onTreeSelect(selectedKeys);
    } else if (selectedKeys.length > 0) {
      const apiAry = [
        {
          key: 'userList',
          url: apiUrl ? `${apiUrl}/DEPT_ID=${selectedKeys}` : `/api/common/v1/account/deptUser/${selectedKeys}`,
          type: apiUrl ? 'GET' : 'POST',
          params: {},
        },
      ];
      getCallDataHandler(sagaKey, apiAry);
    }
  };

  onRegist = () => {
    this.props.onUserSelectedComplete(this.state.selectedUserList);
    this.clearPropData();
  };

  onCancelUserSelect = () => {
    this.clearPropData();
    this.props.onCancel();
  };

  clearPropData = () => {
    const { sagaKey, removeResponseDataReduxStateByKey } = this.props;
    this.setState({ selectedUserList: [] });
    removeResponseDataReduxStateByKey(sagaKey, 'userList');
  };

  render() {
    const { treeDataSource, userDataList, result, isWorkBuilder } = this.props;
    return (
      <UserSelectWrapper>
        <Row gutter={0}>
          <Col span={7}>
            <div className="basicWrapper treeWrapper">
              <div className="basicTitle">부서 선택</div>
              <div className="depthTree">
                {treeDataSource ? (
                  <Tree defaultExpandedKeys={[`${getTreeData(treeDataSource)[0].key}`]} onSelect={this.onTreeSelect} treeData={getTreeData(treeDataSource)} />
                ) : (
                  result &&
                  result.deptList &&
                  result.deptList.result && (
                    <Tree
                      defaultExpandedKeys={[`${getTreeData(result.deptList.result)[0].key}`]}
                      onSelect={this.onTreeSelect}
                      treeData={getTreeData(result.deptList.result)}
                    />
                  )
                )}
              </div>
            </div>
          </Col>
          <Col span={7}>
            <div className="basicWrapper userListWrapper">
              <div className="userList">
                <List
                  header="사용자 선택"
                  size="small"
                  dataSource={userDataList || (result && result.userList && result.userList.list)}
                  bordered
                  renderItem={item => (
                    <List.Item>
                      <Checkbox onChange={this.onCheckUser} checked={this.state.checkUserList.filter(x => item.USER_ID === x).length > 0} value={item.USER_ID}>
                        {item.NAME_KOR} [ {item.PSTN_NAME_KOR} ]
                      </Checkbox>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="userAddWrapper">
              <StyledButton className="btn-light btn-sm" onClick={() => this.onSelectedUser()}>
                Add
                <Icon type="double-right" />
              </StyledButton>
            </div>
          </Col>
          <Col span={7}>
            <div className="basicWrapper selectedUserWrapper">
              <List
                header="선택된 사용자"
                size="small"
                dataSource={this.state.selectedUserList}
                bordered
                renderItem={item => (
                  <List.Item>
                    <Checkbox>
                      {item.NAME_KOR} [ {item.PSTN_NAME_KOR} ] / {item.DEPT_NAME_KOR}
                    </Checkbox>
                    <Icon type="delete" onClick={() => this.onDelete(item.USER_ID)}></Icon>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <StyledButtonWrapper className="btn-wrap-center" style={{ display: isWorkBuilder ? 'none' : 'block' }}>
          <StyledButton className="btn-sm btn-gray mr5" onClick={this.onCancelUserSelect}>
            취소
          </StyledButton>
          <StyledButton className="btn-sm btn-primary" onClick={this.onRegist}>
            등록
          </StyledButton>
        </StyledButtonWrapper>
      </UserSelectWrapper>
    );
  }
}
CustomUserSelectComp.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  removeReduxState: PropTypes.func,
  treeDataSource: PropTypes.array,
  initUserList: PropTypes.array,
  isWorkBuilder: PropTypes.bool,
  userDataList: PropTypes.arrayOf('object'),
  result: PropTypes.object,
  onUserSelectHandler: PropTypes.func,
  onUserDelete: PropTypes.func,
  onTreeSelect: PropTypes.func,
  onUserSelectedComplete: PropTypes.func,
  onCancel: PropTypes.func,
  removeResponseDataReduxStateByKey: PropTypes.func,
  apiUrl: PropTypes.string,
};

CustomUserSelectComp.defaultProps = {
  selectedDeptId: -1,
  isWorkBuilder: false,
};

export default CustomUserSelectComp;
