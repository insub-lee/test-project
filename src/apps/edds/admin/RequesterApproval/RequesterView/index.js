import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import RequesterView from './RequesterView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase id="requesterView" component={RequesterView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />
  }
}

export default View;