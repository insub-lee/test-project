import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { Table } from 'antd';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const data = request({
      method: 'GET',
      url: 'http://eshs-dev.magnachip.com/api/eshs/v1/common/AllEshsUsers',
    });
    data.then(res => {
      this.setState({
        users: res.response.users,
      });
      console.debug(res.response.users);
    });
  }

  column = [
    { title: '소속', dataIndex: 'department', key: 'department' },
    { title: '사번', dataIndex: 'employee_num', key: 'employee_num' },
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '직위', dataIndex: 'pstn', key: 'pstn' },
    { title: '직책', dataIndex: 'duty', kdutyey: 'duty' },
    { title: '근무지', dataIndex: 'base_area', key: 'base_area' },
    { title: '전화번호', dataIndex: 'tel', key: 'tel' },
    { title: '권한', dataIndex: 'auth', key: 'auth' },
  ];

  render() {
    return <Table dataSource={this.state.users} columns={this.column} pagination={false} />;
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
