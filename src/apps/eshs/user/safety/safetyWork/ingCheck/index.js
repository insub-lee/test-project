import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import CheckPage from './page';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
*/

const ingCheck = () => (
  <Styeld>
    <BizMicroDevBase component={CheckPage} sagaKey="safetyWork_ingCheck" />
  </Styeld>
);

export default ingCheck;
