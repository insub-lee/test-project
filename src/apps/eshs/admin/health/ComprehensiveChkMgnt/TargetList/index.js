import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetList from 'apps/eshs/admin/health/common/TargetList';

class ComprehensiveChkTargetList extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ComprehensiveChkTargetList" component={TargetList} chkTypeCd='002' />;
  }
}

export default ComprehensiveChkTargetList;