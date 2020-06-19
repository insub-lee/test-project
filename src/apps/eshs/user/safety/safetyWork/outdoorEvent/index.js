import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

/*
    안전지킴이 - 야외행사승인 신청서 - 야외행사 수립 신청
*/

const emptyButtons = () => <div />;

const outdoorEvent = () => (
  <BizBuilderBase
    sagaKey="outdoorEvent"
    viewType="INPUT"
    workSeq={4821}
    InputCustomButtons={emptyButtons}
    ListCustomButtons={emptyButtons}
    ModifyCustomButtons={emptyButtons}
  />
);

export default outdoorEvent;
