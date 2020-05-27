import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Quota from './Quota';

class ChkHospitalQuota extends Component {
  render() {
    return <BizMicroDevBase sagaKey="Quota" component={Quota} />;
  }
}

export default ChkHospitalQuota;