import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkHospitalItemView from './ChkHospitalItemView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup, onSaveAfter } = this.props;
    return <BizMicroDevBase sagaKey="chkHospitalItemView" component={ChkHospitalItemView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} onSaveAfter={onSaveAfter} />;
  }
}

export default View;