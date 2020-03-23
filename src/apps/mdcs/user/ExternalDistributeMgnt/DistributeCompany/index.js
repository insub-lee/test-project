import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DistributeCompanyView from './DistributeCompanyView';

class DistributeCompany extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase id="distributeCompany" component={DistributeCompanyView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />;
  }
}
// const DistributeCompany = selectedRow => <BizMicroDevBase id="distributeCompany" component={DistributeCompanyView} selectedRow={selectedRow} />;

export default DistributeCompany;