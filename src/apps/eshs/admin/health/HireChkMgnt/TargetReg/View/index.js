import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import TargetView from './TargetView';

class View extends Component {
  render() {
    return <BizMicroDevBase sagaKey="HireChkTargetView" component={TargetView} { ...this.props} />;
  }
}

export default View;