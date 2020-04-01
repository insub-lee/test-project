import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styled from './styled';

const EnvironmentSapUsageRegistration = () => (
  <Styled>
    <BizMicroDevBase sagaKey="EnvironmentSapUsageRegistration" component={List} />
  </Styled>
);

export default EnvironmentSapUsageRegistration;
