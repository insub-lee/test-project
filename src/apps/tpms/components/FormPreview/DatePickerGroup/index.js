import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import StyledDatePickerGroup from './StyledDatePickerGroup';

const DatePickerGroup = ({ items }) => (
  <StyledDatePickerGroup>
    <ul className="sub_form">
      {items.map(({ values, type, label, seq }) => (
        <li key={`${seq + values + type + label}`}>
          <DatePicker useSubLabel label={label} type={type} values={values} />
        </li>
      ))}
    </ul>
  </StyledDatePickerGroup>
);

DatePickerGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

DatePickerGroup.defaultProps = {
  items: [],
};

export default DatePickerGroup;
