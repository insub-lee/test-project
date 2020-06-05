import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, Select } from 'antd';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import BizMicroDevBase from 'components/BizMicroDevBase';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);

const { Option } = Select;

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {},
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'userList',
        type: 'POST',
        url: '/api/common/v1/account/userSearchList',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry, spinningOff);
  }

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
    const { result, columns, onClickRow } = this.props;
    const { param } = this.state;

    const type = param.SEARCH_TYPE || '';
    const text = param.SEARCH_TEXT || '';
    const list = (result && result.userList && result.userList.list) || [];
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
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
            onPressEnter={this.handleUserSearch}
            // allowClear
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-sm" onClick={this.handleUserSearch}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={columns}
          bordered
          rowKey="USER_ID"
          dataSource={list || []}
          footer={() => <span>{`${list.length || 0} 건`}</span>}
          onRow={record => ({
            onClick: () => {
              onClickRow(record);
            },
          })}
        />
      </StyledContentsWrapper>
    );
  }
}

const ModalContent = ({ onClickRow, columns }) => (
  <BizMicroDevBase sagaKey="userSearchModal" onClickRow={onClickRow} columns={columns} component={Comp}></BizMicroDevBase>
);

ModalContent.propTypes = {
  onClickRow: PropTypes.func,
  columns: PropTypes.array,
};

ModalContent.defaultProps = {
  onClickRow: () => {},
  columns: [],
};

Comp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  columns: PropTypes.array,
  onClickRow: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default ModalContent;
