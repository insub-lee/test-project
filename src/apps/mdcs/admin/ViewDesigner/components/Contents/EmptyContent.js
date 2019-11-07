import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledEmptyContent = styled.div`
  position: relative;
  .col-body {
    display: flex;
    min-height: 60px;
    align-items: center;
    justify-content: center;
    border: 1px dashed #eaeaea;
    text-align: center;
  }
`;

const EmptyContent = ({ children }) => (
  <StyledEmptyContent>
    <div className="col-body">{children}</div>
  </StyledEmptyContent>
);

EmptyContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

EmptyContent.defaultProps = {
  children: null,
};

export default EmptyContent;
