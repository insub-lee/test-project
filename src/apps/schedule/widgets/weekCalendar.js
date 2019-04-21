import React from "react";
import { render } from "react-dom";

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// monent Setting
// moment.locale("en-GB");
moment.locale('ko', {
  week: {
      dow: 1, // Monday is the first day of the week.
      doy: 1, // The week that contains Jan 1st is the first week of the year.
  },
});

BigCalendar.momentLocalizer(moment);

class WeekCalendar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: [],
      selectedDate: new Date(),
    };
  }

  handleNavigate = (date) => {
    this.setState({ selectedDate: date })
    const diff = this.dateDiff(date, this.state.selectedDate);

    if(diff >= 7) {
      this.props.getWeekSchedule(this.toYearMonthDate(date));
    } else {
      this.props.getDaySchedule(this.toYearMonthDate(date));
    }
  }

  handleSelectSlot = (event) => {
  }

  // Date => String(yyyy-MM-dd)
  toYearMonthDate = (date) => {
    const TempDate = date;
    const timestamp = new Date(TempDate).getTime();
    const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
    const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    const cDate = toyear + '-' + tomonth + '-' + todate
    return cDate;
  }
  // 두개의 날짜를 비교하여 차이를 알려준다.
  dateDiff = (_date1, _date2) => {
    let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth(), diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth(), diffDate_2.getDate());

    let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}

 parseDate = (strDate) => {
	let _strDate = strDate;
	let _dateObj = new Date(_strDate);
	if (_dateObj.toString() == 'Invalid Date') {
		_strDate = _strDate.split('.').join('-');
		_dateObj = new Date(_strDate);
	}
	if (_dateObj.toString() == 'Invalid Date') {
		var _parts = _strDate.split(' ');
		var _dateParts = _parts[0];
		_dateObj = new Date(_dateParts);

		if (_parts.length > 1) {
			var _timeParts = _parts[1].split(':');
			_dateObj.setHours(_timeParts[0]);
			_dateObj.setMinutes(_timeParts[1]);
			if (_timeParts.length > 2) {
				_dateObj.setSeconds(_timeParts[2]);
			}
		}
	}
	return _dateObj;
}

render() {
  const wsList = this.props.weekScheduleList;
  const customDayPropGetter = date => {
    let schFlag = 'N';  // 해당일 스케줄 여부
    let selFlag = 'N';  // 선택된(클릭된) 날 여부
    if (date.getDate() === this.state.selectedDate.getDate()) {
      selFlag = 'Y'
    }
    if(wsList.size === undefined ) {
      for(let i=0; i < wsList.length; i+=1) {
        if
        (
          this.parseDate(wsList[i].startTime.substring(0,10) + ' 00:00:00').getTime() <=
          new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() &&
          this.parseDate(wsList[i].endTime.substring(0,10)  + ' 23:59:59').getTime() >=
          new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
        ) {
          schFlag = 'Y'
        }
      }
    }

    // return
    if(selFlag === 'Y' && schFlag === 'Y') {
      return {
        className: 'scheduled-day scheduled-mark',
      }
    } else if(selFlag === 'Y' && schFlag === 'N') {
      return {
        className: 'scheduled-day',
      }
    } else if(selFlag === 'N' && schFlag === 'Y') {
      return {
        className: 'scheduled-mark',
      }
    }
  }

  const weekdayFormat = {
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'ddd MM/DD', culture),
  }

  return (
    <div style={{ height: '43px', padding: '0 8px' }}>
      <BigCalendar
        selectable={false}
        events={this.state.events}
        defaultView='week'
        views={['week']}
        defaultDate={new Date()}
        onNavigate={(date) =>this.handleNavigate(date)}
        formats = {weekdayFormat}
        // date={this.state.selectedDay}
        onSelectSlot={this.handleSelectSlot}
        dayPropGetter={customDayPropGetter}
      />
    </div>
    );
  }
}

WeekCalendar.propTypes = {
  getWeekSchedule: PropTypes.func, //eslint-disable-line
  weekScheduleList: PropTypes.array, //eslint-disable-line
  getDaySchedule: PropTypes.func, //eslint-disable-line
};

export default WeekCalendar;

