import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../List';

class eshsWWSeriesAA extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsWWseriesAA" component={List} series={4015} />;
  }
}

eshsWWSeriesAA.propTypes = {};
eshsWWSeriesAA.defaultProps = {};

export default eshsWWSeriesAA;
