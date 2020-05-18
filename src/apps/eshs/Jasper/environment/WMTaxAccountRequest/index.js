import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMTaxAccountRequest extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMTaxAccountRequest" component={List} />;
  }
}

WMTaxAccountRequest.propTypes = {};
WMTaxAccountRequest.defaultProps = {};

export default WMTaxAccountRequest;
