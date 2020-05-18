import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import AcceptPage from './page';

/*
    안전지킴이 - 안전작업신청 - 긴급작업 허가
*/

const emergencySafetyWorkAccept = () => (
  <Styeld>
    <BizMicroDevBase component={AcceptPage} sagaKey="emergencySafetyWork_accept" />
  </Styeld>
);

export default emergencySafetyWorkAccept;
