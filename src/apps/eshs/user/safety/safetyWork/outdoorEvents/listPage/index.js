import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

/*
    안전지킴이 - 야외행사승인 신청서 - 야외행사 수립 리스트 페이지
*/

const emptyBtn = () => '';

const outdoorEvent = () => (
  <BizBuilderBase
    sagaKey="outdoorEvent_list"
    viewType="LIST"
    workSeq={16321}
    modalTitle="야외행사 조회"
    ViewCustomButtonsByModal={emptyBtn}
    ListCustomButtons={emptyBtn}
  />
);

export default outdoorEvent;
