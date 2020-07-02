import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 콘도 관리
    작업자 : 이정현
*/

const noticeBrd = () => (
  <BizBuilderBase
    sagaKey="noticeBrd_list"
    viewType="LIST"
    workSeq={14261}
    CustomListPage={ListPage}
    modalTitle="공지사항 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default noticeBrd;
