import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function History({ onCloseModleHandler, detail }) {
  return (
    <StyledButton className="btn-primary" onClick={() => onCloseModleHandler()}>
      History({detail})
    </StyledButton>
  );
}

History.defaultProps = {};

History.propTypes = {};
