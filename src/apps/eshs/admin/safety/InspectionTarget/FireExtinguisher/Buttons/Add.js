import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function Add({ onCloseModalHandler }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModalHandler()}>
      추가
    </StyledButton>
  );
}

Add.defaultProps = {};

Add.propTypes = {};
