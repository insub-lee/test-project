import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMTradeDetail extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMTradeDetail" component={List} />;
  }
}

WMTradeDetail.propTypes = {};
WMTradeDetail.defaultProps = {};

export default WMTradeDetail;
