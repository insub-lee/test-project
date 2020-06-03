import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkMstView from './ChkMstView';

class View extends Component {
  render() {
    const { onCancelPopup, selectedRow } = this.props;
    return <BizMicroDevBase sagaKey="ChkMstView" component={ChkMstView} onCancelPopup={onCancelPopup} selectedRow={selectedRow} />;
  }
}

export default View;