import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class GasType extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsGasType" component={List} />;
  }
}

GasType.propTypes = {};
GasType.defaultProps = {};

export default GasType;
