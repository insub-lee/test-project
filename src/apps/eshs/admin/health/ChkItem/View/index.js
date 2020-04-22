import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HealthChkItemView from './HealthChkItemView';

class ChkItem extends Component {
  render() {
    const { selectedRow, onCancelPopup, onSaveAfter } = this.props;
    return <BizMicroDevBase sagaKey="healthChkItemView" component={HealthChkItemView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} onSaveAfter={onSaveAfter} />;
  }
}

export default ChkItem;