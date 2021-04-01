import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
// 기존 WorkSeq : 9201
const Participant = () => <BizMicroDevBase sagaKey="participant" component={List} />;

export default Participant;
