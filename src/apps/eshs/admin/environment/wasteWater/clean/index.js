import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsWWClean extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsWWClean" component={List} />;
  }
}

EshsWWClean.propTypes = {};
EshsWWClean.defaultProps = {};

export default EshsWWClean;
