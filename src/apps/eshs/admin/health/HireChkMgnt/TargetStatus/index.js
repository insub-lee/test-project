import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetStatus from './TargetStatus';

class HireChkTargetStatus extends Component {
  render() {
    return <BizMicroDevBase sagaKey="HireChkTargetStatus" component={TargetStatus} />;
  }
}

export default HireChkTargetStatus;