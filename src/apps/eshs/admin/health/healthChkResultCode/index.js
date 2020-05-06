import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class HealthChkResultCode extends Component {
  render() {
    return <BizMicroDevBase sagaKey="healthChkResultCode" component={List} />;
  }
}

export default HealthChkResultCode;