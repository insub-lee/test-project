import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';
import { customFormStuffs } from '../../../../config';

const CustomBlock = ({ onClick }) => (
  <React.Fragment>
    {Object.keys(customFormStuffs).map(key => (
      <Block key={key} label={customFormStuffs[key].label} icon={customFormStuffs[key].icon} onClick={() => onClick(key)} />
    ))}
  </React.Fragment>
);

CustomBlock.propTypes = {
  onClick: PropTypes.func,
};

CustomBlock.defaultProps = {
  onClick: () => {},
};

export default CustomBlock;
