import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class measureRefGas extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="measureRefGas" component={List} />;
  }
}

measureRefGas.propTypes = {};
measureRefGas.defaultProps = {};

export default measureRefGas;
