import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

import { formStuffRenderer } from '../config';

import Styled from './StyledFormStuffTableType';

const FormStuff = ({ formStuffs, column }) => (
  <Descriptions bordered border size="small" column={column}>
    {formStuffs.map(formStuff => (
      <Descriptions.Item key={formStuff.id} label={formStuff.property.label} span={formStuff.property.span || 1}>
        <Styled classNam="form-group">{formStuffRenderer[formStuff.type](formStuff)}</Styled>
      </Descriptions.Item>
    ))}
  </Descriptions>
);

FormStuff.propTypes = {
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.number,
};

FormStuff.defaulProps = {
  formStuffs: [],
  column: 1,
};

export default FormStuff;
