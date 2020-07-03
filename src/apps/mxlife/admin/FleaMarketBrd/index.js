import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import { ViewButtons, InputButtons } from './customButton';
import ListPage from './page/ListPage';

/*
    MXLIFE - 이벤트 관리
    작업자 : 이정현
*/

const fleaMarketBrd = () => (
  <BizBuilderBase
    sagaKey="fleaMarket_list"
    viewType="LIST"
    workSeq={14461}
    CustomListPage={ListPage}
    modalTitle="벼룩시장 판매물품 등록"
    InputCustomButtonsByModal={InputButtons}
    ViewCustomButtonsByModal={ViewButtons}
  />
);

export default fleaMarketBrd;
