/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tree, Row, Col, Checkbox, Button, Icon, Modal } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledButton from 'apps/mdcs/styled/StyledButton';

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

class UserSelectComp extends Component {
  state = {
    checkUserList: [],
    selectedUserList: [],
  };

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
    const apiAry = [{ key: 'deptList', url: '/api/common/v1/account/getDeptList', type: 'GET', params: {} }];
    getCallDataHandler(sagaKey, apiAry);
  };

  componentDidMount() {
    console.debug('component didmount');
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
    });
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
    const { onTreeSelect, sagaKey, getCallDataHandler } = this.props;
    if (typeof onTreeSelect === 'function') {
      this.props.onTreeSelect(selectedKeys);
    } else if (selectedKeys.length > 0) {
      const apiAry = [{ key: 'userList', url: `/api/common/v1/account/deptUser/${selectedKeys}`, type: 'POST', params: {} }];
      getCallDataHandler(sagaKey, apiAry);
    }
  };

  render() {
    const { treeDataSource, userDataList, result } = this.props;
    return (
      <div>
        <Row gutter={24}>
          <Col span={6} style={{ width: '250px' }}>
            {treeDataSource ? (
              <Tree defaultExpandedKeys={[`${getTreeData(treeDataSource)[0].key}`]} onSelect={this.props.onTreeSelect} treeData={getTreeData(treeDataSource)} />
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
          </Col>
          <Col span={6}>
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
          </Col>
          <Col style={{ width: '120px' }} span={4}>
            <Button type="primary" onClick={() => this.onSelectedUser()}>
              Add
              <Icon type="double-right" />
            </Button>
          </Col>
          <Col span={8}>
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
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'right' }}>
            <StyledButton className="btn-sm btn-gray" onClick={this.props.onCancel}>
              취소
            </StyledButton>
            <StyledButton className="btn-sm btn-" onClick={() => this.props.onUserSelectedComplete(this.state.selectedUserList)}>
              등록
            </StyledButton>
          </Col>
        </Row>
      </div>
    );
  }
}
UserSelectComp.propTypes = {
  selectedDeptId: PropTypes.number,
  selectedUserList: PropTypes.array,
};

UserSelectComp.defaultProps = {
  selectedDeptId: -1,
  selectedUserList: [],
};

export default UserSelectComp;
