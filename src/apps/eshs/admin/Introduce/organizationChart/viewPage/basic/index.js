import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ViewPage from '../page';
import Styeld from '../Styled';

/*
    소개 - 환경안전팀 조직도 및 담당업무
*/

const organizationChartView = () => (
  <Styeld>
    <BizMicroDevBase component={ViewPage} sagaKey="organizationChart_view_basic" orgType="BASIC" />
  </Styeld>
);

export default organizationChartView;
