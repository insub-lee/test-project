import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetList from './TargetList';

class SpecialChkTargetList extends Component {
  render() {
    return <BizMicroDevBase sagaKey="SpecialChkTargetList" component={TargetList} chkTypeCd='003' />;
  }
}

export default SpecialChkTargetList;