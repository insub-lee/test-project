import React, { Component } from 'react';
import { Select, Input } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const { Search } = Input;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  hq = [];

  selectedDept = [];

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  }

  handleHqChange = e => {
    const { id, changeFormData, result } = this.props;
    this.setState({
      isSelected: true,
    });
    if (e === 900) {
      this.setState({
        isSelected: false,
      });
      changeFormData(id, 'ESHS_DEPARTMENT_ID');
    }
    changeFormData(id, 'ESHS_PARENT_ID', e); // 선택한 본부id 리듀서에 저장
    this.selectedDept = result.deptList.dept.filter(item => item.prnt_id === e);
  };

  handleDeptChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'ESHS_DEPARTMENT_ID', e); // 선택한 본부id 리듀서에 저장
  };

  render() {
    const { result } = this.props;
    const { isSelected } = this.state;
    const { selectedDept } = this;
    if (result.deptList) {
      this.hq = result.deptList.dept.filter(item => item.prnt_id === 900);
      return (
        <div>
          <Select defaultValue="지역 전체" style={{ width: 110, padding: 3 }}>
            <Option value="C1">청주</Option>
            <Option value="H3">구미</Option>
          </Select>
          <Select defaultValue="본부 전체" style={{ width: 130, padding: 3 }} onChange={this.handleHqChange}>
            <Option value={900}>본부 전체</Option>
            {this.hq.map(item => (
              <Option value={item.dept_id}>{item.name_kor}</Option>
            ))}
          </Select>
          <Select defaultValue="팀 전체" style={{ width: 170, padding: 3 }} disabled={!isSelected} onChange={this.handleDeptChange}>
            <Option value={0}>팀 전체</Option>
            {selectedDept.map(item => (
              <Option value={item.dept_id}>{item.name_kor}</Option>
            ))}
          </Select>
          <Select defaultValue="ESH Qual 권한 전체" style={{ width: 170, padding: 3 }}>
            <Option value="Q0">Qual 관리자</Option>
            <Option value="Q1">Qual 담당자</Option>
            <Option value="Q2">일반</Option>
          </Select>
          <Search style={{ width: 200, padding: 3 }} />
        </div>
      );
    }
    return null;
  }
}

SearchBar.propTypes = {
  id: PropTypes.string,
  getCallDataHanlder: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
};

const prntId = 900;

SearchBar.defaultProps = {
  id: 'EshsUserManager',
  getCallDataHanlder: () => {},
  result: {},
  apiAry: [
    {
      key: 'deptList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsHqAndDeptList?key=${prntId}`,
      param: {},
    },
  ],
};

export default SearchBar;
