import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Picker from 'rc-calendar/lib/Picker';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import moment from 'moment';
import 'rc-calendar/dist/rc-calendar.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import StyledDatePicker from './StyledDatePicker';

class MonthlyPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.value ? moment(props.value) : '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    const { onChange } = this.props;
    this.setState({ date });
    onChange(date);
  }

  render() {
    const { label, date } = this.state;
    const { useSubLabel, name, placeholder, disabledDate, disabled } = this.props;
    return (
      <StyledDatePicker>
        {useSubLabel && <div className="title">{label}</div>}
        <div className="dates">
          <Picker
            animation="slide-up"
            disabled={disabled}
            calendar={<MonthCalendar style={{ zIndex: 1000 }} value={date} onChange={this.onChange} locale={koKR} disabledDate={disabledDate} />}
          >
            {() => (
              <div>
                <input type="text" name={name} placeholder={placeholder} value={date ? moment(date).format('YYYY.MM') : undefined} readOnly />
                <button type="button" className="icon_date">
                  버튼
                </button>
              </div>
            )}
          </Picker>
        </div>
      </StyledDatePicker>
    );
  }
}

MonthlyPicker.propTypes = {
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
  disabled: PropTypes.bool,
};

MonthlyPicker.defaultProps = {
  onChange: () => false,
  disabledDate: () => false,
  disabled: false,
};

export default MonthlyPicker;
