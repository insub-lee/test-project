import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';

class List extends Component {
  ESHS_PARENT_ID = 'ESHS_PARENT_ID';

  ESHS_DEPARTMENT_ID = 'ESHS_DEPARTMENT_ID';

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  }

  render() {
    const { result } = this.props;
    if (result.userList) {
      return (
        <div>
          <Table
            width={1100}
            height={1000}
            headerHeight={30}
            // headerStyle={{ textAlign: 'center' }}
            rowHeight={50}
            rowCount={result.userList.users.length}
            rowGetter={({ index }) => result.userList.users[index]}
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
    return null;
  }
}

List.propTypes = {
  id: PropTypes.string,
  getCallDataHanlder: PropTypes.func,
  apiAry: PropTypes.array,
  result: PropTypes.object,
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
};

export default List;
