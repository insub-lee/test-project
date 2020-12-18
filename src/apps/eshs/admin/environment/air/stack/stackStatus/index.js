import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from './List';

// ESH - 환경 - 대기 - Stack 설치 현황

const StackStatus = () => (
  <BizBuilderBase
    sagaKey="stackLookUp"
    workSeq={4401}
    taskSeq={-1}
    viewType="LIST"
    listMetaSeq={4461}
    CustomListPage={CustomList} // 버튼 및 리스트 크기 이슈로  custom Page 사용
    ViewCustomButtonsByModal={() => ''}
  />
);

export default StackStatus;
