import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 민원 / 고충처리 관리
    작업자 : 이정현
*/

const womanComplainBrd = () => (
  <BizBuilderBase
    sagaKey="womanComplainBrd_list"
    viewType="LIST"
    workSeq={14081}
    CustomListPage={ListPage}
    modalTitle="고충 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default womanComplainBrd;
