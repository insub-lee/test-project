import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import safetyWorkWrite from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const safetyWork = () => (
  <Styeld>
    <BizMicroDevBase component={safetyWorkWrite} sagaKey="safetyWork" />
  </Styeld>
);

export default safetyWork;
