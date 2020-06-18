import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetRegForm from './TargetRegForm';

class RegForm extends Component {
  render() {
    return <BizMicroDevBase sagaKey="HireChkTargetRegForm" component={TargetRegForm} { ...this.props} />;
  }
}

export default RegForm;