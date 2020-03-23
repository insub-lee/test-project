import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

class MassageChairReservation extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="MassageChairReservation" workSeq={4201} viewType="LIST" CustomListPage={List} />;
  }
}
MassageChairReservation.propTypes = {};

export default MassageChairReservation;
