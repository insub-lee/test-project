import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';

const emptyButtons = () => '';

const TakeOut = () => (
  <BizBuilderBase
    sagaKey="takeOut"
    workSeq={4781}
    viewType="INPUT"
    InputCustomButtons={emptyButtons}
    ModifyCustomButtons={emptyButtons}
    ViewCustomButtons={emptyButtons}
    ListCustomButtons={emptyButtons}
    relKey="반출증관리"
    relKey2="TAKEOUT_CD"
    prcId={116}
  />
);

export default TakeOut;
