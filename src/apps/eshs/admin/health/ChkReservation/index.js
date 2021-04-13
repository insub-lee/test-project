import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Reservation from 'apps/eshs/user/health/ChkReservation/Reservation';

/*검진변경*/
class ChkReservation extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkReservation" component={Reservation} isManager={true}/>;
  }
}

export default ChkReservation;