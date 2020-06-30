import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Statistics from './Statistics';

class ChkReservationStatistics extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ChkReservationStatistics" component={Statistics} />;
  }
}

export default ChkReservationStatistics;
