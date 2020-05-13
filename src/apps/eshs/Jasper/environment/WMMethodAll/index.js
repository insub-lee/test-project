import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMMethodAll extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMMethodAll" component={List} />;
  }
}

WMMethodAll.propTypes = {};
WMMethodAll.defaultProps = {};

export default WMMethodAll;
