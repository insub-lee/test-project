import React, { Component } from 'react';
import { Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const CoverViewComp = ({ CONFIG, colData, formData, clickCoverView }) => {
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
  console.debug('coverviewinfo', CONFIG);
  return (
    <StyledButton className="btn-gray btn-xxs btn-radius" onClick={() => clickCoverView(WORK_SEQ, TASK_SEQ, viewSeq)}>
      <FileSearchOutlined /> 표지보기
    </StyledButton>
  );
};

export default CoverViewComp;
