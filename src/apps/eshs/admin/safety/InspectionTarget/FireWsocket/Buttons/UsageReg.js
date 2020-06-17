import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function UsageReg({ clickUsage }) {
  return (
    <StyledButton className="btn-primary btn-first" onClick={() => clickUsage()}>
      미사용등록
    </StyledButton>
  );
}

UsageReg.defaultProps = {};

UsageReg.propTypes = {};
