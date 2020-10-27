import React from 'react';
import PropTypes from 'prop-types';
import StyledSelect from './StyledSelect';

const Select = ({ name, id, selectOptions, onChange, disabled }) => {
  const checkedOption = selectOptions.filter(option => option.checked)[0] || selectOptions[0];
  return (
    <StyledSelect>
      <select name={name} id={id} disabled={disabled} defaultValue={checkedOption.value} onChange={onChange}>
        {selectOptions.map(selectOption => (
          <option key={selectOption.value} value={selectOption.value} selected={selectOption.checked}>
            {selectOption.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  id: '',
  name: '',
  selectOptions: [],
  onChange: () => false,
  disabled: false,
};

export default Select;
