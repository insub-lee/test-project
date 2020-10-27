import React from 'react';
import PropTypes from 'prop-types';
import StyledTypeSwitcher from './StyledTypeSwitcher';
import StyledButton from './StyledButton';

const TypeSwitcher = ({ title, items }) => (
  <StyledTypeSwitcher className="menu_option">
    <div className="menu_option-title">{title}</div>
    <ul className="menu_option-container">
      {items.map(item => (
        <li className="menu_option-item" key={item.key}>
          <StyledButton type="button" className={`${item.isActive ? 'active' : ''}`} onClick={() => item.onClick()}>
            <div className="icon_box">
              <i className={item.icon} />
            </div>
            <p className="text">{item.text}</p>
          </StyledButton>
        </li>
      ))}
    </ul>
  </StyledTypeSwitcher>
);

TypeSwitcher.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

TypeSwitcher.defaultProps = {
  title: '',
  items: [],
};

export default TypeSwitcher;
