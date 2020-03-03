import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsExhaust extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsExhaust" component={List} />;
  }
}

EshsExhaust.propTypes = {};
EshsExhaust.defaultProps = {};

export default EshsExhaust;
