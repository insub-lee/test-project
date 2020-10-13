import React from 'react';
import PropTypes from 'prop-types';
import StyledSettingMenu from './StyledSettingMenu';

const ToggleMenu = ({ title, isActive, action }) => (
  <StyledSettingMenu className="menu_option">
    <div className="menu_option-title">
      <div className="title">{title}</div>
      <div className="button_group">
        <button type="button" className="menu_option-toggle" onClick={() => action.toggle()}>
          {isActive ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
        </button>
      </div>
    </div>
  </StyledSettingMenu>
);

ToggleMenu.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  action: PropTypes.objectOf(PropTypes.func),
};

ToggleMenu.defaultProps = {
  title: '',
  isActive: false,
  action: null,
};

export default ToggleMenu;
