import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Styeld from './Styled';
import ResultReportPage from './page';

/*
    안전지킴이 - 안전작업 현황 - 안전작업 결과보고서
*/

const resultReport = () => (
  <Styeld>
    <BizMicroDevBase component={ResultReportPage} sagaKey="safetyWork_result_report" />
  </Styeld>
);

export default resultReport;
