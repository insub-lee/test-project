import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../List';

class EshsWWSeriesOrganic extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsWWseriesOrganic" component={List} series={4016} />;
  }
}

EshsWWSeriesOrganic.propTypes = {};
EshsWWSeriesOrganic.defaultProps = {};

export default EshsWWSeriesOrganic;
