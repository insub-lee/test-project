import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { Select, Input } from 'antd';
import debounce from 'lodash/debounce';

import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hqList: [],
      hqId: 0,
      deptId: 0,
      bAreaCode: '',
      deptList: [],
      userList: [],
      filteredUserList: [],
      filteredDeptList: [],
      isSelected: false,
      searchType: 'name_kor',
      searchValue: '',
    };
    this.handleFindData = debounce(this.handleFindData, 500);
  }

  componentDidMount() {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  }

  handleAppStart = () => {
    const { deptList, userList } = this.props.result;
    if (userList) {
      this.setState({
        hqList: deptList.dept.filter(item => item.prnt_id === 900),
        deptList: deptList.dept.filter(item => item.prnt_id !== 900),
        userList: userList.users,
        filteredUserList: userList.users,
      });
    }
  };

  handleBaseareaChange = e => {
    const { userList, hqId, deptId } = this.state;
    if (e !== 'ZZ') {
      if (hqId) {
        if (!deptId) {
          this.setState({
            filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId),
            bAreaCode: e,
          });
        } else {
          this.setState({
            filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId && item.dept_id === deptId),
            bAreaCode: e,
          });
        }
      } else {
        this.setState({
          bAreaCode: e,
          filteredUserList: userList.filter(item => item.b_area_code === e),
        });
      }
    } else if (hqId) {
      if (!deptId) {
        this.setState({
          filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId),
          bAreaCode: '',
        });
      } else {
        this.setState({
          filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId && item.dept_id === deptId),
          bAreaCode: '',
        });
      }
    } else {
      this.setState({
        bAreaCode: '',
        filteredUserList: userList,
      });
    }
  };

  handleHqOnChange = e => {
    const { bAreaCode, userList, deptList } = this.state;
    if (e === 900) {
      if (bAreaCode) {
        this.setState({
          hqId: 0,
          deptId: 0,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode),
          isSelected: false,
        });
      } else {
        this.setState({
          hqId: 0,
          deptId: 0,
          filteredUserList: userList,
          isSelected: false,
        });
      }
      return;
    }
    if (e !== 900) {
      if (bAreaCode) {
        this.setState({
          hqId: e,
          isSelected: true,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === e),
          filteredDeptList: deptList.filter(item => item.prnt_id === e),
        });
      } else {
        this.setState({
          hqId: e,
          isSelected: true,
          filteredUserList: userList.filter(item => item.hq_id === e),
          filteredDeptList: deptList.filter(item => item.prnt_id === e),
        });
      }
    }
  };

  handleDeptOnChange = e => {
    const { hqId, bAreaCode, userList } = this.state;
    if (e === 9999) {
      if (bAreaCode) {
        this.setState({
          deptId: 0,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId),
        });
      } else {
        this.setState({
          deptId: 0,
          filteredUserList: userList.filter(item => item.hq_id === hqId),
        });
      }
      return;
    }
    if (e !== 9999) {
      if (bAreaCode) {
        this.setState({
          deptId: e,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId && item.dept_id === e),
        });
      } else {
        this.setState({
          deptId: e,
          filteredUserList: userList.filter(item => item.hq_id === hqId && item.dept_id === e),
        });
      }
    }
  };

  handleSearchTypeOnChange = e => {
    this.setState({
      searchType: e,
    });
  };

  handleOnChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
    this.handleFindData();
  };

  handleFindData = () => {
    const { id, getCallDataHandler } = this.props;
    const { searchType, searchValue } = this.state;

    const api = [
      {
        key: 'searchUser',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsUserSearch?searchType=${searchType}&keyword=%25${searchValue}%25`,
      },
    ];
    getCallDataHandler(id, api, this.handleOnCallBack);
  };

  handleOnCallBack = () => {
    const { hqId, deptId, bAreaCode, searchValue, userList } = this.state;
    const { result } = this.props;
    this.setState({
      filteredUserList: result.searchUser.searchResult,
    });

    if (!searchValue) {
      if ((!bAreaCode && !hqId) || (bAreaCode === 'ZZ' && hqId === 900)) {
        this.setState({
          filteredUserList: userList,
        });
      }
    }
    if (!bAreaCode || bAreaCode === 'ZZ') {
      if (hqId && hqId !== 900) {
        if (deptId && deptId !== 9999) {
          this.setState({
            filteredUserList: result.searchUser.searchResult.filter(item => item.hq_id === hqId && item.dept_id === deptId),
          });
        } else if (!deptId || deptId === 9999) {
          this.setState({
            filteredUserList: result.searchUser.searchResult.filter(item => item.hq_id === hqId),
          });
        }
        return;
      }
      if (!hqId || hqId === 900) {
        this.setState({
          filteredUserList: result.searchUser.searchResult,
        });
      }
    }
    if (bAreaCode && bAreaCode !== 'ZZ') {
      if (hqId && hqId !== 900) {
        if (deptId && deptId !== 9999) {
          this.setState({
            filteredUserList: result.searchUser.searchResult.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId && item.dept_id === deptId),
          });
        } else if (!deptId || deptId === 9999) {
          this.setState({
            filteredUserList: result.searchUser.searchResult.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId),
          });
        }
        return;
      }
      if (!hqId || hqId === 900) {
        this.setState({
          filteredUserList: result.searchUser.searchResult.filter(item => item.b_area_code === bAreaCode),
        });
      }
    }
  };

  getColumns = () => [
    { label: '소속', dataKey: 'department', width: 150, ratio: 20 },
    { label: '사번', dataKey: 'employee_num', width: 100, ratio: 10 },
    { label: '이름', dataKey: 'name', width: 100, ratio: 10 },
    { label: '직위', dataKey: 'pstn', width: 100, ratio: 10 },
    { label: '직책', dataKey: 'duty', width: 100, ratio: 10 },
    { label: '근무지', dataKey: 'base_area', width: 100, ratio: 10 },
    { label: '전화번호', dataKey: 'tel', width: 100, ratio: 15 },
    { label: '권한', dataKey: 'auth', width: 150, ratio: 15 },
  ];

  getTableWidth = () =>
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);

  render() {
    const { isSelected, hqList, filteredDeptList, filteredUserList, searchValue } = this.state;
    return (
      <div>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <Select defaultValue="지역 전체" className="search-item input-width120" onChange={this.handleBaseareaChange}>
              <Option value="ZZ">지역 전체</Option>
              <Option value="C1">청주</Option>
              <Option value="H3">구미</Option>
            </Select>
            <Select defaultValue="본부 전체" className="search-item input-width120" onChange={this.handleHqOnChange}>
              <Option value={900}>본부 전체</Option>
              {hqList.map(item => (
                <Option value={item.dept_id}>{item.name_kor}</Option>
              ))}
            </Select>
            <Select defaultValue="팀 전체" className="search-item input-width160" disabled={!isSelected} onChange={this.handleDeptOnChange}>
              <Option value={9999}>팀 전체</Option>
              {filteredDeptList.map(item => (
                <Option value={item.dept_id}>{item.name_kor}</Option>
              ))}
            </Select>
            <InputGroup className="search-item search-input-group" compact>
              <Select defaultValue="이름" onChange={this.handleSearchTypeOnChange}>
                <Option value="name_kor">이름</Option>
                <Option value="emp_no">사번</Option>
              </Select>
              <Search placeholder=" 검색어를 입력하세요" onChange={this.handleOnChange} value={searchValue} />
            </InputGroup>
          </div>
        </StyledSearchWrap>

        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={filteredUserList.length}
                rowGetter={({ index }) => filteredUserList[index]}
              >
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
                {/* 
            <Column label="소속" dataKey="department" width={150} />
            <Column label="사번" dataKey="employee_num" width={100} />
            <Column label="이름" dataKey="name" width={100} />
            <Column label="직위" dataKey="pstn" width={100} />
            <Column label="직책" dataKey="duty" width={100} />
            <Column label="근무지" dataKey="base_area" width={100} />
            <Column label="전화번호" dataKey="tel" width={100} />
            <Column label="권한" dataKey="auth" width={150} />
            */}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
      </div>
    );
  }
}
List.propTypes = {
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.func,
};

// const prntId = 900;

List.defaultProps = {
  id: 'EshsUserManager',
  getCallDataHandler: () => {},
  apiAry: [
    {
      key: 'userList',
      type: 'GET',
      url: '/api/eshs/v1/common/AllEshsUsers',
      params: {},
    },
    {
      key: 'deptList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsHqAndDeptList?key=900`,
      // param: { key: '900' },
    },
  ],
};

export default List;
