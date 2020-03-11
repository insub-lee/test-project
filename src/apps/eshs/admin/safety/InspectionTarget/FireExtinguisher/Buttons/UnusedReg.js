import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function UnusedReg() {
  return (
    <StyledButton className="btn-primary" onClick={() => {}}>
      미사용등록
    </StyledButton>
  );
}

UnusedReg.defaultProps = {};

UnusedReg.propTypes = {};
