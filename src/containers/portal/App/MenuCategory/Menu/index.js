import React from 'react';
import PropTypes from 'prop-types';
import SideMenu from 'react-sidemenu';

import StlyedDefaultTheme from './StlyedDefaultTheme';

const Tree = ({ treeData, handleClick }) => (
  <StlyedDefaultTheme>
    <SideMenu collapse={true} items={treeData} onMenuItemClick={handleClick} />
  </StlyedDefaultTheme>
);

Tree.propTypes = {
  treeData: PropTypes.array,
  handleClick: PropTypes.func,
};

Tree.defaultProps = {
  treeData: [],
  handleClick: () => {},
};

export default Tree;
