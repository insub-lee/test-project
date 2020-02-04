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
      hq: [],
      dept: [],
      // hqId: 0,
    };
  }

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { result } = nextProps;
    if (result.deptList) {
      if (prevState.dept !== result.deptList.dept) {
        return {
          hq: result.deptList.dept.filter(item => item.prnt_id === 900),
          dept: result.deptList.dept.filter(item => item.prnt_id !== 900),
        };
      }
    }
    return null;
  }

  selectedDept = [];

  hqId;

  handleHqChange = e => {
    const { id, changeFormData } = this.props;
    const { dept } = this.state;
    this.hqId = e;
    this.setState({
      isSelected: true,
    });
    if (e === 900) {
      this.setState({
        isSelected: false,
      });
      changeFormData(id, 'ESHS_DEPARTMENT_ID');
    }
    this.selectedDept = dept.filter(item => item.prnt_id === this.hqId);
    changeFormData(id, 'ESHS_PARENT_ID', e); // 선택한 본부id 리듀서에 저장
  };

  handleDeptChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'ESHS_DEPARTMENT_ID', e); // 선택한 본부id 리듀서에 저장
  };

  render() {
    const { hq, isSelected } = this.state;
    const { selectedDept } = this;
    console.debug(this.props.id, this.props.formData);
    return (
      <div>
        <Select defaultValue="지역 전체" style={{ width: 110, padding: 3 }}>
          <Option value="C1">청주</Option>
          <Option value="H3">구미</Option>
        </Select>
        <Select defaultValue="본부 전체" style={{ width: 130, padding: 3 }} onChange={this.handleHqChange}>
          <Option value={900}>본부 전체</Option>
          {hq.map(item => (
            <Option value={item.dept_id}>{item.name_kor}</Option>
          ))}
        </Select>
        <Select defaultValue="팀 전체" style={{ width: 170, padding: 3 }} disabled={!isSelected} onChange={this.handleDeptChange}>
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
}

const param = 900;

SearchBar.propTypes = {
  id: PropTypes.string,
  getCallDataHanlder: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.func,
  changeFormData: PropTypes.func,
};

SearchBar.defaultProps = {
  id: 'EshsUserManager',
  apiAry: [
    {
      key: 'deptList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsHqAndDept?key=${param}`,
      param: {},
    },
  ],
};
export default SearchBar;
