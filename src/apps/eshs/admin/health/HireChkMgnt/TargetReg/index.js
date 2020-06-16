import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetRegList from './TargetRegList';

class HireChkTargetList extends Component {
  render() {
    return <BizMicroDevBase sagaKey="HireChkTargetRegList" component={TargetRegList} />;
  }
}

export default HireChkTargetList;