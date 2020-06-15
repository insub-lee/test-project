import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Reservation from 'apps/eshs/user/health/ChkReservation/Reservation';

class ChkReservation extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkReservation" component={Reservation} isManager={true} />;
  }
}

export default ChkReservation;