import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 이벤트 관리
    작업자 : 이정현
*/

const eventBrd = () => (
  <BizBuilderBase
    sagaKey="eventBrd_list"
    viewType="LIST"
    workSeq={14361}
    CustomListPage={ListPage}
    modalTitle="이벤트 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default eventBrd;
