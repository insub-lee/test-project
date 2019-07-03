import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ label, onClick, icon }) => (
  <div className="block" onClick={onClick} role="button" onKeyPress={() => false} tabIndex="0">
    <i className={icon} />
    <div className="block-label">{label}</div>
  </div>
);

Block.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

Block.defaultProps = {
  label: '',
  icon: '',
  onClick: () => false,
};

export default Block;
