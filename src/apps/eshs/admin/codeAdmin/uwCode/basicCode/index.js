import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../../CmCdList';

class EshsBasicCode extends Component {
  render() {
    return <BizMicroDevBase sagaKey="eshsBasicCode" component={List} tableName="UW" />;
  }
}

EshsBasicCode.propTypes = {};
EshsBasicCode.defaultProps = {};

export default EshsBasicCode;
