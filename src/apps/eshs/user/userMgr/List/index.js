import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { Select, Input } from 'antd';
import debounce from 'lodash/debounce';

import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hqList: [],
      deptList: [],
      userList: [],
      searchType: 'name_kor',
      searchValue: '',
      selectedDept: '',
      selectedHq: 72761,
      selectedBaseareaCode: '',
    };
    this.handleFindData = debounce(this.handleFindData, 500);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    const { selectedHq } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'userList',
        type: 'GET',
        url: '/api/eshs/v1/common/AllEshsUsers',
        params: {},
      },
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?dept_id=${selectedHq}`,
      },
    ];

    getCallDataHandler(id, apiArr, this.changeListData);
  };

  changeListData = () => {
    const { result } = this.props;
    const { selectedHq } = this.state;
    this.setState({
      userList: (result.userList && result.userList.users) || [],
      hqList: (result.deptList && result.deptList.dept && result.deptList.dept.filter(item => item.PRNT_ID === selectedHq)) || [],
    });
  };

  getSearchListData = () => {
    const { result } = this.props;
    this.setState({
      userList: (result.searchUser && result.searchUser.searchResult) || [],
    });
  };

  handleBaseareaChange = e => {
    this.setState({
      selectedBaseareaCode: e,
    });
    this.handleFindData();
  };

  handleHqChange = e => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({
      selectedHq: e,
    });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?dept_id=${e}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getDeptList);
  };

  getDeptList = () => {
    const { result } = this.props;
    this.setState({
      isHqSelect: true,
      deptList: (result.deptListUnderHq && result.deptListUnderHq.dept) || [],
    });
  };

  handleDeptChange = e => {
    this.setState({
      selectedDept: e,
    });
    this.handleFindData();
  };

  handleSearchTypeChange = e => {
    this.setState({
      searchType: e,
    });
  };

  handleSearchValueChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
    this.handleFindData();
  };

  handleFindData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { searchType, searchValue, selectedBaseareaCode, selectedDept } = this.state;
    const apiArr = [
      {
        key: 'searchUser',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsUserSearch?searchType=${searchType}&keyword=${searchValue}&barea_cd=${selectedBaseareaCode}&dept_cd=${selectedDept}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.getSearchListData);
  };

  handleListReset = () => {
    const { result } = this.props;
    this.setState({
      userList: (result.userList && result.userList.users) || [],
      isHqSelect: false,
      selectedHq: 72761,
      searchValue: '',
    });
  };

  getColumns = () => [
    { label: '소속', dataKey: 'DEPARTMENT', width: 150, ratio: 20 },
    { label: '사번', dataKey: 'EMPLOYEE_NUM', width: 100, ratio: 10 },
    { label: '이름', dataKey: 'NAME', width: 100, ratio: 10 },
    { label: '직위', dataKey: 'PSTN', width: 100, ratio: 10 },
    { label: '직책', dataKey: 'DUTY', width: 100, ratio: 10 },
    { label: '근무지', dataKey: 'BASE_AREA', width: 100, ratio: 10 },
    { label: '전화번호', dataKey: 'TEL', width: 100, ratio: 15 },
    { label: '권한', dataKey: 'AUTH', width: 150, ratio: 15 },
  ];

  getTableWidth = () =>
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);

  render() {
    const { isHqSelect, hqList, deptList, searchValue, userList, selectedDept } = this.state;
    return (
      <div>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <Select defaultValue="지역 전체" className="search-item input-width120" onChange={this.handleBaseareaChange}>
              <Option value="">지역 전체</Option>
              <Option value="CP">청주</Option>
              <Option value="GP">구미</Option>
            </Select>
            <Select defaultValue="본부 전체" className="search-item input-width120" onChange={this.handleHqChange}>
              <Option value={900}>본부 전체</Option>
              {hqList.map(item => (
                <Option value={item.DEPT_ID}>{item.NAME_KOR}</Option>
              ))}
            </Select>
            <Select defaultValue={selectedDept} className="search-item input-width160" disabled={!isHqSelect} onChange={this.handleDeptChange}>
              <Option value="">팀 전체</Option>
              {deptList.map(item => (
                <Option value={item.DEPT_CD}>{item.NAME_KOR}</Option>
              ))}
            </Select>
            <InputGroup className="search-item search-input-group" compact>
              <Select defaultValue="이름" onChange={this.handleSearchTypeChange}>
                <Option value="name_kor">이름</Option>
                <Option value="emp_no">사번</Option>
              </Select>
              <Search placeholder=" 검색어를 입력하세요" onChange={this.handleSearchValueChange} value={searchValue} />
            </InputGroup>
          </div>
        </StyledSearchWrap>
        <div className="alignRight">
          <StyledButton className="btn-primary" onClick={this.handleListReset}>
            검색 초기화
          </StyledButton>
        </div>
        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table width={width} height={500} headerHeight={40} rowHeight={53} rowCount={userList.length} rowGetter={({ index }) => userList[index]}>
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
      </div>
    );
  }
}
List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
};

export default List;
