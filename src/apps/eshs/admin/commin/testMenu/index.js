import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

// 차후 삭제예정
class testMeun extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="testMeun" component={List} />;
  }
}

testMeun.propTypes = {};
testMeun.defaultProps = {};

export default testMeun;
