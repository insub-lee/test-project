import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import SafetyWorkMain from './page/main';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const safetyWork = () => (
  <Styeld>
    <BizMicroDevBase component={SafetyWorkMain} sagaKey="safetyWork" />
  </Styeld>
);

export default safetyWork;
