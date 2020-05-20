import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import CheckListPage from './page';

/*
    안전지킴이 - 안전작업신청 - 작업중 점검 등록
*/

const ingCheckList = () => (
  <Styeld>
    <BizMicroDevBase component={CheckListPage} sagaKey="safetyWork_ingCheck_List" />
  </Styeld>
);

export default ingCheckList;
