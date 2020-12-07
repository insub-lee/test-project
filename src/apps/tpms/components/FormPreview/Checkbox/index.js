import React from 'react';
import PropTypes from 'prop-types';

import StyledCheckbox from './StyledCheckbox';

const Checkbox = ({ id, name, value, labelText, otherOption, noPadding, readOnly, checked, onChange, fitting, labelStyle }) => (
  <StyledCheckbox className="checkbox" other={!otherOption} noPadding={noPadding} fitting={fitting}>
    <label htmlFor={id} onClick={e => (readOnly ? e.preventDefault() : true)} style={{ ...labelStyle }}>
      <input type="checkbox" id={id} name={name} value={value} checked={checked} onChange={onChange} readOnly />
      <span />
      {labelText}
    </label>
    {otherOption ? <input type="text" /> : null}
  </StyledCheckbox>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelText: PropTypes.string,
  otherOption: PropTypes.bool,
  noPadding: PropTypes.bool,
  readOnly: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  fitting: PropTypes.bool,
  labelStyle: PropTypes.object,
};

Checkbox.defaultProps = {
  id: '',
  name: '',
  value: '',
  labelText: '',
  otherOption: false,
  noPadding: false,
  readOnly: false,
  checked: false,
  onChange: () => false,
  fitting: false,
  labelStyle: {},
};

export default Checkbox;
