import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMMonthlyResult extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMMonthlyResult" component={List} />;
  }
}

WMMonthlyResult.propTypes = {};
WMMonthlyResult.defaultProps = {};

export default WMMonthlyResult;
