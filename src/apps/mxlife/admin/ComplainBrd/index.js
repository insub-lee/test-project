import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 민원 / 고충처리 관리
    작업자 : 이정현
*/

const complainBrd = () => (
  <BizBuilderBase
    sagaKey="complainBrd_list"
    viewType="LIST"
    workSeq={13201}
    CustomListPage={ListPage}
    modalTitle="민원/고충 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default complainBrd;
