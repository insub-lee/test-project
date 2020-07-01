import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 콘도 관리
    작업자 : 이정현
*/

const condoBrd = () => (
  <BizBuilderBase
    sagaKey="condoBrd_list"
    viewType="LIST"
    workSeq={13601}
    CustomListPage={ListPage}
    modalTitle="콘도 등록"
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default condoBrd;
