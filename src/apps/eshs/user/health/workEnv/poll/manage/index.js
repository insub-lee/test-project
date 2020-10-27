import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PollManagePage from './page';
import Styeld from './Styled';

/*
    보건지킴이 - 보건관리 - 설문관리
*/

const organizationChartView = () => (
  <Styeld>
    <BizMicroDevBase component={PollManagePage} sagaKey="poll_manage" />
  </Styeld>
);

export default organizationChartView;
