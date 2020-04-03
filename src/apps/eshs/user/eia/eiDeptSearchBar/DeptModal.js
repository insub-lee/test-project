/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Table } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const { Option } = Select;
const AntdLineTable = StyledLineTable(Table);
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
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">검색구분</span>
          <AntdSelect className="selectMid mr5" value={searchType} style={{ width: 130 }} onChange={this.handleSearchType}>
            <Option key="NAME_KOR" value="NAME_KOR">
              부서명
            </Option>
            <Option key="DEPT_CD" value="DEPT_CD">
              부서코드
            </Option>
          </AntdSelect>
          <span className="textLabel">검색어</span>
          <AntdInput
            className="ant-input-inline mr5"
            value={searchText}
            style={{ width: 150 }}
            onChange={e => this.handleSearchInput(e.target.value)}
            placeholder="검색어"
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.handleSearch}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary" onClick={this.handleReset}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdLineTable
          className="tableWrapper"
          columns={columns}
          dataSource={list}
          pagination={{ pageSize: 15 }}
          rowKey="DEPT_CD"
          onRow={(record, rowIndex) => ({
            onClick: () => this.handleRowClick(record),
          })}
          footer={() => <div style={{ textAlign: 'center' }}>{`${list.length} 건`}</div>}
        />
      </ContentsWrapper>
    );
  }
}
DeptModal.defaultProps = {
  deptList: [],
};
export default DeptModal;
