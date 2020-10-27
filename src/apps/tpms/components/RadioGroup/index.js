import React from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';

const RadioGroup = ({ values, onChange, noPadding, readOnly }) => (
  <React.Fragment>
    {values.map(item => (
      <Radio
        key={`${item.name}_${item.value}`}
        {...item}
        id={`${item.name}_${item.value}`}
        checked={item.checked}
        onChange={readOnly ? e => e.preventDefault() : onChange}
        noPadding={noPadding}
        disabled={item.disabled}
      />
    ))}
  </React.Fragment>
);

RadioGroup.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  noPadding: PropTypes.bool,
  readOnly: PropTypes.bool,
};

RadioGroup.defaultProps = {
  values: [],
  onChange: () => false,
  noPadding: false,
  readOnly: false,
};

export default RadioGroup;
