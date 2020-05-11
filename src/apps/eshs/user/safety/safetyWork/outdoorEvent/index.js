import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ModifyCustomButtons from './CustomButtons/ModifyCustomButtons';

/*
    안전지킴이 - 야외행사승인 신청서 - 야외행사 수립 신청
*/

const emptyButtons = () => <div />;

const outdoorEvent = () => (
  <BizBuilderBase sagaKey="outdoorEvent" viewType="INPUT" workSeq={4821} ModifyCustomButtons={ModifyCustomButtons} ListCustomButtons={emptyButtons} />
);

export default outdoorEvent;
