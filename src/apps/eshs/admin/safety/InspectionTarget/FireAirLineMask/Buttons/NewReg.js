import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function NewReg({ clickRegister }) {
  return (
    <StyledButton className="btn-primary btn-first" onClick={() => clickRegister()}>
      신규등록
    </StyledButton>
  );
}

NewReg.defaultProps = {};

NewReg.propTypes = {};
