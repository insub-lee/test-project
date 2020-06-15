import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Reservation from './Reservation';

class ChkReservation extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkReservation" component={Reservation} isManager={false} />;
  }
}

export default ChkReservation;