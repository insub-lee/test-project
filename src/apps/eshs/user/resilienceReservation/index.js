import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './List';

const ResilienceReservation = () => <BizBuilderBase sagaKey="ResilienceReservation" workSeq={5201} viewType="LIST" CustomListPage={List} />;

export default ResilienceReservation;
