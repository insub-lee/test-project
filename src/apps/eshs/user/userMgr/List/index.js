import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';

class List extends Component {
  // ESHS_PARENT_ID = 'ESHS_PARENT_ID';

  // ESHS_DEPARTMENT_ID = 'ESHS_DEPARTMENT_ID';
  state = {
    rowCount: 0,
    userList: [],
  };

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry, formData, result } = this.props;
    getCallDataHanlder(id, apiAry, this.handleRowGetter);
  }

  filteredUsers = [];

  handleRowGetter = ({ index }) => {
    // console.debug('eeee');
    const { ESHS_PARENT_ID, ESHS_DEPARTMENT_ID } = this.props.formData;
    const { result } = this.props;
    // this.setState({ rowCount: result.userList.users.length });
    // return result.userList.users;

    // console.debug(ESHS_PARENT_ID, ESHS_DEPARTMENT_ID);
    if (ESHS_PARENT_ID === 900 || ESHS_PARENT_ID === undefined) {
      console.debug(result && result.userList && result.userList.users);
      this.setState({
        userList: result && result.userList && result.userList.users,
      });
    }
    console.debug('@@@state@@@', this.state.userList);
    return this.state.userList;
    // }
    // if ((ESHS_PARENT_ID && !ESHS_DEPARTMENT_ID) || (ESHS_PARENT_ID && ESHS_DEPARTMENT_ID === 9999)) {
    //   console.debug('@@@본부만 선택@@@');
    //   this.filteredUsers = result.userList.users.filter(item => item.hq_id === ESHS_PARENT_ID);
    //   return this.filteredUsers[index];
    // }
    // if (ESHS_PARENT_ID && ESHS_DEPARTMENT_ID && ESHS_PARENT_ID !== 900 && ESHS_DEPARTMENT_ID !== 9999) {
    //   console.debug('@@@둘 다 선택@@@');
    //   this.filteredUsers = result.userList.users.filter(item => item.dept_id === ESHS_DEPARTMENT_ID);
    //   return this.filteredUsers[index];
    // }
    // console.debug('@@시작@@');
    // this.filteredUsers = result.userList.users;
    // return result.userList.users[index];
  };

  render() {
    const { ESHS_DEPARTMENT_ID } = this.props.formData;
    const { result } = this.props;
    console.debug(this.state);
    const columns = [
      {
        title: 'department',
        dataIndex: 'department',
        key: 'department',
        render: text => <a>{text}</a>,
      },
    ];
    // if (result.userList) {
    //   // console.debug(result.userList.users.filter(item => item.hq_id === 900));
    //   this.filteredUsers = result.userList.users.filter(item => item.dept_id === ESHS_DEPARTMENT_ID);
    return (
      <div>
        <Table
          width={1100}
          height={1000}
          headerHeight={30}
          rowHeight={50}
          rowCount={this.state.userList.length}
          rowGetter={({ index }) => this.state.userList[index]}
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
    // }
    // return null;
  }
}

List.propTypes = {
  id: PropTypes.string,
  getCallDataHanlder: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  formData: PropTypes.object,
};

List.defaultProps = {
  id: 'EshsUserManager',
  apiAry: [
    {
      key: 'userList',
      type: 'GET',
      url: '/api/eshs/v1/common/AllEshsUsers',
      params: {},
    },
  ],
  formData: {},
};

export default List;
