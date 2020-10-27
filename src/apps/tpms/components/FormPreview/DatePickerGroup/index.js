import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import StyledDatePickerGroup from './StyledDatePickerGroup';

const DatePickerGroup = ({ items }) => (
  <StyledDatePickerGroup>
    <ul className="sub_form">
      {items.map(item => (
        <li key={item.seq}>
          <DatePicker useSubLabel label={item.label} type={item.type} values={item.values} />
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
