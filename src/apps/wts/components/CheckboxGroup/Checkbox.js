import React from 'react';
import PropTypes from 'prop-types';

import StyledCheckbox from './StyledCheckbox';

const CheckboxGroup = ({ id, name, value, labelText, onChange, checked, noPadding, disabled, className }) => (
  <StyledCheckbox noPadding={noPadding} className={className}>
    <label htmlFor={id}>
      <input type="checkbox" id={id} name={name} value={value} readOnly checked={checked} onChange={onChange} disabled={disabled} />
      <span />
      {labelText}
    </label>
  </StyledCheckbox>
);

CheckboxGroup.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  noPadding: PropTypes.bool,
  disabled: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
  id: '',
  name: '',
  value: '',
  labelText: '',
  className: '',
  onChange: () => false,
  checked: false,
  noPadding: false,
  disabled: false,
};

export default CheckboxGroup;
