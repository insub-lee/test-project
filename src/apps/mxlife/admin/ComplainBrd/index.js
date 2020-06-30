import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 민원 / 고충처리 관리
    작업자 : 이정현
*/

const complainBrd = () => (
  <BizBuilderBase sagaKey="complainBrd_list" viewType="LIST" workSeq={13201} ViewCustomButtonsByModal={ViewButtons} />
);

export default complainBrd;
