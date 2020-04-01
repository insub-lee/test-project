import React from 'react';
// import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styeld from './Styled';

const workerMgt = () => (
  <Styeld>
    <BizMicroDevBase component={List} sagaKey="EshsWorkerManager" />
  </Styeld>
);

export default workerMgt;
