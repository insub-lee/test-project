import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../measureRefSeq/List';

class measureRefStack extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="measureRefStack" component={List} refStack />;
  }
}

measureRefStack.propTypes = {};
measureRefStack.defaultProps = {};

export default measureRefStack;
