import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import CheckDiaryPage from './page';

/*
    안전지킴이 - 안전작업현황 - 안전작업 점검일지 */

const CheckDiary = () => (
  <Styeld>
    <BizMicroDevBase component={CheckDiaryPage} sagaKey="safetyWork_cmpny_check_diary" />
  </Styeld>
);

export default CheckDiary;
