import React from 'react';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function NewReg({ modalHandler }) {
  return (
    <StyledButton className="btn-primary btn-first btn-sm" onClick={() => modalHandler('newReg', true)}>
      신규등록
    </StyledButton>
  );
}

NewReg.defaultProps = {};

NewReg.propTypes = {};
