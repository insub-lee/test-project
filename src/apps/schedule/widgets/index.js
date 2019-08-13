import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ReactDataGrid from 'containers/portal/components/ReactDataGrid';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import WeekCalendar from './weekCalendar';
import ScheduleWrapper from './scheduleStyle';
// import fakeData from './fakeData';

// export default Schedule;
let selectedday = new Date();
let scList = [];

class Schedule extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'showDate',
        name: '일정날짜시간',
        resizable: true,
        sortable: false,
        width: 88,
        // formatter: this.TimeFomatter,
        // getRowMetaData: data => data,
      },
      {
        key: 'subject',
        // name: `${intlObj.get(messages.titleSiteName)}`,
        name: '요청업무제목',
        sortable: false,
        resizable: true,
        // width: 206,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
    ];

    this.state = {
      dayScheduleList: [],
      // test: '',
    };

    this.getWeekSchedule(this.toYearMonthDate(new Date()));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.weekScheduleList !== nextProps.weekScheduleList) {
      // this.props.setCurdate(selectedday);
      if(nextProps.tp === 'notify/CAL0064') {
        if(nextProps.weekScheduleList !== undefined) {
          const stdDate =new Date(selectedday);
          const stdDay = new Date(stdDate.getFullYear() + '-' +
            ('0'+ (stdDate.getMonth() + 1)).slice(-2)+ '-' +
            ('0' + (stdDate.getDate())).slice(-2)
          ).getTime();

          scList =  nextProps.weekScheduleList.filter(data=>
            new Date(data.startTime.substring(0,10)).getTime() <= stdDay &&
            new Date(data.endTime.substring(0,10)).getTime() >= stdDay
          );

          this.setState({
            dayScheduleList: scList,
            });
        } else {
          this.setState({ dayScheduleList: [] });
        }
      }
    }
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

  getWeekSchedule = (day) => {
    selectedday = day;
    const date1 = new Date(day);
    const day1 = date1.getDay();
    const startDate = date1.getDate() - day1 + (day1 === 0 ? -6:1); // adjust when day is sunday

    const date2 = new Date(day);
    const day2 = date2.getDay();
    const endDate = date2.getDate() - day2 + (day2 === 0 ? 0:7); // adjust when day is sunday

    this.props.getScheduleList(
      new Date(date1.setDate(startDate)),
      new Date(date2.setDate(endDate)),
    );
  }

  getDaySchedule = (day) => {
    selectedday = day;

    // this.props.setCurdate(day);
    const stdDate =new Date(day);
    const stdDay = new Date(stdDate.getFullYear() + '-' +
      ('0'+ (stdDate.getMonth() + 1)).slice(-2)+ '-' +
      ('0' + (stdDate.getDate())).slice(-2)
    ).getTime();

    scList =  this.props.weekScheduleList.filter(data=>
      new Date(data.startTime.substring(0,10)).getTime() <= stdDay &&
      new Date(data.endTime.substring(0,10)).getTime() >= stdDay
    );
    // scList = fakeData.tempScheduleList.toJS();

    this.setState({ dayScheduleList: scList });
  }

  openClick = (url) => {
    window.open(url);
  };

  HyperlinkFomatter = (val) => {
    // const detailKey = 'http://schedule.skhynix.com/schedule/scheduletask/scheduletask.aspx?filter=TASKS&sThemes=1&ClientVer=PC';

    const url = 'https://schedule.skhynix.com/Mail/Login/Redirect.aspx?';

    const targetUrl = 'target=/schedule/ViewSchedule.aspx?isNew=false';
    const pItemID = '&pItemID=' + val.dependentValues.uid;
    const account = '&account=' + val.dependentValues.user;
    const mailaddress = '&mailaddress=' + val.dependentValues.eMailAddr;

    const detailKey = url + encodeURI(targetUrl + pItemID + account + mailaddress);

    const hyperlinkName = val.dependentValues.subject;

    return (
      <div>
        <a
          href={detailKey}
          title={hyperlinkName}
          target="_blank"
          className="titleText ellipsis"
        >
          {hyperlinkName}
        </a>
      </div>
    );
  };

  TimeFomatter = (val) => {
    const cDate = selectedday;
    const sDate = val.dependentValues.startTime.substring(0,10);
    const eDate = val.dependentValues.endTime.substring(0,10);
    const sTime = val.dependentValues.startTime.substring(11,16);
    const eTime = val.dependentValues.endTime.substring(11,16);
    let TimeName = '';
    let startTime = '     ';
    let endTime = '';

    if(cDate === sDate) {
      startTime = sTime;
    }
    if(cDate === eDate) {
      endTime = eTime;
    }
    TimeName = startTime + ' ~ ' + endTime;

    return TimeName;
  };

  render() {
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">개인 일정이 없습니다.</p>
      </div>
    );

    const rowGetter = (i) => {
      if (this.state.size === undefined) {
        const time = {
          dependentValues: scList[i],
        }
        const TimeName = this.TimeFomatter(time);
        const row = Object.assign({}, scList[i]);
        row.showDate = TimeName;
        return row;
      }
    }

    // 위젯 제목 유무에 따른 높이 조절
    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 26;

    return (
      <ScheduleWrapper className="schedule">
        <WeekCalendar
          getWeekSchedule={this.getWeekSchedule}
          weekScheduleList={this.props.weekScheduleList}
          getDaySchedule={this.getDaySchedule}
        />
          <ReactDataGrid
            columns={this.columns}
            rowGetter={rowGetter}
            rowsCount={scList.length}
            onGridSort={this.handleGridSort}
            emptyRowsView={EmptyData}
            rowHeight={rowHeight}
            scrollHeight={wgHeight * 270 - wgTitleHeight - 43} // 슬림스크롤 높이
            minHeight={rowHeight * scList.length} // 위젯 row 전체 높이
          />{/* minHeight 값: 1x1, 2x1 등의 사이즈일 때 */}
      </ScheduleWrapper>
    );
  }
}

Schedule.propTypes = {
  getScheduleList: PropTypes.func, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  tp: PropTypes.String, //eslint-disable-line
  weekScheduleList: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getScheduleList: (
      startDate,
      endDate,
    ) => dispatch(actions.getScheduleList(
      startDate,
      endDate,
    )),
    historyPush: url => dispatch(push(url)),
  }
);

const mapStateToProps = createStructuredSelector({
  tp: selectors.makeGettp(),
  weekScheduleList: selectors.makeGetweekScheduleList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Schedule', saga });
const withReducer = injectReducer({ key: 'Schedule', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Schedule);