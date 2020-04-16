import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HealthChkResultCodeView from './HealthChkResultCodeView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase sagaKey="healthChkResultCodeJView" component={HealthChkResultCodeView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />;
  }
}

export default View;