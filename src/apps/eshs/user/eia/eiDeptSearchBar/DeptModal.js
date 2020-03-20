/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';
import DeptModalStyled from '../styled/DeptModalStyled';

const { Option } = Select;

const columns = [
  {
    title: '부서코드',
    dataIndex: 'DEPT_CD',
    width: 150,
  },
  {
    title: '부서명',
    dataIndex: 'NAME_KOR',
    width: 300,
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
      <div className="deptModal">
        <div>
          <span>&nbsp; 검색구분</span>
          <Select value={searchType} style={{ width: 130, padding: 3 }} onChange={this.handleSearchType}>
            <Option key="NAME_KOR" value="NAME_KOR" style={{ height: 30 }}>
              부서명
            </Option>
            <Option key="DEPT_CD" value="DEPT_CD" style={{ height: 30 }}>
              부서코드
            </Option>
          </Select>
          <span>&nbsp; 검색어</span>
          <Input value={searchText} style={{ width: 150 }} onChange={e => this.handleSearchInput(e.target.value)} placeholder="검색어" />
          <Button onClick={this.handleSearch}>검색</Button>
          <Button onClick={this.handleReset}>Reset</Button>
        </div>
        <DeptModalStyled>
          <Table
            columns={columns}
            dataSource={list}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
            rowKey="DEPT_CD"
            onRow={(record, rowIndex) => ({
              onClick: event => this.handleRowClick(record),
            })}
          />
        </DeptModalStyled>
      </div>
    );
  }
}
DeptModal.defaultProps = {
  deptList: [],
};
export default DeptModal;
