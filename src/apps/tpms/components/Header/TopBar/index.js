import React from 'react';
import PropTypes from 'prop-types';
import StyledTopBar from './StyledTopBar';
import Logo from './Logo';
import GNB from './GNB';

const TopBar = ({ menus, action }) => (
  <StyledTopBar>
    <Logo />
    <GNB menus={menus} action={action} />
  </StyledTopBar>
);

TopBar.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

TopBar.defaultProps = {
  menus: [],
  action: {
    logout: () => false,
  },
};

export default TopBar;
