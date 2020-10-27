import React from 'react';
import PropTypes from 'prop-types';
import StyledTextField from './StyledTextField';

const TextField = ({ type, id, name, placeholder, value, isReadOnly, required }) => (
  <StyledTextField>
    <input type={type} id={id} name={name} placeholder={placeholder} defaultValue={value} readOnly={isReadOnly} required={required} />
  </StyledTextField>
);

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isReadOnly: PropTypes.bool,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  id: '',
  name: '',
  type: '',
  placeholder: '',
  value: '',
  isReadOnly: false,
  required: false,
};

export default TextField;
