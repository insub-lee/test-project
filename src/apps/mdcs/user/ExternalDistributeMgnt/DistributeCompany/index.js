import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DistributeCompanyView from './DistributeCompanyView';

class DistributeCompany extends Component {
  render() {
    const { selectedRow, onCancelPopup, onSaveAfter } = this.props;
    return <BizMicroDevBase id="distributeCompany" component={DistributeCompanyView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} onSaveAfter={onSaveAfter} />;
  }
}
// const DistributeCompany = selectedRow => <BizMicroDevBase id="distributeCompany" component={DistributeCompanyView} selectedRow={selectedRow} />;

export default DistributeCompany;