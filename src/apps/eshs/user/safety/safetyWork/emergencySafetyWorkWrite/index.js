import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import WritePage from './page';

/*
    안전지킴이 - 안전작업신청 - 긴급작업 등록
*/

const emergency = ({ authority }) => (
  <Styeld>
    <BizMicroDevBase component={WritePage} authority={authority} sagaKey="emergencySafetyWork_write" />
  </Styeld>
);

export default emergency;
