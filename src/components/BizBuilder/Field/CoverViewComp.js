import React, { Component } from 'react';
import { Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const CoverViewComp = ({ CONFIG, colData, formData, clickCoverView, clickJasperView }) => {
  const {
    property: { selectedValue },
  } = CONFIG;
  const { WORK_SEQ, TASK_SEQ, DOCNUMBER } = formData;
  let viewSeq = selectedValue;
  if (DOCNUMBER.indexOf('MBD') === 0) {
    viewSeq = 4884;
  } else {
    const aryDoc = DOCNUMBER.split('');
    if (aryDoc.length > 0) {
      if (aryDoc[1] === 'E' && (aryDoc[3] === 'B' || aryDoc[3] === 'C' || aryDoc[3] === 'J' || aryDoc[3] === 'K')) {
        viewSeq = 6682;
      }
    }
  }
  let reportType = '';
  switch (WORK_SEQ) {
    case 901:
      reportType = 'biz';
      break;
    case 1921:
      reportType = 'tech';
      break;
    case 1881:
      reportType = 'dw';
      break;
    case 2975:
      reportType = 'npi';
      break;
    case 2941:
      reportType = 'tds';
      break;
    case 3013:
      reportType = 'wp';
      break;
    default:
      break;
  }
  const fullpath = window.location.origin;
  const jasperPath = (fullpath.includes('dev') || fullpath.includes('local')) ? 'Dev' : 'Prod';
  const bizDocCoverView = `http://10.100.22.99:4488/jasperserver-pro/rest_v2/reports/public/reports/${jasperPath}/MDCS/${reportType}DocReport.html?workSeq=${WORK_SEQ}&taskSeq=${TASK_SEQ}&j_username=superuser&j_password=superuser`;
  return (
    <>
      <StyledButton className="btn-gray btn-xxs btn-radius mr5" onClick={() => clickCoverView(WORK_SEQ, TASK_SEQ, viewSeq)}>
        <FileSearchOutlined /> 표지보기
      </StyledButton>
      {clickJasperView && (
        <StyledButton className="btn-gray btn-xxs btn-radius" onClick={() => clickJasperView(bizDocCoverView)}>
          <FileSearchOutlined /> 리포트보기
        </StyledButton>
      )}
    </>
  );
};

export default CoverViewComp;
