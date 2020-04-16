import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HealthChkResultCodeView from './HealthChkResultCodeView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup, onSaveAfter } = this.props;
    return <BizMicroDevBase sagaKey="healthChkResultCodeJView" component={HealthChkResultCodeView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} onSaveAfter={onSaveAfter} />;
  }
}

export default View;