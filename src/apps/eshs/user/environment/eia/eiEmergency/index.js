import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiEmergency extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiEmergency" id="eiEmergency" tbName="EMERGENCY" />;
  }
}

export default eiEmergency;
