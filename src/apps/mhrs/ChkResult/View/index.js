import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from './View';

class ChkResultDetail extends Component {
  render() {
    const { onCancelPopup, selectedRow } = this.props;
    return <BizMicroDevBase sagaKey="ChkResultDetail" component={View} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />;
  }
}

export default ChkResultDetail;
