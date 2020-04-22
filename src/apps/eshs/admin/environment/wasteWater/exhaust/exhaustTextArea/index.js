import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsExhaustTextArea extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsExhaustTextArea" component={List} />;
  }
}

EshsExhaustTextArea.propTypes = {};
EshsExhaustTextArea.defaultProps = {};

export default EshsExhaustTextArea;
