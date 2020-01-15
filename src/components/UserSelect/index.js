import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tree, Row, Col, Checkbox, Button, Icon } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledButton from 'apps/mdcs/styled/StyledButton';

const getTreeData = (deptList = []) => {
  if (deptList.length > 0) {
    return getTreeFromFlatData({
      flatData: deptList.map(item => ({
        title: item.NAME_KOR,
        value: `${item.DEPT_ID}`,
        key: `${item.DEPT_ID}`,
        parentValue: `${item.PRNT_ID}`,
      })),
      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: '-1',
    });
  }
  return [];
};

class UserSelectComp extends Component {
  state = {
    checkUserList: [],
    selectedUserList: [],
  };

  onInitComplete = () => {
    const { result } = this.props;
    const selectedUserList = result.initUserList && result.initUserList.userList;
    this.setState({
      selectedUserList,
    });
  };

  onInitUserSelect = () => {
    const { id, getCallDataHanlder, initUserList } = this.props;
    if (initUserList && initUserList.length > 0) {
      const param = {
        PARAM: {
          userIds: initUserList,
        },
      };
      const apiAry = [{ key: 'initUserList', url: '/api/common/v1/account/userInfoByUserIds', type: 'POST', params: param }];
      getCallDataHanlder(id, apiAry, this.onInitComplete);
    }
  };

  componentDidMount() {
    this.setState({
      checkUserList: [],
    });
    this.onInitUserSelect();
    console.debug('didmount');
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
    const { userDataList } = this.props;
    const { checkUserList } = this.state;
    this.setState(prevState => {
      const { selectedUserList } = prevState;
      const resultUserList = selectedUserList !== undefined ? selectedUserList : [];
      checkUserList.forEach(chkUser => {
        const idx = resultUserList.findIndex(user => user.USER_ID === chkUser);
        if (idx === -1) {
          const addUser = userDataList.filter(user => user.USER_ID === chkUser).length > 0 ? userDataList.filter(user => user.USER_ID === chkUser)[0] : {};
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

  render() {
    const { treeDataSource, userDataList } = this.props;
    return (
      <div>
        <Row gutter={24}>
          <Col span={6} style={{ width: '250px' }}>
            {treeDataSource && (
              <Tree defaultExpandedKeys={[`${getTreeData(treeDataSource)[0].key}`]} onSelect={this.props.onTreeSelect} treeData={getTreeData(treeDataSource)} />
            )}
          </Col>
          <Col span={6}>
            <List
              header="사용자 선택"
              size="small"
              dataSource={userDataList}
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
                  <Icon type="delete" onClick={() => this.onDelete(item.USER_ID)} />
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

const UserSelect = props => <BizMicroDevBase {...props} id="UserSelect" component={UserSelectComp} />;

export default UserSelect;
