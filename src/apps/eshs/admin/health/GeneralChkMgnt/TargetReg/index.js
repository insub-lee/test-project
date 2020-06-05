import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class TargetReg extends Component {
  render() {
    return <BizMicroDevBase sagaKey="generalChkTargetReg" component={List} />;
  }
}

export default TargetReg;