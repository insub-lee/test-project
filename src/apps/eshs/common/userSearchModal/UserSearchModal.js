import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, Select, Modal } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

const AntdSearchInput = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const { Option } = Select;

class UserSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      param: {},
      colData: this.props.colData,
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff, apiAry } = this.props;
    spinningOn();
    getCallDataHandler(id, apiAry, spinningOff);
  }

  handleModalVisible = () => {
    const { modalVisible } = this.state;
    const { sagaKey: id, getCallDataHandler, apiAry } = this.props;

    if (modalVisible) {
      return this.setState(
        {
          modalVisible: !modalVisible,
          param: {},
        },
        () => getCallDataHandler(id, apiAry),
      );
    }
    return this.setState({
      modalVisible: !modalVisible,
    });
  };

  onClickRow = record => {
    const { onClickRow } = this.props;

    this.setState({ colData: record.EMP_NO }, () => onClickRow(record));

    this.handleModalVisible();
  };

  handleUserSearch = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { param } = this.state;
    const searchApiAry = [
      {
        key: 'userList',
        type: 'POST',
        url: '/api/common/v1/account/userSearchList',
        params: { PARAM: { ...param } },
      },
    ];

    spinningOn();

    getCallDataHandler(id, searchApiAry, spinningOff);
  };

  render() {
    const { visible, result, columns } = this.props;
    const { modalVisible, param, colData } = this.state;

    const type = param.SEARCH_TYPE || '';
    const text = param.SEARCH_TEXT || '';
    const list = (result && result.userList && result.userList.list) || [];
    if (!visible) return <span className="text-label">{` ${colData} `}</span>;
    return (
      <>
        <AntdSearchInput
          style={{ width: '150PX' }}
          value={colData}
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
            <AntdSelect
              className="mr5 select-sm"
              style={{ width: 150 }}
              onChange={value => this.setState({ param: { ...param, SEARCH_TYPE: value } })}
              placeholder="검색구분"
              allowClear
            >
              <Option value="USER_NAME">이름</Option>
              <Option value="EMP_NO">사번</Option>
              <Option value="DEPT_NAME_KOR">소속</Option>
              <Option value="PSTN_NAME_KOR">직위</Option>
              <Option value="REGNO">주민번호</Option>
            </AntdSelect>
            <AntdInput
              style={{ width: 150 }}
              className="ant-input-sm ant-input-inline mr5"
              placeholder="검색어"
              onChange={e => this.setState({ param: { ...param, SEARCH_TEXT: e.target.value } })}
              // allowClear
            />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-sm" onClick={this.handleUserSearch}>
                검색
              </StyledButton>
            </StyledButtonWrapper>
          </StyledSearchWrapper>
          <AntdTable
            className="tableWrapper"
            columns={columns}
            bordered
            rowKey="USER_ID"
            dataSource={list || []}
            footer={() => <span>{`${list.length || 0} 건`}</span>}
            onRow={record => ({
              onClick: () => {
                this.onClickRow(record);
              },
            })}
          />
        </AntdModal>
      </>
    );
  }
}

UserSearchModal.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  visible: PropTypes.bool,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  columns: PropTypes.array,
  colData: PropTypes.string,
  onClickRow: PropTypes.func,
  apiAry: PropTypes.array,
};

UserSearchModal.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  apiAry: [
    {
      key: 'userList',
      type: 'POST',
      url: '/api/common/v1/account/userSearchList',
      params: {},
    },
  ],
};

export default UserSearchModal;
