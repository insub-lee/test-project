import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InputForm from './InputForm';

class NotChkReg extends Component {
  render() {
    return <BizMicroDevBase sagaKey="NotChkReg" component={InputForm} selectedRow={this.props.selectedRow} onCancelPopup={this.props.onCancelPopup} />;
  }
}

export default NotChkReg;