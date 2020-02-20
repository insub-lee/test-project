import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsChemicalCode extends Component {
  render() {
    return <BizMicroDevBase sagaKey="eshsChemicalCode" component={List} />;
  }
}

EshsChemicalCode.propTypes = {};
EshsChemicalCode.defaultProps = {};

export default EshsChemicalCode;
