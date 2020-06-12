import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DistributeDocView from './DistributeDocView';

class DocView extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase sagaKey="distributeDocView" component={DistributeDocView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />
  }
}

export default DocView;