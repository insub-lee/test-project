import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContents = styled.div`
  position: relative;

  .cell-body {
    display: flex;
    align-items: center;
    padding: 15px;
    background: '#ffffff';
    border: 1px solid #e3e3e3;
  }
`;

const Contents = ({ children }) => <StyledContents>{children}</StyledContents>;

Contents.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Contents.defaultProps = {
  children: null,
};

export default Contents;
