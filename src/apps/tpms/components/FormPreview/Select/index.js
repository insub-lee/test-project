import React from 'react';
import PropTypes from 'prop-types';
import StyledSelect from './StyledSelect';

const Select = ({ name, id, selectOptions, disabled, onChange }) => {
  const selectedOption = selectOptions.find(option => option.selected);
  return (
    <StyledSelect>
      <select
        name={name}
        id={id}
        disabled={disabled}
        defaultValue={`${selectedOption ? selectedOption.value : null}`}
        className={disabled ? 'noactive' : ''}
        onChange={e => onChange(e.target.value)}
      >
        {selectOptions.map(selectOption => (
          <option key={selectOption.value} value={selectOption.value} selected={selectOption.selected}>
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
  disabled: PropTypes.bool,
  // readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  id: '',
  name: '',
  selectOptions: [],
  disabled: false,
  // readOnly: false,
  onChange: () => false,
};

export default Select;
