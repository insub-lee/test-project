import React from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Picker from 'rc-calendar/lib/Picker';
import CustomInput from './CustomInput';

const DateRangePicker = ({ type, format, onChange, disableDate, item, index }) => (
  <Picker
    caleandar={
      <RangeCalendar
        type={type}
        format={format}
        // onChange={date => onChange(date)}
        // disabledDate={disableDate}
        showDateInput={false}
        showToday={false}
      />
    }
  >
    {() => <CustomInput item={item} />}
  </Picker>
);

export default DateRangePicker;
