import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import WritePage from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const illegalSafetyWork = () => (
  <Styeld>
    <BizMicroDevBase component={WritePage} sagaKey="illegalSafetyWork" />
  </Styeld>
);

export default illegalSafetyWork;
