import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Calendar from 'rc-calendar';
import Picker from 'rc-calendar/lib/Picker';
import koKR from 'rc-calendar/lib/locale/ko_KR';
// import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import 'rc-calendar/dist/rc-calendar.min.css';
// import 'react-datepicker/dist/react-datepicker.css';
import StyledDatePicker from './StyledDatePicker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      values: fromJS(props.values),
      type: props.type,
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleDisableDate = this.handleDisableDate.bind(this);
    this.disableStartDate = this.disableStartDate.bind(this);
    this.disableEndDate = this.disableEndDate.bind(this);
  }

  handleChangeDate(index, date) {
    const { single, cbChangeDate } = this.props;
    this.setState(
      prevState => ({
        values: prevState.values.setIn([index, 'value'], date ? moment(date).format('YYYY.MM.DD') : date),
      }),
      () => {
        if (single) {
          cbChangeDate(moment(date));
        }
      },
    );
  }

  disableStartDate(startValue) {
    const endValue = this.state.values.getIn([1, 'value']);
    if (!endValue) {
      return false;
    }
    const endDate = moment(endValue, 'YYYY.MM.DD');
    const startDate = moment(startValue.format('YYYY.MM.DD'), 'YYYY.MM.DD');
    return endDate.diff(startDate, 'days') < 0;
  }

  disableEndDate(endValue) {
    const startValue = this.state.values.getIn([0, 'value']);
    if (!startValue) {
      return false;
    }
    const endDate = moment(endValue.format('YYYY.MM.DD'), 'YYYY.MM.DD');
    const startDate = moment(startValue, 'YYYY.MM.DD');
    return endDate.diff(startDate, 'days') < 0;
  }

  handleDisableDate(value, type, index) {
    if (!value) {
      return false;
    }
    if (type === 'range') {
      switch (index) {
        case 0:
          return this.disableStartDate(value);
        case 1:
          return this.disableEndDate(value);
        default:
          return false;
      }
    }
    return false;
  }

  render() {
    const { label, values, type } = this.state;
    const { useSubLabel, single } = this.props;
    return (
      <StyledDatePicker>
        {useSubLabel && <div className="title">{label}</div>}
        <div className={`dates ${single ? 'single_datepicker' : ''}`}>
          {values.size === 1 && !single && (
            <React.Fragment>
              <span className="date_divider" />
              <div className="react-datepicker-wrapper" />
            </React.Fragment>
          )}
          {values.map((item, index) => {
            const calendar = (
              <Calendar
                locale={koKR}
                dateInputPlaceholder={values.getIn([index, 'placeholder'])}
                format="YYYY.MM.DD"
                // onChange={date => this.handleChangeDate(index, date)}
                showDateInput={false}
                showToday={false}
                disabledDate={value => this.handleDisableDate(value, type, index)}
              />
            );
            return (
              <React.Fragment key={item.get('name')}>
                {index > 0 && <span className="date_divider">~</span>}
                <Picker
                  disabled={item.get('readOnly')}
                  animation="slide-up"
                  calendar={calendar}
                  onChange={date => this.handleChangeDate(index, date)}
                  value={values.getIn([index, 'value']) ? moment(values.getIn([index, 'value']), 'YYYY.MM.DD') : undefined}
                >
                  {() => (
                    <div className="react-datepicker-wrapper">
                      <input
                        type="text"
                        value={item.get('value') ? moment(item.get('value'), 'YYYY.MM.DD').format('YYYY.MM.DD') : ''}
                        name={item.get('name')}
                        required={item.get('required')}
                        placeholder={item.get('placeholder')}
                        readOnly
                      />
                      {!item.get('readOnly') && (
                        <button type="button" className="icon_date">
                          버튼
                        </button>
                      )}
                    </div>
                  )}
                </Picker>
              </React.Fragment>
            );
          })}
        </div>
      </StyledDatePicker>
    );
  }
}

DatePicker.propTypes = {
  label: PropTypes.string,
  useSubLabel: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.object),
  single: PropTypes.bool,
  type: PropTypes.string,
  cbChangeDate: PropTypes.func,
};

DatePicker.defaultProps = {
  label: '',
  useSubLabel: false,
  values: [],
  single: false,
  type: '',
  cbChangeDate: () => false,
};

export default DatePicker;
