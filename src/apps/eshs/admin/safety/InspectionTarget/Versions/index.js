import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import VersionMgtPage from './page';
import Styled from './Styled';

/*
    안전지킴이 - 소방점검 - 소방점검 버전관리
*/

const fireVersionMgt = () => (
  <Styled>
    <BizMicroDevBase component={VersionMgtPage} sagaKey="fireVersionMgt" />
  </Styled>
);

export default fireVersionMgt;
