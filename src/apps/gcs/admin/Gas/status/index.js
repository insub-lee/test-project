import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import GasStatusPage from './page';
import Styeld from './Styled';

/*
    GCS - Gas - 현황관리
*/

const chemicalStatus = () => (
  <Styeld>
    <BizMicroDevBase component={GasStatusPage} sagaKey="gasStatus_list" />
  </Styeld>
);

export default chemicalStatus;
