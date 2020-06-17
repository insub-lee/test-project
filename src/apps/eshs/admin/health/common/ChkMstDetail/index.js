import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkMstView from './ChkMstView';

class ChkMstDetail extends Component {
  render() {
    const { onCancelPopup, selectedRow } = this.props;
    return <BizMicroDevBase sagaKey="ChkMstDetail" component={ChkMstView} onCancelPopup={onCancelPopup} selectedRow={selectedRow} />;
  }
}

export default ChkMstDetail;