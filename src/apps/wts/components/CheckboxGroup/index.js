import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const CheckboxGroup = ({ values, onChange, noPadding }) => (
  <React.Fragment>
    {values.map(item => (
      <Checkbox
        key={`${item.name}_${item.value}`}
        {...item}
        id={`${item.name}_${item.value}`}
        checked={item.checked}
        onChange={onChange}
        noPadding={noPadding}
      />
    ))}
  </React.Fragment>
);

CheckboxGroup.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  noPadding: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
  values: [],
  onChange: () => false,
  noPadding: false,
};

export default CheckboxGroup;
