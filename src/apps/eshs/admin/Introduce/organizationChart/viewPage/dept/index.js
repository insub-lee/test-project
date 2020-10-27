import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ViewPage from '../page';
import Styeld from '../Styled';

/*
    소개 - 부서, 업체별 ESH 책임자 및 담당자 현황
*/

const organizationChartView = () => (
  <Styeld>
    <BizMicroDevBase component={ViewPage} sagaKey="organizationChart_view_dept" orgType="DEPT" />
  </Styeld>
);

export default organizationChartView;
