import React, { Component } from 'react';
import { Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const CoverViewComp = ({ CONFIG, colData, formData, clickCoverView }) => {
  const {
    property: { selectedValue },
  } = CONFIG;
  const { WORK_SEQ } = formData;
  return (
    <StyledButton className="btn-light btn-xs btn-radius" onClick={() => clickCoverView(WORK_SEQ, colData, selectedValue)}>
      <FileSearchOutlined /> 표지보기
    </StyledButton>
  );
};

export default CoverViewComp;
