import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input, DatePicker, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import UserView from './UserView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdRangePicker = StyledDatePicker(DatePicker.RangePicker);

class UserList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
    searchInfo: {},
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'userList',
        url: '/api/edds/v1/common/eddsUserList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo },
        },
      },
      {
        key: 'codeList',
        url: '/api/admin/v1/common/codeadmindtl',
        type: 'POST',
        params: {
          codeGrpCd: 'EMPSTATUS',
        },
      },
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, () => {
      spinningOff();
    });
  };

  onClickRow = (record, rowIndex) => {
    this.setState({
      selectedRow: record,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false }, () => {
      this.getList();
    });
  };

  columns = [
    {
      title: '사용자명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '12%',
    },
    {
      title: '회사',
      dataIndex: 'COMPANY_NAME',
      key: 'COMPANY_NAME',
      align: 'center',
    },
    {
      title: '재직여부',
      dataIndex: 'STATUS_NAME',
      key: 'STATUS_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: '직위',
      dataIndex: 'PSTN_NAME',
      key: 'PSTN_NAME',
      align: 'center',
      width: '10%',
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
      width: '25%',
    },
    {
      title: '승인일자',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      align: 'center',
      width: '10%',
    },
    // {
    //   title: '비고',
    //   dataIndex: 'USER_ID',
    //   key: 'USER_ID',
    //   align: 'center',
    //   width: '15%',
    //   render: (text, record) => (
    //     <StyledButton className="btn-xs btn-light" onClick={() => this.onInitPwd(record)}>
    //       비밀번호 초기화
    //     </StyledButton>
    //   ),
    // },
  ];

  render() {
    const { result } = this.props;
    const list = result && result.userList && result.userList.list ? result.userList.list : [];

    return (
      <>
        <AntdModal width={700} visible={this.state.isShow} title="사용자 상세" onCancel={this.onCancelPopup} destroyOnClose footer={null}>
          <UserView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                placeholder="업체명"
                style={{ width: 150 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, COMPANY_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                placeholder="사용자명"
                style={{ width: 100 }}
                onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, USER_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdSelect
                className="select-sm"
                style={{ width: 120 }}
                placeholder="재직여부"
                allowClear
                onChange={val => this.setState({ searchInfo: { ...this.state.searchInfo, STATUS_CD: val } })}
              >
                {result &&
                  result.codeList &&
                  result.codeList.codeadmindtl &&
                  result.codeList.codeadmindtl.map(code => <AntdSelect.Option value={code.CODE_CD}>{code.NAME_KOR}</AntdSelect.Option>)}
              </AntdSelect>
              <span className="text-label">승인기간</span>
              <AntdRangePicker
                className="ant-picker-sm mr5"
                style={{ width: 220 }}
                format="YYYY-MM-DD"
                allowClear={false}
                onChange={(val1, val2) => this.setState({ searchInfo: { ...this.state.searchInfo, FROM_DT: val2[0], TO_DT: val2[1] } })}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
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
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

UserList.defaultProps = {
  id: 'userList',
  result: {
    requesterList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default UserList;
