import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { formStuffRenderer } from '../config';

import Styled from './StyledFormStuff';

const FormStuff = ({ formStuff }) => (
  <Styled className="form-group">
    <Form.Item label={formStuff.property.label}>{formStuffRenderer[formStuff.type](formStuff)}</Form.Item>
  </Styled>
);

FormStuff.propTypes = {
  formStuff: PropTypes.object.isRequired,
};

export default FormStuff;
