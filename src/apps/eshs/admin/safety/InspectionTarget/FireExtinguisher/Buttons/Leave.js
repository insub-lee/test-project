import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function Leave({ onCloseModalHandler }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModalHandler()}>
      나가기
    </StyledButton>
  );
}

Leave.defaultProps = {};

Leave.propTypes = {};
