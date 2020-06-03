import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, Select, Modal } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledSearchWrapper';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const { Option } = Select;

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchType: 'NAME',
      keyword: '',
      columns: [
        {
          title: '사번',
          align: 'center',
          dataIndex: 'EMPLOYEE_NUM',
          width: '15%',
        },
        {
          title: '이름',
          align: 'center',
          dataIndex: 'NAME',
          width: '15%',
        },
        {
          title: '직위',
          align: 'center',
          dataIndex: 'PSTN',
          width: '15%',
        },
        {
          title: '부서명',
          align: 'left',
          dataIndex: 'DEPARTMENT',
          width: '30%',
        },
        {
          title: 'Tel',
          align: 'center',
          dataIndex: 'OFFICE_TEL_NO',
          width: '25%',
        },
      ],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'userList',
        type: 'GET',
        url: '/api/eshs/v1/common/AllEshsUsers',
      },
    ];
    getCallDataHandler(id, apiAry);
  }

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  onRowModal = record => {
    const { sagaKey: id, getCallDataHandler, chkYear, viewStart } = this.props;

    const apiAry = [
      {
        key: 'userDetail',
        type: 'GET',
        url: `/api/common/v1/account/userDetail/${record.USER_ID}`,
      },
      {
        key: 'RESULT',
        type: 'GET',
        url: `/api/eshs/v1/common/health/eshsHealthEmpChkResultDetail?user_id=${record.USER_ID}&CHK_YEAR=${chkYear}`,
      },
    ];
    this.handleModalVisible();

    getCallDataHandler(id, apiAry, viewStart);
  };

  handleUserSearch = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { searchType, keyword } = this.state;
    const apiAry = [];
    if (keyword) {
      apiAry.push({
        key: 'userList',
        type: 'GET',
        url: `/api/eshs/v1/common/AllEshsUsers?MODAL_SEARCH_TYPE=${searchType}&KEYWORD=${keyword}`,
      });
    } else {
      apiAry.push({
        key: 'userList',
        type: 'GET',
        url: '/api/eshs/v1/common/AllEshsUsers',
      });
    }
    getCallDataHandler(id, apiAry);
  };

  render() {
    const { userSearch, result, formData } = this.props;
    const { modalVisible, columns, searchType, keyword } = this.state;

    const userList = (result && result.userList && result.userList.users) || [];
    const userInfo = (formData && formData.userInfo) || {};
    if (!userSearch) return <b className="textLabel">{` ${userInfo.EMP_NO || ''} `}</b>;
    return (
      <>
        <AntdSearchInput
          style={{ width: '150PX' }}
          value={userInfo.EMP_NO || ''}
          className="input-search-sm ant-search-inline mr5"
          readOnly
          onClick={this.handleModalVisible}
          onChange={this.handleModalVisible}
        />
        <AntdModal
          width={900}
          visible={modalVisible}
          title="사원 검색"
          onCancel={this.handleModalVisible}
          destroyOnClose
          footer={null}
          className="modal-table-pad"
        >
          <StyledSearchWrapper>
            <span className="textLabel">검색구분</span>
            &nbsp;
            <AntdSelect className="mr5 select-sm" style={{ width: 150 }} defaultValue={searchType} onChange={value => this.setState({ searchType: value })}>
              <Option value="NAME">이름</Option>
              <Option value="NO">사번</Option>
              <Option value="DEPT">소속</Option>
              <Option value="PSTN">직위</Option>
              <Option value="REGNO">주민번호</Option>
            </AntdSelect>
            <span className="textLabel">검색어</span>
            &nbsp;
            <AntdInput
              style={{ width: 150 }}
              value={keyword}
              className="ant-input-sm ant-input-inline mr5"
              placeholder=" 검색어를 입력하세요"
              onChange={e => this.setState({ keyword: e.target.value })}
            />
            <StyledButton className="btn-primary btn-first btn-sm" onClick={this.handleUserSearch}>
              검색
            </StyledButton>
          </StyledSearchWrapper>
          <AntdTable
            className="tableWrapper"
            columns={columns}
            bordered
            rowKey="USER_ID"
            dataSource={userList || []}
            footer={() => <span>{`${userList.length || 0} 건`}</span>}
            onRow={record => ({
              onClick: () => {
                this.onRowModal(record);
              },
            })}
          />
        </AntdModal>
      </>
    );
  }
}

UserModal.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  userSearch: PropTypes.bool,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  viewStart: PropTypes.func,
  chkYear: PropTypes.string,
};

UserModal.defaultProps = {
  result: {},
  sagaKey: '',
  getCallDataHandler: () => {},
  userSearch: false,
  changeFormData: () => {},
  formData: {},
  viewStart: () => {},
  chkYear: '',
};

export default UserModal;
