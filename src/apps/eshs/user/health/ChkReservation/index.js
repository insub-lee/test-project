import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Reservation from './Reservation';

/*검진신청*/
class ChkReservation extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkReservation" component={Reservation} isManager={false}/>;
  }
}

export default ChkReservation;