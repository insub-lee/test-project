import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsSafetyOfficial extends Component {
  render() {
    return <BizMicroDevBase sagaKey="eshsSafetyOfficial" component={List} />;
  }
}

EshsSafetyOfficial.propTypes = {};
EshsSafetyOfficial.defaultProps = {};

export default EshsSafetyOfficial;
