import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMResultItem extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMResultItem" component={List} />;
  }
}

WMResultItem.propTypes = {};
WMResultItem.defaultProps = {};

export default WMResultItem;
