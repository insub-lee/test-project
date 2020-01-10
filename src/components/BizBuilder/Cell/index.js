import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyleGuide from '../StyleGuide';
import Mask from '../Mask';

const StyledContents = styled.div`
  position: relative;
  height: 100%;
  min-height: 10px;
  cursor: pointer;

  .cell-body {
    display: flex;
    align-items: center;
    padding: 15px;
    /* min-height: 60px; */
    background: ${({ selected }) => (selected ? '#eaeaea' : '#ffffff')};
    border: 1px solid #e3e3e3;
  }

  /* :hover > .style-guide {
    display: block;
  } */
`;

const Contents = ({ selected, children, action, option: { style }, widthOption }) => (
  <StyledContents onClick={action.selectCell} selected={selected}>
    {children}
    <Mask active={selected} />
    <StyleGuide
      style={style}
      active={selected}
      updateStyleWidth={(width, diff) => action.updateStyleWidth(width, diff)}
      updateStyleHeight={height => action.updateStyleHeight(height)}
      updateStyleRowHeight={action.updateStyleRowHeight}
      widthOption={widthOption}
    />
  </StyledContents>
);

Contents.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  action: PropTypes.shape({
    selectCell: PropTypes.func,
    mergeCell: PropTypes.func,
    divideCell: PropTypes.func,
    updateStyleWidth: PropTypes.func,
    updateStyleHeight: PropTypes.func,
    updateStyleRowHeight: PropTypes.func,
  }),
  option: PropTypes.shape({
    style: PropTypes.object,
  }),
  widthOption: PropTypes.shape({
    current: PropTypes.string,
    diffTarget: PropTypes.string,
  }),
};

Contents.defaultProps = {
  selected: false,
  children: null,
  action: {
    selectCell: () => {},
    mergeCell: () => {},
    divideCell: () => {},
    updateStyleWidth: () => {},
    updateStyleHeight: () => {},
    updateStyleRowHeight: () => {},
  },
  option: {
    style: {},
  },
  widthOption: {
    current: '0%',
    diffTarget: '0%',
  },
};

export default Contents;
