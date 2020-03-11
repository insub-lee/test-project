import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function NewReg({ clickRegister }) {
  return (
    <StyledButton className="btn-primary" onClick={() => clickRegister()}>
      신규등록
    </StyledButton>
  );
}

NewReg.defaultProps = {};

NewReg.propTypes = {};
