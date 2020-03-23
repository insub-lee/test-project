import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function Add({ onCloseModleHandler }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModleHandler()}>
      추가
    </StyledButton>
  );
}

Add.defaultProps = {};

Add.propTypes = {};
