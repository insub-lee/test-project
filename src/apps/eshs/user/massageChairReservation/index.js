import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

const MassageChairReservation = () => <BizBuilderBase sagaKey="MassageChairReservation" workSeq={4201} viewType="LIST" CustomListPage={List} />;
MassageChairReservation.propTypes = {};

export default MassageChairReservation;
