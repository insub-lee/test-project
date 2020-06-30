import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import App from './App';

class EshsBasicCode extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsBasicCode" component={App} />;
  }
}

EshsBasicCode.propTypes = {};
EshsBasicCode.defaultProps = {};

export default EshsBasicCode;
