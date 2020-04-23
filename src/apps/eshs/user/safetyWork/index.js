import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import SafetyWorkMain from './main';

const safetyWork = () => (
  <Styeld>
    <BizMicroDevBase component={SafetyWorkMain} sagaKey="safetyWork" />
  </Styeld>
);

export default safetyWork;
