/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Select, Table } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const { Option } = Select;
const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

const columns = [
  {
    title: '부서코드',
    dataIndex: 'DEPT_CD',
    width: 150,
    align: 'center',
  },
  {
    title: '부서명',
    dataIndex: 'NAME_KOR',
    width: 300,
    align: 'center',
  },
];

class DeptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchType: 'NAME_KOR',
      searchList: [],
      action: '',
    };
  }

  handleSearchInput = searchText => {
    this.setState({
      searchText,
    });
  };

  handleSearchType = searchType => {
    this.setState({
      searchType,
    });
  };

  handleRowClick = rowData => {
    const { handleModalRowClick } = this.props;
    handleModalRowClick(rowData);
    this.setState({
      searchList: [],
      action: '',
    });
  };

  handleSearch = () => {
    const { deptList } = this.props;
    const { searchType, searchText } = this.state;
    let searchList = [];
    if (searchText === '') {
      return this.setState({
        action: '',
        searchList: deptList,
      });
    }
    if (searchType === 'NAME_KOR') {
      searchList = deptList.filter(d => d.NAME_KOR.match(searchText) && d);
    } else if (searchType === 'DEPT_CD') {
      searchList = deptList.filter(d => d.DEPT_CD.match(searchText) && d);
    }
    this.setState({
      action: 'SEARCH',
      searchList,
    });
  };

  handleCloseModal = () => {
    const { handleModal } = this.props;
    this.setState({
      searchList: [],
      action: '',
    });
    handleModal();
  };

  handleReset = () => {
    this.setState({
      searchList: [],
      action: '',
      searchText: '',
      searchType: 'NAME_KOR',
    });
  };

  render() {
    const { searchText, action, searchList, searchType } = this.state;
    const { deptList } = this.props;
    let list = [];
    if (action === 'SEARCH') {
      list = searchList;
    } else {
      list = deptList;
    }
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">검색구분</span>
            <AntdSelect className="mr5 select-sm" value={searchType} style={{ width: 130 }} onChange={this.handleSearchType}>
              <Option key="NAME_KOR" value="NAME_KOR">
                부서명
              </Option>
              <Option key="DEPT_CD" value="DEPT_CD">
                부서코드
              </Option>
            </AntdSelect>
            <span className="text-label">검색어</span>
            <AntdInput
              className="ant-input-sm"
              value={searchText}
              style={{ width: 150 }}
              onChange={e => this.handleSearchInput(e.target.value)}
              placeholder="검색어"
              onPressEnter={this.handleSearch}
            />
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.handleSearch}>
              검색
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={this.handleReset}>
              Reset
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={columns}
          dataSource={list}
          pagination={{ pageSize: 15 }}
          rowKey="DEPT_ID"
          onRow={(record, rowIndex) => ({
            onClick: () => this.handleRowClick(record),
          })}
          footer={() => <div style={{ textAlign: 'center' }}>{`${list.length} 건`}</div>}
        />
      </StyledContentsWrapper>
    );
  }
}

DeptModal.propTypes = {
  handleModalRowClick: PropTypes.func,
  handleModal: PropTypes.func,
  deptList: PropTypes.array,
};
DeptModal.defaultProps = {
  deptList: [],
  handleModal: () => {},
  handleModalRowClick: () => {},
};
export default DeptModal;
