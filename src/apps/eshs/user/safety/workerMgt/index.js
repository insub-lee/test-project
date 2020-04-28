import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styeld from './Styled';

/*
    안전지킴이 - 기본정보 - 작업자 관리
*/

const workerMgt = () => (
  <Styeld>
    <BizMicroDevBase component={List} sagaKey="EshsWorkerManager" />
  </Styeld>
);

export default workerMgt;
