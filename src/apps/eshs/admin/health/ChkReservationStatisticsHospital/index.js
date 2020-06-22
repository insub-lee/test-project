import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Statistics from './Statistics';

class ChkReservationStatisticsHospital extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ChkReservationStatisticsHospital" component={Statistics} />;
  }
}

export default ChkReservationStatisticsHospital;
