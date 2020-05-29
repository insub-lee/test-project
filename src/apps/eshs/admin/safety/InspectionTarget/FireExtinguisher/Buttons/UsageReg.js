import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function UsageReg({ clickUsage }) {
  return (
    <StyledButton className="btn-primary" onClick={() => clickUsage()}>
      미사용등록 
    </StyledButton>
  );
}

UsageReg.defaultProps = {};

UsageReg.propTypes = {};
