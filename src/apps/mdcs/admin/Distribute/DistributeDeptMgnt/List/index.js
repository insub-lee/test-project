import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledSelectModal from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import UserSelect from 'components/UserSelect';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledSelectModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      selectedDeptId: -1,
      selectedUserList: [],
      selectedRowKeys: [],
      selectedRows: [],
      requiredDeptList: [],
      distDeptList: undefined,
    };
  }

  initDataBind = sagaKey => {
    const {
      result: { distDeptList, requiredDeptList },
    } = this.props;
    const { list: totalDeptList } = distDeptList;
    const { deptList } = requiredDeptList;

    const deptIds = deptList.map(dept => dept.DEPT_ID);
    const selectedRowKeys = totalDeptList.reduce((retValue, item, idx) => {
      if (deptIds.includes(item.DEPT_ID)) {
        retValue.push(idx);
      }
      return retValue;
    }, []);
    this.setState({ distDeptList: totalDeptList, requiredDeptList: deptList, selectedRowKeys, selectedRows: deptList });
  };

  componentDidMount() {
    const { sagaKey: id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, this.initDataBind);
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
          <StyledButton style={{ float: 'right' }} className="btn-light btn-sm2 btn-radius" onClick={() => this.onClickDept(record)}>
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
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'userList',
        url: `/api/common/v1/account/deptUser/${selectKeys}`,
        type: 'POST',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry);
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
    const { apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
    this.setState({
      isShow: false,
    });
  };

  onUserSelectedComplete = result => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const apiUrl = '/api/mdcs/v1/common/distribute/DistributeDeptMgnt';
    const userIds = result.map(userInfo => userInfo.USER_ID);
    const submitData = {
      PARAM: {
        DEPT_ID: this.state.selectedDeptId,
        USER_IDS: userIds,
      },
    };
    submitHandlerBySaga(id, 'POST', apiUrl, submitData, this.onSaveComplete);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onSaveCompleteDept = () => {
    message.success('적용 완료!');
  };

  onClickSave = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { selectedRows } = this.state;
    const url = '/api/mdcs/v1/common/distribute/distributeDeptHandler';
    const param = { PARAM: { deptList: selectedRows } };
    submitHandlerBySaga(id, 'POST', url, param, this.onSaveCompleteDept);
  };

  render() {
    const { result, sagaKey: id } = this.props;
    const { distDeptList } = this.state;

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    if (distDeptList !== undefined) {
      return (
        <div style={{ padding: '10px 15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '22px', fontWeight: '500', color: '#000' }}>
              <Icon type="form" /> 배포부서 담당자
              <StyledButton className="btn-gray btn-sm" style={{ marginLeft: '40px' }} onClick={this.onClickSave}>
                <SaveOutlined /> 필수 배포부서적용
              </StyledButton>
            </p>
          </div>
          <AntdModal title="부서담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[]}>
            <UserSelect
              initUserList={this.state.selectedUserList}
              // treeDataSource={distDeptList}
              userDataList={result.userList && result.userList.list}
              onTreeSelect={this.onTreeSelect}
              onUserSelectHandler={this.onUserSelect}
              onUserSelectedComplete={this.onUserSelectedComplete}
              onCancel={this.onCancel}
            />
          </AntdModal>
          <AntdTable rowSelection={rowSelection} columns={this.getTableColumns()} dataSource={distDeptList} pagination={false} bordered />
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
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
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
    {
      key: 'requiredDeptList',
      url: '/api/mdcs/v1/common/distribute/distributeDeptHandler',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    distDeptList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
  formData: {},
  setFormData: () => {},
};

export default List;
