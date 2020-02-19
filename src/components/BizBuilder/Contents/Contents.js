import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContents = styled.div`
  position: relative;
  cursor: pointer;
  height: 100%;

  .col-body {
    display: flex;
    align-items: center;
    padding: ${({ selected }) => (selected ? 'calc(12px - 2px)' : 'calc(12px - 1px)')};
    //min-height: 100px;
    height: 100%;
    /* background: ${({ selected }) => (selected ? '#eaeaea' : '#ffffff')}; */
    border: ${({ selected }) => (selected ? '2px solid #a646be' : '1px solid #e3e3e3')};
    border-radius: 5px;
    box-sizing: border-box;
    :hover {
      border: 2px solid #a646be;
      padding: calc(12px - 2px);
    }
    &.col-body02 {
      background: #e7e1f0;
    }
  }
  
  .help-message {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px 3px;
  }
`;

const Contents = ({ selected, children, action, size }) => (
  <StyledContents onClick={action.selectCell} selected={selected}>
    {/* <div className="help-message">{JSON.stringify(size)}</div> */}
    <div className={`col-body${children.props.col && children.props.col.comp && children.props.col.comp.COMP_TAG !== 'LABEL' ? ' col-body02' : ''}`}>
      {children}
    </div>
  </StyledContents>
);

Contents.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  action: PropTypes.shape({
    selectCell: PropTypes.func,
  }),
  size: PropTypes.arrayOf(PropTypes.number),
};

Contents.defaultProps = {
  selected: false,
  children: null,
  action: {
    selectCell: () => {},
  },
  size: [0, 0],
};

export default Contents;
