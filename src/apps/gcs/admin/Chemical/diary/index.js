import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChemicalDiaryPage from './page';
import Styeld from './Styled';

/*
    GCS - Chemical - 일지관리
*/

const chemicalDiary = () => (
  <Styeld>
    <BizMicroDevBase component={ChemicalDiaryPage} sagaKey="chemicalDiary_list" />
  </Styeld>
);

export default chemicalDiary;
