import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChemicalStatusPage from './page';
import Styeld from './Styled';

/*
    GCS - Chemical - 현황관리
*/

const chemicalStatus = () => (
  <Styeld>
    <BizMicroDevBase component={ChemicalStatusPage} sagaKey="chemicalStatus_list" />
  </Styeld>
);

export default chemicalStatus;
