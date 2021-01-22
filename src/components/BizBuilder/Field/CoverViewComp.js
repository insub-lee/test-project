import React, { Component } from 'react';
import PropTypes from 'prop-types';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
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
  let reportType = ''; // MDCS 문서종류 (업무표준, 기술표준, 도면, NPI, TDS, WP)
  let reportable = false; // MDCS Jasper Report 지원여부
  switch (WORK_SEQ) {
    case 901:
      reportType = 'biz';
      reportable = true;
      break;
    case 1921:
      reportType = 'tech';
      reportable = true;
      break;
    case 1881:
      reportType = 'dw';
      reportable = true;
      break;
    case 2975:
      reportType = 'npi';
      reportable = true;
      break;
    case 2941:
      reportType = 'tds';
      reportable = true;
      break;
    case 3013:
      reportType = 'wp';
      reportable = true;
      break;
    default:
      break;
  }
  // IE 에서 Jasper Report (PDF) 형태로 출력이 호환되지 않아, IE 에선 error message가 출력되도록 처리
  let isIE = false;
  const agent = navigator.userAgent.toLowerCase();
  if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1) {
    isIE = true;
  }
  const fullpath = window.location.origin;
  const jasperPath = (fullpath.includes('dev') || fullpath.includes('local')) ? 'Dev' : 'Prod';
  const bizDocCoverView = `http://10.100.22.99:4488/jasperserver-pro/rest_v2/reports/public/reports/${jasperPath}/MDCS/${reportType}DocReport.html?workSeq=${WORK_SEQ}&taskSeq=${TASK_SEQ}&j_username=superuser&j_password=superuser`;
  return (
    <>
      <StyledButton className="btn-gray btn-xxs btn-radius mr5" onClick={() => clickCoverView(WORK_SEQ, TASK_SEQ, viewSeq)}>
        <FileSearchOutlined /> 표지보기
      </StyledButton>
      {clickJasperView && reportable && (
        <StyledButton
          className="btn-gray btn-xxs btn-radius"
          onClick={() => {
            if (isIE) {
              message.error(
                <MessageContent>
                  <span>Internet Explorer (IE)에선 리포트가 지원되지 않습니다.</span>
                  <br />
                  <span>Chrome, Edge 등 최신 브라우저를 이용해주십시오.</span>
                </MessageContent>,
              );
            } else {
              clickJasperView(bizDocCoverView);
            }
          }}
        >
          <FileSearchOutlined /> 리포트보기
        </StyledButton>
      )}
    </>
  );
};

export default CoverViewComp;

CoverViewComp.propTypes = {
  formData: PropTypes.object,
  colData: PropTypes.any,
  CONFIG: PropTypes.object,
  clickCoverView: PropTypes.func,
  clickJasperView: PropTypes.func,
};
