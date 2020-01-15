import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import UserSelect from 'components/UserSelect';

const AntdTable = StyledAntdTable(Table);

class List extends Component {
  state = {
    isShow: false,
    selectedDeptId: -1,
    selectedUserList: [],
  };

  componentDidMount() {
    const { id, apiAry, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiAry, () => {});
  }

  onClickDept = dept => {
    const aryUserIds = dept.USERIDS && dept.USERIDS.length > 0 ? dept.USERIDS.split(',') : [];
    this.setState({
      isShow: true,
      selectedDeptId: dept.DEPT_ID,
      selectedUserList: aryUserIds,
    });
    this.onTreeSelect(dept.DEPT_ID);
  };

  getTableColumns = () => [
    {
      title: '부서',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '15%',
      render: (text, record) => (
        <div>
          {text}
          <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickDept(record)}>
            <Icon type="edit" />
          </StyledButton>
        </div>
      ),
    },
    {
      title: '부서 담당자',
      dataIndex: 'MGRLIST',
      key: 'MGRLIST',
    },
  ];

  onTreeSelect = selectKeys => {
    const { id, getCallDataHanlder } = this.props;
    const apiAry = [
      {
        key: 'userList',
        url: `/api/common/v1/account/deptUser/${selectKeys}`,
        type: 'POST',
        params: {},
      },
    ];
    getCallDataHanlder(id, apiAry);
  };

  onUserSelect = result => {
    this.setState({
      selectedDeptId: result,
    });
  };

  onCancel = () => {
    this.setState({
      isShow: false,
    });
  };

  onSaveComplete = id => {
    const { apiAry, getCallDataHanlder } = this.props;
    getCallDataHanlder(id, apiAry, () => {});
    this.setState({
      isShow: false,
    });
  };

  onUserSelectedComplete = result => {
    const { id, submitHadnlerBySaga } = this.props;
    const apiUrl = '/api/mdcs/v1/common/distribute/DistributeDeptMgnt';
    const userIds = result.map(userInfo => userInfo.USER_ID);
    const submitData = {
      PARAM: {
        DEPT_ID: this.state.selectedDeptId,
        USER_IDS: userIds,
      },
    };
    submitHadnlerBySaga(id, 'POST', apiUrl, submitData, this.onSaveComplete);
  };

  render() {
    const { result, id } = this.props;
    const { distDeptList } = result;
    console.debug('propsinfo!!!', this.props);
    if (distDeptList !== undefined) {
      const { list } = distDeptList;

      return (
        <div style={{ padding: '48px' }}>
          <Modal title="부서담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[]}>
            <UserSelect
              initUserList={this.state.selectedUserList}
              treeDataSource={list}
              userDataList={result.userList && result.userList.list}
              onTreeSelect={this.onTreeSelect}
              onUserSelectHandler={this.onUserSelect}
              onUserSelectedComplete={this.onUserSelectedComplete}
              onCancel={this.onCancel}
            />
          </Modal>
          <AntdTable columns={this.getTableColumns()} dataSource={list} pagination={false} bordered />
        </div>
      );
    }

    return '';
  }
}

List.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHanlder: PropTypes.func,
  submitHadnlerBySaga: PropTypes.func,
};

List.defaultProps = {
  id: 'distMgntList',
  apiAry: [
    {
      key: 'distDeptList',
      url: '/api/mdcs/v1/common/distribute/DistributeDeptMgnt',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    distDeptList: {
      list: [],
    },
  },
  getCallDataHanlder: () => {},
  formData: {},
  setFormData: () => {},
};

export default List;
