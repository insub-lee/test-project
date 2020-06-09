import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetRegList from 'apps/eshs/admin/health/common/TargetReg';

class TargetReg extends Component {
  render() {
    return <BizMicroDevBase sagaKey="comprehensiveChkMgnt" component={TargetRegList} chkTypeCd='002' />;
  }
}

export default TargetReg;