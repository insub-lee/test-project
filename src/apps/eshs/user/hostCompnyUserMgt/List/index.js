/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table, Column } from 'react-virtualized';
import SearchBar from './SearchBar';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      filterUserList: [],
      searchType: '',
      searchValue: '',
      overScanRowCount: 10,
      userModal: false,
    };
  }

  handleAppStart = () => {
    console.log('handleAppStart       ', this.props);
    const { result, id, changeFormData } = this.props;
    const userList = (result && result.selectAllUserList && result.selectAllUserList.list) || [];
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    changeFormData(id, 'cmpnyList', cmpnyList);
    this.setState({
      userList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  };

  render() {
    const { formData } = this.props;
    const { userList } = this.state;
    const searchList = (formData && formData.searchList) || [];
    let list = [];
    if (searchList.length) list = searchList;
    else list = userList;
    console.debug(userList);
    console.debug('this.state', this.state);
    console.debug('this.props', this.props);
    return (
      <>
        <SearchBar {...this.props} />
        <Table width={1100} height={1000} headerHeight={30} rowHeight={50} rowCount={list.length} rowGetter={({ index }) => list[index]}>
          <Column label="SEQ" dataKey="sq_swtb_hst_cmpny_emp" width={0} />
          <Column label="소속" dataKey="belong" width={150} dataAlign="center" headerAlign="center" />
          <Column label="이름" dataKey="emp_nm" width={100} dataAlign="center" headerAlign="center" />
          <Column label="직위" dataKey="emp_position" width={100} dataAlign="center" headerAlign="center" />
          <Column label="직책" dataKey="duty" width={100} dataAlign="center" headerAlign="center" />
          <Column label="근무지" dataKey="site" width={100} dataAlign="center" headerAlign="center" />
          <Column label="전화번호" dataKey="tel" width={100} dataAlign="center" headerAlign="center" />
        </Table>
      </>
    );
  }
}

List.defaultProps = {
  id: 'EshshostCompny',
  getCallDataHanlder: () => {},
  result: {},
  apiAry: [
    {
      key: 'selectAllUserList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsHstCmpnyUser',
    },
    {
      key: 'cmpnyList',
      type: 'GET',
      url: '/api/eshs/v1/common/eshsHstCompanyList',
    },
  ],
};
export default List;
