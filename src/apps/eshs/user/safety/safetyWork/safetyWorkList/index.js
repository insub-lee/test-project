import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import safetyWorkList from './page';

/*
    안전지킴이 - 안전작업신청 - 안전작업 신청
*/

const safetyWork = props => (
  <Styeld>
    <BizMicroDevBase {...props} component={safetyWorkList} sagaKey="safetyWorkList" />
  </Styeld>
);

export default safetyWork;
