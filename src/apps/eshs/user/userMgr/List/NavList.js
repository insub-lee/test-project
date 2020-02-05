/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

class NavList extends Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={3}>
          <Link to="/">ESH Qaul</Link>
        </Col>
        <Col span={3}>
          <Link to="/">안전작업허가</Link>
        </Col>
        <Col span={3}>
          <Link to="/">위험성평가</Link>
        </Col>
        <Col span={3}>
          <Link to="/">소방점검</Link>
        </Col>
      </Row>
    );
  }
}

export default NavList;
