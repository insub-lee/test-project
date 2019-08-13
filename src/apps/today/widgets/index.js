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
import TodayWrapper from './todayStyle';
import { Checkbox } from 'antd';
import * as feed from 'components/Feedback/functions';
// import fakeData from './fakeData';

// export default Today;
let selectedday = new Date();
let tdList = [];

class Today extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'CHECKBOX',
        name: <Checkbox/>,
        width: 26,
        formatter: this.SetCheckbox,
        getRowMetaData: data => data,
        forceUpdate: true,
      },
      {
        key: 'DUEDATE',
        name: '요청완료일',
        resizable: true,
        sortable: false,
        width: 75,
        formatter: this.HyperlinkFomatter2,
        getRowMetaData: data => data,
      },
      {
        key: 'TASKNAME',
        // name: `${intlObj.get(messages.titleSiteName)}`,
        name: '요청업무제목',
        sortable: false,
        resizable: true,
        // width: 150,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
    ];

    this.state = {
      selectedIndexes: [],
      lineYn : false,
      dayTodayList: [],
      selectedIndexes: [],
    };

   this.getWeekToday(this.toYearMonthDate(new Date()));
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    if (this.props.weekTodayList !== nextProps.weekTodayList) {
      if(nextProps.tp === 'notify/TOD00100') {
        // console.log('WEEKLIST', nextProps.weekTodayList);
        if(nextProps.weekTodayList !== undefined) {
          const stdDay = new Date(selectedday).getTime();
          const toDay = new Date(this.toYearMonthDate(new Date())).getTime();

          // 거절한 할일과 삭제된 할일 제외, 쿼리에서 필터링
          // 오늘일자에 지연, 미수락 표시하고 과거,미래에서 제외
          if(stdDay === toDay) {
            tdList =  nextProps.weekTodayList.filter(data=>
              (
                new Date(this.toYearMonthDate(data.STARTDATE)).getTime() <= stdDay &&
                new Date(this.toYearMonthDate(data.DUEDATE)).getTime() >= stdDay
              )
              || (data.TASKREQSTATUS === '0')
              || (data.TASKPROCSTATUS !== '2' &&
                new Date(this.toYearMonthDate(data.DUEDATE)).getTime() < toDay
              )
            );
          } else {
            tdList =  nextProps.weekTodayList.filter(data=>
              (
                new Date(this.toYearMonthDate(data.STARTDATE)).getTime() <= stdDay &&
                new Date(this.toYearMonthDate(data.DUEDATE)).getTime() >= stdDay
              )
              && data.TASKREQSTATUS !== '0'
              && (!(data.TASKPROCSTATUS !== '2' &&
                new Date(this.toYearMonthDate(data.DUEDATE)).getTime() < toDay
              ))
            );
          }

          this.setState({
            dayTodayList: tdList,
          });
        }
      } else {
        this.setState({ dayTodayList: [] });
      }
      // console.log('DAYLIST', tdList);
    }
  }

  // Date(date, string) => String(yyyy-MM-dd)
  toYearMonthDate = (date) => {
    if(!(this.isValidDate(date))) {
      let strDate = '';
      if(date.length === 8) {
        strDate = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8)
        return strDate;
      } else {
        return date;
      }
    } else{
      const TempDate = date;
      const timestamp = new Date(TempDate).getTime();
      const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
      const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
      const toyear = new Date(timestamp).getFullYear();
      const cDate = toyear + '-' + tomonth + '-' + todate
      return cDate;
    }
  }

  // Date 타입인지 체크
  isValidDate = (date) => {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
  }

  getWeekToday = (day) => {
    selectedday = day;
    const date1 = new Date(day);
    const day1 = date1.getDay();
    const startDate = date1.getDate() - day1 + (day1 === 0 ? -6:1); // adjust when day is sunday

    const date2 = new Date(day);
    const day2 = date2.getDay();
    const endDate = date2.getDate() - day2 + (day2 === 0 ? 0:7); // adjust when day is sunday

    this.props.getTodayList(
      new Date(date1.setDate(startDate)),
      new Date(date2.setDate(endDate)),
    );
  }

  getDayToday = (day) => {
    selectedday = day;

    const stdDay =new Date(selectedday).getTime();
    const toDay = new Date(this.toYearMonthDate(new Date())).getTime();

    // 거절한 할일과 삭제된 할일 제외, 쿼리에서 필터링
    // 오늘일자에 지연, 미수락 표시하고 과거,미래에서 제외
    if(stdDay === toDay) {
      tdList =  this.props.weekTodayList.filter(data=>
        (
          new Date(this.toYearMonthDate(data.STARTDATE)).getTime() <= stdDay &&
          new Date(this.toYearMonthDate(data.DUEDATE)).getTime() >= stdDay
        )
        || (data.TASKREQSTATUS === '0')
        || (data.TASKPROCSTATUS !== '2' &&
          new Date(this.toYearMonthDate(data.DUEDATE)).getTime() < toDay
        )
      );
    } else {
      tdList =  this.props.weekTodayList.filter(data=>
        (
          new Date(this.toYearMonthDate(data.STARTDATE)).getTime() <= stdDay &&
          new Date(this.toYearMonthDate(data.DUEDATE)).getTime() >= stdDay
        )
        && data.TASKREQSTATUS !== '0'
        && (!(data.TASKPROCSTATUS !== '2' &&
          new Date(this.toYearMonthDate(data.DUEDATE)).getTime() < toDay
        ))
      );
    }
    // console.log('DAYLIST', tdList);
    // tdList = fakeData.tempTodayList.toJS();

    this.setState({ dayTodayList: tdList });
  }

  openClick = (url) => {
    window.open(url);
  };

  // 로우선택 시
  onRowsSelected = (rows) => {

    const date1 = new Date(selectedday);
    const day1 = date1.getDay();
    const startDate = date1.getDate() - day1 + (day1 === 0 ? -6:1); // adjust when day is sunday

    const date2 = new Date(selectedday);
    const day2 = date2.getDay();
    const endDate = date2.getDate() - day2 + (day2 === 0 ? 0:7); // adjust when day is sunday

    const sDate = new Date(date1.setDate(startDate));
    const eDate = new Date(date1.setDate(endDate));
    //할일 완료 업데이트
    this.props.udtCompleteToday(
      rows.TASKID,
      sDate,
      eDate,
    );
  };

  // 로우선택 해제 시
  onRowsDeselected = (rows) => {
    console.log('완료된 할일은 완료처리가 불가능합니다.');
  };

  HyperlinkFomatter = (val) => {
    // const detailKey = https://schedule.skhynix.com/Mail/Login/Redirect.aspx target=/Task/DetailTask/TaskDetailInfo.aspx?taskid={{taskid}}&viewmode=E

    const url = 'https://schedule.skhynix.com/Mail/Login/Redirect.aspx?';
    const targetUrl = 'target=/Task/DetailTask/TaskDetailInfo.aspx?';
    const taskId = 'taskid=' + val.dependentValues.TASKID;
    const veiwmode = '&viewmode=e';

    const detailKey = url + encodeURI(targetUrl + taskId + veiwmode);

    let hyperlinkName = '';
    let delay = '';
    let unaccept = '';

    const toDay =new Date(this.toYearMonthDate(new Date()));

    if(val.dependentValues.TASKREQSTATUS === '0') {
      unaccept = '응답대기';
    } else if(val.dependentValues.TASKPROCSTATUS !== '2' &&
      new Date(this.toYearMonthDate(val.dependentValues.DUEDATE)).getTime() < toDay ) {
        delay = 'delay '
    }

    hyperlinkName = val.dependentValues.TASKNAME;

    if(val.dependentValues.TASKPROCSTATUS === '2' && val.dependentValues.PROGRESS === '100') {
      const className = {}
      return (
        <a
          href={detailKey}
          title={hyperlinkName}
          target="_blank"
          className="titleText lineThrough ellipsis"
          style={{ display: 'inline-block', maxWidth: 'calc(100% - 55px)' }}
        >
          {hyperlinkName}
        </a>
      );
    } else if(unaccept !== '' || delay !== '') {
      return (
        <div>
          <span
            // className="textMark ">
            // {unaccept}{delay}
            className={unaccept !== '' ? 'unaccept' : 'delay'}>
          </span>
          <a
            href={detailKey}
            title={hyperlinkName}
            target="_blank"
            className="titleText ellipsis"
            style={{ display: 'inline-block', maxWidth: 'calc(100% - 55px)' }}
          >
            {hyperlinkName}
          </a>
        </div>
      );
    } else {
      return (
        <a
          href={detailKey}
          title={hyperlinkName}
          target="_blank"
          className="titleText ellipsis"
          style={{ display: 'inline-block', maxWidth: 'calc(100% - 30px)' }}
        >
          {hyperlinkName}
        </a>
      );
    };
  }

  HyperlinkFomatter2 = (val) => {

    const tHyperlinkName = val.dependentValues.DUEDATE;
    const hyperlinkName = tHyperlinkName.substring(0,4) + '-' + tHyperlinkName.substring(4,6) + '-' + tHyperlinkName.substring(6,8);
    if(val.dependentValues.TASKPROCSTATUS === '2' && val.dependentValues.PROGRESS === '100') {
      return (
        <span className="lineThrough">
          {hyperlinkName}
        </span>
      );
    } else {
      return (
        <span>
          {hyperlinkName}
        </span>
      );
    };
  }

  SetCheckbox = (val) => {
    const taskProcStatus = val.dependentValues.TASKPROCSTATUS;
    const taskReqStatus = val.dependentValues.TASKREQSTATUS;
    const progress = val.dependentValues.PROGRESS;
    let checkValue = false;
    if(val.dependentValues.TASKPROCSTATUS === '2' && val.dependentValues.PROGRESS === '100')
      checkValue = true;
    // 진행 상태가 완료가 아니고 요청 상태가 수락인 항목에 대해서만 체크박스 생성
    // TASKPROCSTATUS=> 2:완료 TASKREQSTATUS=> 1:수락
    if (taskProcStatus !== '2' && taskReqStatus === '1') {
      return (
        <Checkbox
          checked={checkValue}
          onChange={this.onChecked}
          value={val.dependentValues}
        />
      );
    } else {
      return (
        <Checkbox
          checked={checkValue}
          onChange={this.onChecked}
          value={val.dependentValues}
          disabled={true}
        />
      );
    }
    return '';
  }

  onChecked = (sta) => {
    if (sta.target.checked === true) {
      sta.target.value.check = 'true'
      feed.showConfirm('할일을 완료처리 하시겠습니까?', '', () => this.onRowsSelected(sta.target.value));
    } else {
      delete sta.target.value.check;
      this.onRowsDeselected(sta.target.value);
    }
  }

  render() {
    // console.log('today_props', this.props);
    const EmptyData = () => (
      <div className="noWidgetContent">
        <p className="noWCIcon">개인 할일이 없습니다.</p>
      </div>
    );

    const rowGetter = (i) => {
      if (this.state.size === undefined) {
        return tdList[i];
      }
    }

    // 위젯 제목 유무에 따른 높이 조절
    const wgHeight = Number(this.props.item.size.split('X')[1]);
    const wgTitleHeight = this.props.item.user.isTitle ? 35 : 0;
    const rowHeight = 26;

    return (
      <TodayWrapper className="today">
        <WeekCalendar
          getWeekToday={this.getWeekToday}
          weekTodayList={this.props.weekTodayList}
          getDayToday={this.getDayToday}
        />
        <ReactDataGrid
          // rowKey="SITE_ID"
          columns={this.columns}
          rowGetter={rowGetter}
          rowsCount={tdList.length}
          onGridSort={this.handleGridSort}
          emptyRowsView={EmptyData}
          rowHeight={rowHeight}
          scrollHeight={wgHeight * 270 - wgTitleHeight - 43} // 슬림스크롤 높이
          minHeight={rowHeight * tdList.length} // 위젯 row 전체 높이
          />
      </TodayWrapper>
    );
  }
}

Today.propTypes = {
  getTodayList: PropTypes.func, //eslint-disable-line
  history: PropTypes.object,//eslint-disable-line
  historyPush: PropTypes.func, //eslint-disable-line
  tp: PropTypes.String, //eslint-disable-line
  weekTodayList: PropTypes.array, //eslint-disable-line
  udtCompleteToday: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getTodayList: (
      startDate,
      endDate,
    ) => dispatch(actions.getTodayList(
      startDate,
      endDate,
    )),
    historyPush: url => dispatch(push(url)),
    udtCompleteToday: (
      taskId,
      startDate,
      endDate,
    ) => dispatch(actions.udtCompleteToday(
      taskId,
      startDate,
      endDate,
    )),
  }
);

const mapStateToProps = createStructuredSelector({
  tp: selectors.makeGettp(),
  weekTodayList: selectors.makeGetweekTodayList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Today', saga });
const withReducer = injectReducer({ key: 'Today', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Today);

