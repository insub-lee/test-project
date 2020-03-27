import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styled from './styled';

const EnvironmentMasterRegistration = () => (
  <Styled>
    <BizMicroDevBase sagaKey="EnvironmentMasterRegistration" component={List} />
  </Styled>
);

export default EnvironmentMasterRegistration;
