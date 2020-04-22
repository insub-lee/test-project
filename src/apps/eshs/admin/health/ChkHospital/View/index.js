import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkHospitalView from './ChkHospitalView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup, onSaveAfter } = this.props;
    return <BizMicroDevBase sagaKey="chkHospitalView" component={ChkHospitalView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} onSaveAfter={onSaveAfter} />;
  }
}

export default View;