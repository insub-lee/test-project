import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prnt_id: 0,
      dept_id: 0,
    };
  }

  ESHS_PARENT_ID = 'ESHS_PARENT_ID';

  ESHS_DEPARTMENT_ID = 'ESHS_DEPARTMENT_ID';

  componentDidMount() {
    const { id, getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.debug('@@@prevState@@@', prevState);
  //   console.debug('@@@nextProps@@@', nextProps.formData);
  //   if (prevState.prnt_id === nextProps.formData.ESHS_PARENT_ID || prevState.dept_id === nextProps.formData.ESHS_DEPARTMENT_ID) {
  //     return { prnt_id: nextProps.formData.ESHS_PARENT_ID, dept_id: nextProps.formData.ESHS_DEPARTMENT_ID };
  //   }
  //   return null;
  // }

  // shouldComponentUpdate(nextProps) {
  //   console.debug('@@@this.props.formdata@@@', this.props.formData);
  //   console.debug('@@@nextProps@@@', nextProps.formData);
  //   if (this.props.formData !== nextProps.formData) {
  //     return true;
  //   }
  // }

  render() {
    const { id, formData, result } = this.props;
    // console.debug(formData);
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
  result: PropTypes.func,
  formData: PropTypes.func,
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
