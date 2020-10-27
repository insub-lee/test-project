import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ tabIndex, isActive, text, tabHandler }) => (
  <li className={`${isActive ? 'on' : ''}`} tabIndex={tabIndex}>
    <button type="button" onClick={tabHandler}>
      {text}
    </button>
  </li>
);

Tab.propTypes = {
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool,
  text: PropTypes.string,
  tabHandler: PropTypes.func,
};

Tab.defaultProps = {
  tabIndex: -1,
  isActive: false,
  text: '',
  tabHandler: () => false,
};

export default Tab;
