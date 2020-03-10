/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, message } from 'antd';

const { Option } = Select;

class DeptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchType: 'DEPT_NM',
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
    console.debug('1111111111111111111', rowData);
  };

  render() {
    const { searchText } = this.state;
    const { deptList } = this.props;
    return (
      <div>
        <div>
          <span>&nbsp; 검색구분</span>{' '}
          <Select defaultValue="DEPT_NM" style={{ width: 130, padding: 3 }} onChange={this.handleSearchType}>
            <Option key="DEPT_NM" style={{ height: 30 }}>
              부서명
            </Option>
            <Option key="DEPT_ID" style={{ height: 30 }}>
              부서코드
            </Option>
          </Select>
          <span>&nbsp; 검색어</span>
          <Input name="DEPT_CD" value={searchText} style={{ width: 150 }} onChange={e => this.handleSearchInput(e.target.value)} placeholder="검색어" />
          <Button>검색</Button>
        </div>
        <table>
          <thead></thead>
          <tbody>
            {deptList.map((d, index) => (
              <tr key={index} onClick={() => this.handleRowClick(d)}>
                <td>{d.DEPT_ID}</td>
                <td>{d.DEPT_NM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
DeptModal.defaultProps = {
  deptList: [],
};
export default DeptModal;
