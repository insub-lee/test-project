import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';
import { defaultFormStuffs } from '../../../../config';

const FormBlock = ({ onClick }) => (
  <>
    {Object.keys(defaultFormStuffs).map(key => (
      <Block key={key} label={defaultFormStuffs[key].label} icon={defaultFormStuffs[key].icon} onClick={() => onClick(key)} />
    ))}
  </>
);

FormBlock.propTypes = {
  onClick: PropTypes.func,
};

FormBlock.defaultProps = {
  onClick: () => {},
};

export default FormBlock;
