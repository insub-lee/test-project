import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function ResultInput({ onCloseModalHandler }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModalHandler()}>
      결과입력
    </StyledButton>
  );
}

ResultInput.defaultProps = {};

ResultInput.propTypes = {};
