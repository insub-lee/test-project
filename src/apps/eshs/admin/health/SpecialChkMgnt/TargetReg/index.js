import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetRegList from './TargetRegList';

class TargetReg extends Component {
  render() {
    return <BizMicroDevBase sagaKey="SpecialChkTargetReg" component={TargetRegList} />;
  }
}

export default TargetReg;