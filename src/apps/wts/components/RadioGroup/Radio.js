import React from 'react';
import PropTypes from 'prop-types';
import StyledRadio from './StyledRadio';

const Radio = ({ id, name, value, labelText, onChange, checked, noPadding, disabled }) => (
  <StyledRadio noPadding={noPadding}>
    <label htmlFor={id} style={{ opacity: disabled ? '0.5' : '1' }}>
      <input type="radio" id={id} name={name} value={value} readOnly onChange={onChange} checked={checked} disabled={disabled} />
      <span />
      {labelText}
    </label>
  </StyledRadio>
);

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  noPadding: PropTypes.bool,
  disabled: PropTypes.bool,
};

Radio.defaultProps = {
  id: '',
  name: '',
  value: '',
  labelText: '',
  onChange: () => false,
  checked: false,
  noPadding: false,
  disabled: false,
};

export default Radio;
