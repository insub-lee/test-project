/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tree, Row, Col, Checkbox, Icon, message, Input } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import UserSelectWrapper from 'components/BizBuilder/styled/Wrapper/UserSelectWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

const AntdSearchInput = StyledSearchInput(Input.Search);

// Component Attribute 및 Event Method 정리
// <UserSelect
//   initUserList={this.state.selectedUserList}  **초기값 셋팅 int[] USER_ID 배열값
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
    deptUserList: [],
    checkUserList: [],
    selectedUserList: [],
    isMulti: true,
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
    const apiAry = [{ key: 'deptList', url: '/api/common/v1/account/deptSelectList', type: 'POST', params: { PARAM: { ROOT_DEPT_ID: 72761 } } }];
    getCallDataHandler(sagaKey, apiAry);
  };

  componentDidMount() {
    const { initUserList, treeDataSource, isMultiSelect } = this.props;
    console.debug('initUserList', initUserList, isMultiSelect);
    this.setState({
      checkUserList: [],
      selectedUserList: [],
      isMulti: isMultiSelect === undefined ? true : isMultiSelect,
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
    const { isMulti } = this.state;
    this.setState(prevState => {
      const { checkUserList } = prevState;
      if (!isMulti && checkUserList.length >= 1 && checkUserList[0] !== e.target.value) {
        message.warning('복수의 사용자를 선택할 수 없습니다.!!');
        return { checkUserList };
      }
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
    const { checkUserList, selectedUserList, isMulti } = this.state;
    const nUserList = userDataList || (result && result.userList && result.userList.list);
    if (isMulti) {
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
    } else {
      const selectedUser = nUserList.filter(user => user.USER_ID === checkUserList[0]);
      this.setState({ selectedUserList: selectedUser, checkUserList: [] });
    }
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

  onSearchUserByName = val => {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'userList',
      url: `/api/common/v1/account/userSearchList`,
      type: 'POST',
      params: {
        PARAM: { USER_NAME: val },
      },
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, () => {});
  };

  onCheckUserAll = e => {
    let checkUserList = [];
    if (e.target.checked) {
      const { userDataList, result } = this.props;
      const list = userDataList || (result && result.userList && result.userList.list) || [];
      checkUserList = list.map(item => item.USER_ID);
    }
    this.setState({ checkUserList });
  };

  render() {
    const { treeDataSource, userDataList, result } = this.props;
    const { isMulti } = this.state;
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
                  header={
                    <>
                      {isMulti && (
                        <Checkbox
                          style={{ marginRight: 4 }}
                          onChange={this.onCheckUserAll}
                          checked={
                            this.state.checkUserList &&
                            this.state.checkUserList.length > 0 &&
                            (this.state.checkUserList || []).length === (userDataList || (result && result.userList && result.userList.list) || []).length
                          }
                        />
                      )}
                      사용자 선택
                      <AntdSearchInput
                        className="input-search-sm"
                        style={{ width: 146, marginLeft: 4 }}
                        onPressEnter={e => this.onSearchUserByName(e.target.value)}
                        onSearch={val => this.onSearchUserByName(val)}
                      />
                    </>
                  }
                  size="small"
                  dataSource={userDataList || (result && result.userList && result.userList.list)}
                  bordered
                  renderItem={item => (
                    <List.Item>
                      <Checkbox onChange={this.onCheckUser} checked={this.state.checkUserList.filter(x => item.USER_ID === x).length > 0} value={item.USER_ID}>
                        {item.NAME_KOR}/{item.DEPT_NAME_KOR}[{item.PSTN_NAME_KOR}]
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
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-10">
          <StyledButton className="btn-sm btn-primary mr5" onClick={this.onRegist}>
            등록
          </StyledButton>
          <StyledButton className="btn-sm btn-light" onClick={this.onCancelUserSelect}>
            취소
          </StyledButton>
        </StyledButtonWrapper>
      </UserSelectWrapper>
    );
  }
}
UserSelectComp.propTypes = {
  selectedDeptId: PropTypes.number,
  selectedUserList: PropTypes.array,
  initUserList: PropTypes.array,
};

UserSelectComp.defaultProps = {
  selectedDeptId: -1,
};

export default UserSelectComp;
