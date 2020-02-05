import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';
import { Select, Input } from 'antd';

const { Search } = Input;
const { Option } = Select;

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
    };
  }

  handleAppStart = () => {
    const { deptList, userList } = this.props.result;
    if (userList) {
      this.setState({
        hqList: deptList.dept.filter(item => item.prnt_id === 900),
        deptList: deptList.dept.filter(item => item.prnt_id !== 900),
        userList: userList.users,
        filteredUserList: userList.users,
        filteredDeptList: deptList.dept.filter(item => item.prnt_id !== 900),
      });
    }
  };

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  }

  handleBaseareaChange = e => {
    const { userList, hqId, deptId } = this.state;
    if (e !== 'ZZ') {
      if (hqId) {
        if (!deptId) {
          console.debug('지역 있고 본부 있고 부서 없음');
          this.setState({
            filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId),
            bAreaCode: e,
          });
        } else {
          console.debug('지역 있고 본부 있고 부서 있음');
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
        console.debug('지역 없고 본부 있고 부서 없음');
        this.setState({
          filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId),
          bAreaCode: '',
        });
      } else {
        console.debug('지역 없고 본부 있고 부서 있음');
        this.setState({
          filteredUserList: userList.filter(item => item.b_area_code === e && item.hq_id === hqId && item.dept_id === deptId),
          bAreaCode: '',
        });
      }
    } else {
      console.debug('@@@지역으로 초기화@@@');
      this.setState({
        bAreaCode: '',
        filteredUserList: userList,
      });
    }
  };

  handleHqOnChange = e => {
    const { bAreaCode, userList, isSelected } = this.state;
    if (e === 900) {
      if (bAreaCode) {
        console.debug('@@@1@@@');
        this.setState({
          hqId: 0,
          deptId: 0,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode),
        });
      } else {
        console.debug('@@@2@@@ 본부로 초기화');
        this.setState({
          hqId: 0,
          deptId: 0,
          filteredUserList: userList,
        });
      }
      return;
    }
    if (e !== 900) {
      if (bAreaCode) {
        console.debug('@@@3@@@');
        this.setState({
          hqId: e,
          isSelected: true,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === e),
        });
      } else {
        console.debug('@@@4@@@');
        this.setState({
          hqId: e,
          isSelected: true,
          filteredUserList: userList.filter(item => item.hq_id === e),
        });
      }
    }
  };

  handleDeptOnChange = e => {
    const { hqId, bAreaCode, userList, deptId } = this.state;
    if (e === 9999) {
      if (bAreaCode) {
        console.debug('@@@11@@@');
        this.setState({
          deptId: 0,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === e),
        });
      } else {
        console.debug('@@@22@@@');
        this.setState({
          deptId: 0,
          filteredUserList: userList.filter(item => item.hq_id === hqId),
        });
      }
      return;
    }
    if (e !== 9999) {
      if (bAreaCode) {
        console.debug('@@@33@@@');
        this.setState({
          deptId: e,
          filteredUserList: userList.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId && item.dept_id === e),
        });
      } else {
        console.debug('@@@44@@@', hqId);
        this.setState({
          deptId: e,
          filteredUserList: userList.filter(item => item.hq_id === hqId && item.dept_id === e),
        });
      }
    }
    // if (bAreaCode) {
    //   this.setState({
    //     deptId: e,
    //     filteredUserList: filteredUserList.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId && item.dept_id === e),
    //   });
    // } else {
    //   this.setState({
    //     deptId: e,
    //     filteredUserList: filteredUserList.filter(item => item.hq_id === hqId && item.dept_id === e),
    //   });
    // }
    // if (e === 9999) {
    //   if (bAreaCode) {
    //     this.setState({
    //       deptId: 0,
    //       filteredUserList: filteredUserList.filter(item => item.b_area_code === bAreaCode && item.hq_id === hqId),
    //     });
    //   } else {
    //     this.setState({
    //       deptId: 0,
    //       filteredUserList: filteredUserList.filter(item => item.hq_id === hqId),
    //     });
    //   }
    // }
  };

  render() {
    const { isSelected, hqList, deptList, filteredUserList } = this.state;
    return (
      <div>
        <Select defaultValue="지역 전체" style={{ width: 110, padding: 3 }} onChange={this.handleBaseareaChange}>
          <Option value="ZZ">지역 전체</Option>
          <Option value="C1">청주</Option>
          <Option value="H3">구미</Option>
        </Select>
        <Select defaultValue="본부 전체" style={{ width: 130, padding: 3 }} onChange={this.handleHqOnChange}>
          <Option value={900}>본부 전체</Option>
          {hqList.map(item => (
            <Option value={item.dept_id}>{item.name_kor}</Option>
          ))}
        </Select>
        <Select defaultValue="팀 전체" style={{ width: 170, padding: 3 }} disabled={!isSelected} onChange={this.handleDeptOnChange}>
          <Option value={9999}>팀 전체</Option>
          {deptList
            .filter(item => item.prnt_id === this.state.hqId)
            .map(item => (
              <Option value={item.dept_id}>{item.name_kor}</Option>
            ))}
        </Select>
        <Search style={{ width: 200, padding: 3 }} />

        <Table
          width={1100}
          height={1000}
          headerHeight={30}
          // headerStyle={{ textAlign: 'center' }}
          rowHeight={50}
          rowCount={filteredUserList.length}
          rowGetter={({ index }) => filteredUserList[index]}
        >
          <Column label="소속" dataKey="department" width={150} />
          <Column label="사번" dataKey="employee_num" width={100} />
          <Column label="이름" dataKey="name" width={100} />
          <Column label="직위" dataKey="pstn" width={100} />
          <Column label="직책" dataKey="duty" width={100} />
          <Column label="근무지" dataKey="base_area" width={100} />
          <Column label="전화번호" dataKey="tel" width={100} />
          <Column label="권한" dataKey="auth" width={150} />
        </Table>
      </div>
    );
  }
}
List.propTypes = {
  id: PropTypes.string,
  getCallDataHanlder: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.func,
};

// const prntId = 900;

List.defaultProps = {
  id: 'EshsUserManager',
  getCallDataHanlder: () => {},
  apiAry: [
    {
      key: 'userList',
      type: 'GET',
      url: '/api/eshs/v1/common/AllEshsUsers',
      params: {},
    },
    {
      key: 'hqList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsHqAndDeptList?key=900`,
      // param: { key: 900 },
    },
    {
      key: 'deptList',
      type: 'GET',
      url: `/api/eshs/v1/common/EshsHqAndDeptList?key=900`,
      // param: { key: 900 },
    },
  ],
};

export default List;
