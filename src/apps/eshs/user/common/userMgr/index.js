/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class EshsUserManager extends Component {
  render() {
    return <BizMicroDevBase component={List} sagaKey="EshsUserManager" />;
  }
}

export default EshsUserManager;
