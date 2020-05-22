import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import EduMgt from './EduMgt';

/*
    안전지킴이 - 기본정보 - 안전교육 이수 등록
*/

const safetyEdu = () => (
  <Styeld>
    <BizMicroDevBase component={EduMgt} sagaKey="safetyEdu" />
  </Styeld>
);

export default safetyEdu;
