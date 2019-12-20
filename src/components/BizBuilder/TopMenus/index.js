import React from 'react';
import PropTypes from 'prop-types';

import DropDownMenus from './DropDownMenu';
import Styled from './Styled';

const TopMenus = ({ topMenus, actions }) => (
  <Styled>
    {topMenus.map(({ key, menus, title }, index) => (
      <React.Fragment key={key}>
        <DropDownMenus key={key} menus={menus} title={title} onClick={actions[index]} />
        <span style={{ margin: '0 5px' }} />
      </React.Fragment>
    ))}
  </Styled>
);

TopMenus.propTypes = {
  topMenus: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.func),
};

TopMenus.defaultProps = {
  topMenus: [],
  actions: [],
};

export default TopMenus;
