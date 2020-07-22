import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { Select, Input } from 'antd';
import debounce from 'lodash/debounce';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import StyledVirtualizedTable from 'components/BizBuilder/styled/Table/StyledVirtualizedTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const { Option } = Select;

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
    const { selectedHq, spinningOn } = this.state;
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
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${selectedHq}`,
      },
    ];

    getCallDataHandler(id, apiArr, this.changeListData);
  };

  changeListData = () => {
    const { result, spinningOff } = this.props;
    const { selectedHq } = this.state;
    this.setState(
      {
        userList: (result.userList && result.userList.users) || [],
        hqList: (result.deptList && result.deptList.dept && result.deptList.dept.filter(item => item.PRNT_ID === selectedHq)) || [],
      },
      spinningOff,
    );
  };

  getSearchListData = () => {
    const { result, spinningOff } = this.props;
    this.setState(
      {
        userList: (result.searchUser && result.searchUser.searchResult) || [],
      },
      spinningOff,
    );
  };

  handleBaseareaChange = e => {
    this.setState({
      selectedBaseareaCode: e,
    });
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
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${e}`,
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
  };

  handleFindData = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const { searchType, searchValue, selectedBaseareaCode, selectedDept } = this.state;
    spinningOn();
    const apiArr = [
      {
        key: 'searchUser',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsUserSearch?searchType=${searchType || ''}&keyword=${searchValue || ''}&barea_cd=${selectedBaseareaCode ||
          ''}&dept_cd=${selectedDept || ''}`,
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
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area mb10">
              <AntdSelect placeholder="지역 전체" allowClear className="select-sm mr5" onChange={this.handleBaseareaChange} style={{ width: 150 }}>
                <Option value="CP">청주</Option>
                <Option value="GP">구미</Option>
              </AntdSelect>
              <AntdSelect defaultValue={900} className="select-sm mr5" onChange={this.handleHqChange} style={{ width: 250 }}>
                <Option value={900}>본부 전체</Option>
                {hqList.map(item => (
                  <Option value={item.DEPT_ID}>{item.NAME_KOR}</Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                disabled={!isHqSelect}
                onChange={this.handleDeptChange}
                style={{ width: 250 }}
                allowClear
                placeholder="팀 전체"
              >
                {deptList.map(item => (
                  <Option value={item.DEPT_CD}>{item.NAME_KOR}</Option>
                ))}
              </AntdSelect>
              <AntdSelect defaultValue="name_kor" placeholder="검색구분" className="select-sm" onChange={this.handleSearchTypeChange} style={{ width: 100 }}>
                <Option value="name_kor">이름</Option>
                <Option value="emp_no">사번</Option>
              </AntdSelect>
              <AntdInput
                className="ant-input-sm ant-input-inline mr5"
                placeholder="검색어"
                onChange={this.handleSearchValueChange}
                style={{ width: 150 }}
                allowClear
                onPressEnter={this.handleFindData}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.handleFindData}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
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
        </StyledContentsWrapper>
      </>
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
