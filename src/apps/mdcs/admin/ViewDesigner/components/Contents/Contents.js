import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContents = styled.div`
  position: relative;
  cursor: pointer;

  .col-body {
    display: flex;
    align-items: center;
    padding: 15px;
    min-height: 60px;
    background: ${({ selected }) => (selected ? '#eaeaea' : '#ffffff')};
    border: 1px solid #e3e3e3;
    :hover {
      background-color: rgb(231, 225, 240);
    }
  }
`;

const Contents = ({ selected, children, action }) => (
  <StyledContents onClick={action.selectCell} selected={selected}>
    <div className="col-body">{children}</div>
  </StyledContents>
);

Contents.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  action: PropTypes.shape({
    selectCell: PropTypes.func,
    mergeCell: PropTypes.func,
    divideCell: PropTypes.func,
  }),
};

Contents.defaultProps = {
  selected: false,
  children: null,
  action: {
    selectCell: () => {},
    mergeCell: () => {},
    divideCell: () => {},
  },
};

export default Contents;
