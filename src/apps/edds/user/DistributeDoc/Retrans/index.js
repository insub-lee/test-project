import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import RetransRequest from './RetransRequest';

class ReTrans extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase id="retransRequest" component={RetransRequest} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />
  }
}

export default ReTrans;