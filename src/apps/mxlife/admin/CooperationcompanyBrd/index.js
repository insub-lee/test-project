import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 제휴업체 관리
    작업자 : 이정현
*/

const cooperationcompanyBrd = () => (
  <BizBuilderBase
    sagaKey="cooperationcompanyBrd_list"
    viewType="LIST"
    workSeq={13901}
    CustomListPage={ListPage}
    modalTitle="협력업체 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default cooperationcompanyBrd;
