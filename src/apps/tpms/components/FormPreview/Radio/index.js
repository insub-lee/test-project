import React from 'react';
import PropTypes from 'prop-types';
import StyledRadio from './StyledRadio';

const Radio = ({ id, name, value, labelText, otherOption, checked, readOnly, noPadding, onChange }) => (
  // console.debug({
  //   id,
  //   name,
  //   value,
  //   labelText,
  //   otherOption,
  //   checked,
  //   readOnly,
  //   noPadding,
  //   onChange,
  // });

  // (
  <StyledRadio other={!otherOption} noPadding={noPadding}>
    <label htmlFor={id} onClick={e => (readOnly ? e.preventDefault() : true)}>
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={e => onChange(e.target.value)} readOnly />
      <span />
      {labelText}
    </label>
    {otherOption ? <input type="text" /> : null}
  </StyledRadio>
);
Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  labelText: PropTypes.string,
  otherOption: PropTypes.bool,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  noPadding: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  id: '',
  name: '',
  value: '',
  labelText: '',
  otherOption: false,
  checked: false,
  readOnly: false,
  noPadding: false,
  onChange: () => false,
};

export default Radio;
