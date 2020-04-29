import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkHospitalItem extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkHospitalItemList" component={List} />;
  }
}

export default ChkHospitalItem;