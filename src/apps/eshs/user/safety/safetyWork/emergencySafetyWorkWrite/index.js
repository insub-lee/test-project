import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import emergencySafetyWorkWrite from './page';

/*
    안전지킴이 - 안전작업신청 - 긴급작업 등록
*/

const emergency = () => (
  <Styeld>
    <BizMicroDevBase component={emergencySafetyWorkWrite} sagaKey="emergencySafetyWork" />
  </Styeld>
);

export default emergency;
