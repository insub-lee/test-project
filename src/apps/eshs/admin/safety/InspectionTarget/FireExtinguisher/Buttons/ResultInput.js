import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function ResultInput({ onCloseModleHandler }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModleHandler()}>
      결과입력
    </StyledButton>
  );
}

ResultInput.defaultProps = {};

ResultInput.propTypes = {};
