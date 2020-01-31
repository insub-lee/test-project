import React from 'react';
import PropTypes from 'prop-types';
import request from 'request';
import { Table } from 'antd';

class List extends React.component {
  componentDidMount() {
    const data = request({
      method: 'GET',
      url: '/api/eshs/v1/common/AllEshsUsers',
    });
    const getResponse = data.response;
    console.debug(getResponse);
  }

  column = [
    { title: '소속' },
    { title: '사번' },
    { title: '이름' },
    { title: '직위' },
    { title: '직책' },
    { title: '근무지' },
    { title: '전화번호' },
    { title: '권한' },
  ];

  render() {
    // return <Table column={this.column} p></Table>;
    return <div>Hello</div>;
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
