import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function ResultInput({ onCloseModalHandler }) {
  return (
    <StyledButton className="btn-primary btn-first" onClick={() => onCloseModalHandler()}>
      결과입력
    </StyledButton>
  );
}

ResultInput.defaultProps = {};

ResultInput.propTypes = {};
