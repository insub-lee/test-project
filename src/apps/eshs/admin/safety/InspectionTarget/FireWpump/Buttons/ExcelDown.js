import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);
export default function ExcelDown() {
  return (
    <StyledButton className="btn-primary btn-first" onClick={() => {}}>
      엑셀받기
    </StyledButton>
  );
}

ExcelDown.defaultProps = {};

ExcelDown.propTypes = {};
