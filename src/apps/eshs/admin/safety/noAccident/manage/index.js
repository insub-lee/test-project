import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import NoaccidentManagePage from './page';
import Styeld from './Styled';

/*
    안전지킴이 - 무재해시간 - 관리
*/

const noAccidentManage = () => (
  <Styeld>
    <BizMicroDevBase component={NoaccidentManagePage} sagaKey="noAccident_manage" />
  </Styeld>
);

export default noAccidentManage;
