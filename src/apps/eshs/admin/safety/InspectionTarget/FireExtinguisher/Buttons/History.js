import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function History({ onCloseModalHandler, detail }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModalHandler()}>
      History({detail})
    </StyledButton>
  );
}

History.defaultProps = {};

History.propTypes = {};
