import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkHospital extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkHospitalList" component={List} />;
  }
}

export default ChkHospital;