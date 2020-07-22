import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import GasDiaryPage from './page';
import Styeld from './Styled';

/*
    GCS - Gas - 일지관리
*/

const gasDiary = () => (
  <Styeld>
    <BizMicroDevBase component={GasDiaryPage} sagaKey="GasDiary_list" />
  </Styeld>
);

export default gasDiary;
