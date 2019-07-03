import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const FormGroup = ({ children, useTitle, title, id }) => (
  <Styled>
    {useTitle && (
      <label className="form-label" htmlFor={id}>
        {title}
      </label>
    )}
    {children}
  </Styled>
);

FormGroup.propTypes = {
  children: PropTypes.array,
  useTitle: PropTypes.bool,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

FormGroup.defaultProps = {
  children: [],
  useTitle: true,
  title: '',
};

export default FormGroup;
