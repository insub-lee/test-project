import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function Status() {
  return (
    <StyledButton className="btn-primary" onClick={() => {}}>
      현황
    </StyledButton>
  );
}

Status.defaultProps = {};

Status.propTypes = {};
