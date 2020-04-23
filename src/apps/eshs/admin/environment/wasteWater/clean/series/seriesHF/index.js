import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../List';

class EshsWWSeriesHF extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsWWseriesHF" component={List} series={4014} />;
  }
}

EshsWWSeriesHF.propTypes = {};
EshsWWSeriesHF.defaultProps = {};

export default EshsWWSeriesHF;
