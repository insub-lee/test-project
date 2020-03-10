import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class Warehouse extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="warehouse" component={List} />;
  }
}

Warehouse.propTypes = {};
Warehouse.defaultProps = {};

export default Warehouse;
