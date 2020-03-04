import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';
import Input from './Input';

class MassageChairReservation extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="MassageChairReservation" workSeq={4201} viewType="LIST" CustomListPage={List} CustomInputPage={Input} />;
  }
}
MassageChairReservation.propTypes = {};

export default MassageChairReservation;
