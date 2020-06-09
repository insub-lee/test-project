import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetList from 'apps/eshs/admin/health/common/TargetList';

class GeneralChkTargetList extends Component {
  render() {
    return <BizMicroDevBase sagaKey="GeneralChkTargetList" component={TargetList} chkTypeCd='001' />;
  }
}

export default GeneralChkTargetList;