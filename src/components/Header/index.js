import React from 'react';
import { FormattedMessage } from 'react-intl';

import StyledHeader from './StyledHeader';
import Nav from './Nav';
import NavList from './NavList';
import NavListItem from './NavListItem';
import NavLink from './NavLink';
import messages from './messages';

const Header = () => (
  <StyledHeader>
    <Nav>
      <NavList>
        <NavListItem>
          <NavLink to="/">
            <FormattedMessage {...messages.intro} />
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/samplePage">
            <FormattedMessage {...messages.samplePage} />
          </NavLink>
        </NavListItem>
      </NavList>
    </Nav>
  </StyledHeader>
);

export default Header;
