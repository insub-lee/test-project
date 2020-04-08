import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import UserView from './UserView';

class View extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase id="userView" component={UserView} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />
  }
}

export default View;