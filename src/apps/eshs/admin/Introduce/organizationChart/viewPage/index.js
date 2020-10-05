import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ViewPage from './page';
import Styeld from './Styled';

/*
    소개 - 조직도 및 담당업무 View
*/

const organizationChartView = () => (
  <Styeld>
    <BizMicroDevBase component={ViewPage} sagaKey="organizationChart_view" />
  </Styeld>
);

export default organizationChartView;
