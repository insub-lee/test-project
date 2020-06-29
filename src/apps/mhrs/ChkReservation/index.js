import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkReservation extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ChkReservation" component={List} />;
  }
}

export default ChkReservation;