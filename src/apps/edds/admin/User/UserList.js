import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import UserView from './UserView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class UserList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
  };

  componentDidMount() {
    this.initList();
  }

  initList = () => {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  };

  onClickRow = (record, rowIndex) => {
    this.setState({
      selectedRow: record,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false }, () => {
      this.initList();
    });
  };

  columns = [
    // {
    //   title: '사용자ID',
    //   dataIndex: 'EMP_NO',
    //   key: 'EMP_NO',
    //   align: 'center',
    //   width: '12%',
    // },
    {
      title: '사용자명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '10%',
    },
    {
      title: '회사',
      dataIndex: 'COMPANY_NAME',
      key: 'COMPANY_NAME',
      align: 'center',
    },
    {
      title: '직위',
      dataIndex: 'PSTN_NAME',
      key: 'PSTN_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: '전화번호',
      dataIndex: 'MOBILE_TEL_NO',
      key: 'MOBILE_TEL_NO',
      align: 'center',
      width: '12%',
    },
    {
      title: '이메일',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
    },
    {
      title: '요청일자',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const { result } = this.props;
    const list = result && result.userList && result.userList.list ? result.userList.list : [];

    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="사용자 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <UserView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: `KEY_${item.USER_ID}` }))}
            columns={this.columns}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              },
            })}
            bordered
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

UserList.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

UserList.defaultProps = {
  id: 'userList',
  apiAry: [
    {
      key: 'userList',
      url: '/api/edds/v1/common/eddsUserList',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    requesterList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default UserList;
