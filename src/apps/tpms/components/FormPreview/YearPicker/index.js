import React from 'react';
import DatePicker from 'rc-calendar';
import Picker from 'rc-calendar/lib/Picker';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import moment from 'moment';
import 'rc-calendar/dist/rc-calendar.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import StyledDatePicker from './StyledDatePicker';
import Calendar from '../DatePicker';

class YearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.value ? moment(props.value) : '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    console.log(date);
    this.setState({ date });
  }

  render() {
    const { label, date } = this.state;
    const { useSubLabel, name, placeholder } = this.props;
    return (
      <StyledDatePicker>
        {useSubLabel && <div className="title">{label}</div>}
        <div className="dates">
          <Picker
            animation="slide-up"
            calendar={
              <DatePicker locale={koKR} mode="year" style={{ zIndex: 1000 }} value={date} onChange={this.onChange} showDateInput={false} showToday={false} />
            }
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

export default YearPicker;
