import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';

import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
// import ReactDataGrid from 'containers/admin/components/ReactDataGrid';

import { Select, Input, DatePicker, Button } from 'antd';
// import * as feed from 'components/Feedback/functions';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import StyleNotifyAdminList from './StyleNotifyAdminList';
import StyleDataGrid from '../../../../store/components/uielements/dataGrid.style';
import messages from '../messages';
import StyledButton from '../../../../../components/Button/StyledButton';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const scrCd = 'ALARM';

// 페이징에 필요한 변수
const pageIndex = 20; // 페이징 단위
let pageSNum = 1; // 페이징 시작 변수
let pageENum = 20; // 페이징 종료 변수

let oneDateString = '';
let startDateString = '';
let endDateString = '';
let searchVal = '';
let isInit = true; // 초기화 변수(화면로딩 시 한번만 사용하기 위해)
// let isPaging = 'Y';

class NotifyAdminList extends React.Component {
  constructor(prop) {
    super(prop);
    pageSNum = 1; // 페이징 시작 변수
    pageENum = 20; // 페이징 종료 변수
    this.columns = [
      {
        key: 'MSG_ID',
        name: '메세지 ID',
        editable: true,
        sortable: true,
        visible: false,
      },

      {
        key: 'SYSTEM',
        name: intlObj.get(messages.system),
        editable: true,
        sortable: true,
        visible: true,
        width: 100,
      },
      {
        key: 'SITE_ID',
        name: '사이트 ID',
        editable: true,
        sortable: true,
        visible: false,
      },
      {
        key: 'SITE_NAME',
        name: intlObj.get(messages.siteName),
        editable: true,
        sortable: true,
        resizable: true,
        visible: true,
        formatter: this.HyperlinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'MSG_TYPE',
        name: '메세지 유형',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'START_DTTM',
        name: '게시 시작일자',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'END_DTTM',
        name: '게시 종료일자',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'POST_PERIOD',
        name: intlObj.get(messages.postPeriod),
        editable: true,
        sortable: true,
        // resizable: true,
        width: 150,
        visible: true,
        formatter: this.PeriodFormatter,
        getRowMetaData: data => data,
      },
      {
        key: intlObj.get(messages.codeNameGlobal),
        name: intlObj.get(messages.codeName),
        editable: true,
        sortable: true,
        // resizable: true,
        width: 80,
        visible: true,
      },
      {
        key: intlObj.get(messages.titleGlobal),
        name: intlObj.get(messages.title),
        editable: true,
        sortable: true,
        resizable: true,
        visible: true,
      },
      {
        key: 'TOT_CNT',
        name: '전체 수신자 건수',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'RECV_CNT',
        name: '수신자 건수',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'RECV',
        name: intlObj.get(messages.recv),
        editable: true,
        sortable: true,
        // resizable: true,
        width: 80,
        visible: true,
        formatter: this.RecvFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'OPEN_YN',
        name: 'OPEN_YN',
        editable: true,
        sortable: true,
        resizable: true,
        visible: false,
      },
      {
        key: 'SHOW_SET',
        name: intlObj.get(messages.showSet),
        editable: true,
        sortable: false,
        resizable: true,
        visible: true,
        formatter: this.ShowSetFormatter,
        getRowMetaData: data => data,
      },
    ];

    let dtKeyword = '';
    let dtKeywordType = 'siteName';
    let dtSortColumn = '';
    let dtSortDirection = '';
    let dtSite = '';
    let dtOneDateStr = '';
    let oneDateDate = '';
    let isOneDate = false;
    let dtStartDateStr = '';
    let dtEndDateStr = '';
    let startDateDate = '';
    let endDateDate = '';
    let isPeriodDate = false;
    let isDtMsgType = false;

    // 알림 상세에서 넘어온 Data
    console.log('NotifyAdminList_location', this.props.history.location.state);
    if (this.props.history.location.state !== null && this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;

      dtKeyword = location.keyword;
      dtKeywordType = location.keywordType;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
      dtSite = location.site;
      dtOneDateStr = location.oneDateStr;
      dtStartDateStr = location.startDateStr;
      dtEndDateStr = location.endDateStr;

      // 작성일: 날짜 데이터로 변경
      if (dtOneDateStr !== '' && dtOneDateStr !== undefined) {
        oneDateDate = moment(
          dtOneDateStr
            .substring(0, 4)
            .concat('-')
            .concat(dtOneDateStr.substring(4, 6))
            .concat('-')
            .concat(dtOneDateStr.substring(6, 8)),
        );
        isOneDate = true;
      }

      // 게시기간: 날짜 데이터로 변경
      if (dtStartDateStr !== '' && dtStartDateStr !== undefined && dtEndDateStr !== '' && dtEndDateStr !== undefined) {
        startDateDate = moment(
          dtStartDateStr
            .substring(0, 4)
            .concat('-')
            .concat(dtStartDateStr.substring(4, 6))
            .concat('-')
            .concat(dtStartDateStr.substring(6, 8)),
        );

        endDateDate = moment(
          dtStartDateStr
            .substring(0, 4)
            .concat('-')
            .concat(dtStartDateStr.substring(4, 6))
            .concat('-')
            .concat(dtStartDateStr.substring(6, 8)),
        );

        isPeriodDate = true;
      }

      if (dtKeywordType === 'codeName') {
        isDtMsgType = true;
      }
    }

    this.state = {
      isDPicker: isOneDate,
      isPPicker: isPeriodDate,
      oneDate: oneDateDate,
      periodDates: [startDateDate, endDateDate],
      searchType: dtKeywordType,
      searchKeyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      searchSite: dtSite,
      notifyList: [],
      isMsgType: isDtMsgType,
    };

    isInit = true;
    // isPaging = this.props.history.location.state === undefined ? 'Y' : 'N';
    this.props.getSiteCombo(scrCd);
    // this.readMore = this.readMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    const { setNotifyList } = this.props;
    if (this.props.siteCombo !== nextProps.siteCombo) {
      if (nextProps.siteCombo.length > 0) {
        if (isInit) {
          this.onChangeSite(nextProps.siteCombo[0].SITE_ID);
          isInit = false;
        }
      }
    }

    if (JSON.stringify(setNotifyList) !== JSON.stringify(nextProps.setNotifyList)) {
      this.setState({ notifyList: nextProps.setNotifyList });
      // this.setState(searchType: this.state)
    } else {
      this.setState({ notifyList: this.props.setNotifyList });
    }
    console.log(setNotifyList, 'tesafsdfdasf');
  }

  onChangeType = val => {
    this.setState({ searchType: val });

    // 작성일
    if (val === 'regDttm') {
      this.setState({
        isDPicker: true,
        isPPicker: false,
        isMsgType: false,
        searchKeyword: '',
        oneDate: moment(),
        periodDates: [],
      });
      // 게시기간 from ~ to
    } else if (val === 'postPeriod') {
      this.setState({
        isDPicker: false,
        isPPicker: true,
        isMsgType: false,
        searchKeyword: '',
        oneDate: '',
        periodDates: [moment(), moment().endOf('month')],
      });
    } else if (val === 'codeName') {
      this.setState({
        isDPicker: false,
        isPPicker: false,
        isMsgType: true,
        searchKeyword: searchVal,
        oneDate: '',
        periodDates: [],
      });
    } else {
      this.setState({
        isDPicker: false,
        isPPicker: false,
        isMsgType: false,
        searchKeyword: '',
        oneDate: '',
        periodDates: [],
      });
    }
    // console.log('searchKeyword', this.state.searchKeyword);
  };

  onChangeSite = val => {
    // console.log('searchSite', val);
    this.setState({ searchSite: val.toString(), notifyList: [] });
    oneDateString = '';
    startDateString = '';
    endDateString = '';
    pageSNum = 1;
    pageENum = pageIndex;
    this.dateSet();
    this.props.getNotifyList(
      pageSNum,
      pageENum,
      [],
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.searchType,
      this.state.searchKeyword,
      oneDateString,
      startDateString,
      endDateString,
      val.toString(),
    );
  };

  onChangeKeyword = e => {
    this.setState({ searchKeyword: e.target.value });
  };

  onOneChange = date => {
    this.setState({
      oneDate: date,
    });
  };

  onPeriodChange = dates => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  };

  onChangeMsgType = val => {
    searchVal = val;
    this.setState({ searchKeyword: val });
  };

  getSiteID = () => {
    // this.props.getSiteCombo(scrCd);
    if (this.props.siteCombo.length > 0 && this.props.siteCombo.length !== undefined) {
      return this.props.siteCombo[0].SITE_ID.toString();
    }
    return '';
  };

  dateSet = () => {
    if (this.state.oneDate !== null && this.state.oneDate !== '') {
      oneDateString = this.timeToDateForm(this.state.oneDate, 'bar').replace(/-/g, '');
      startDateString = '';
      endDateString = '';
    } else if (
      this.state.periodDates.length !== 0 &&
      this.state.periodDates[0]._isValid === true && //eslint-disable-line
      this.state.periodDates[1]._isValid === true //eslint-disable-line
    ) {
      oneDateString = '';
      startDateString = this.timeToDateForm(this.state.periodDates[0], 'bar').replace(/-/g, '');
      endDateString = this.timeToDateForm(this.state.periodDates[1], 'bar').replace(/-/g, '');
    } else {
      oneDateString = '';
      startDateString = '';
      endDateString = '';
    }
  };

  RecvFormatter = val => {
    const RecvRow = `${val.dependentValues.RECV_CNT}/${val.dependentValues.TOT_CNT}`;
    return <format>{RecvRow}</format>;
  };

  PeriodFormatter = val => {
    if (
      val.dependentValues.START_DTTM !== '' &&
      val.dependentValues.START_DTTM !== undefined &&
      val.dependentValues.END_DTTM !== '' &&
      val.dependentValues.END_DTTM !== undefined
    ) {
      const startDttm = this.timeToDateForm(val.dependentValues.START_DTTM, 'point');
      const endDttm = this.timeToDateForm(val.dependentValues.END_DTTM, 'point');
      const PeriodRow = `${startDttm} ~ ${endDttm}`;
      return <format>{PeriodRow}</format>;
    }
    return '';
  };

  ShowSetFormatter = val => {
    if (val.dependentValues.END_DTTM !== undefined && val.dependentValues.END_DTTM !== '') {
      const curDate = this.timeToDateForm(new Date(), 'bar');
      const curDateArr = curDate.split('-');
      const endDate = this.timeToDateForm(val.dependentValues.END_DTTM, 'bar');
      const endDateArr = endDate.split('-');
      const curDateCompare = new Date(curDateArr[0], curDateArr[1] - 1, curDateArr[2]);
      const endDateCompare = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);

      if (val.dependentValues.MSG_TYPE === 'P' && curDateCompare.getTime() <= endDateCompare.getTime()) {
        if (val.dependentValues.OPEN_YN === 'Y') {
          return (
            <div>
              <Button disabled={true}>{intlObj.get(messages.post)}</Button>
              <Button onClick={() => this.postToggle(val.dependentValues.MSG_ID, false)} disabled={false}>
                {intlObj.get(messages.cancel)}
              </Button>
            </div>
          );
        } else if (val.dependentValues.OPEN_YN === 'N') {
          return (
            <div>
              <Button onClick={() => this.postToggle(val.dependentValues.MSG_ID, true)} disabled={false}>
                {intlObj.get(messages.post)}
              </Button>
              <Button disabled={true}>{intlObj.get(messages.cancel)}</Button>
            </div>
          );
        }
      }
    }
    return '';
  };

  postToggle = (MSG_ID, OPEN_YN) => {
    this.setState({
      notifyList: [],
    });
    pageSNum = 1;
    // pageENum = pageIndex;
    this.dateSet();
    this.props.udtPostState(
      MSG_ID,
      OPEN_YN ? 'Y' : 'N',
      pageSNum,
      pageENum,
      [],
      this.state.sortColumn,
      this.state.sortDirection,
      this.state.searchType,
      this.state.searchKeyword,
      oneDateString,
      startDateString,
      endDateString,
      this.state.searchSite,
    );
  };

  HyperlinkFormatter = val => {
    const hyperlinkText = lang.get('SITE_NAME', val.dependentValues);
    this.dateSet();
    return (
      <hltext
        onClick={() =>
          this.dtlLink({
            MSG_ID: val.dependentValues.MSG_ID,
            OPEN_YN: val.dependentValues.OPEN_YN,
            sortColumnParam: this.state.sortColumnParam,
            sortDirectionParam: this.state.sortDirectionParam,
            keywordType: this.state.searchType,
            keyword: this.state.searchKeyword,
            site: this.state.searchSite,
            oneDateStr: oneDateString,
            startDateStr: startDateString,
            endDateStr: endDateString,
          })
        }
      >
        {hyperlinkText}
      </hltext>
    );
  };

  dtlLink = data => {
    this.props.history.push({ pathname: '/admin/AdminMain/NotifyAdmin/NotifyAdminDtl', state: data });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
      notifyList: [],
    });
    this.dateSet();
    pageSNum = 1;
    // pageENum = pageIndex;
    this.props.getNotifyList(
      pageSNum,
      pageENum,
      [],
      sortColumn,
      sortDirection,
      this.state.searchType,
      this.state.searchKeyword,
      oneDateString,
      startDateString,
      endDateString,
      this.state.searchSite,
    );
  };

  rowGetter = i => {
    // console.log('isPaging', isPaging);
    if (i === pageENum - 1) {
      pageSNum = pageENum + 1;
      pageENum += pageIndex;
      this.dateSet();
      this.props.getNotifyList(
        pageSNum,
        pageENum,
        // isPaging === 'Y' ? this.state.notifyList : [],
        this.state.notifyList,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.searchType,
        this.state.searchKeyword,
        oneDateString,
        startDateString,
        endDateString,
        this.state.searchSite,
      );
    }
    // return this.props.setNotifyList[i];
    return this.state.notifyList[i];
  };

  // rowGetter = i => this.state.notifyList[i];

  // readMore() {
  //   if (pageENum - this.state.notifyList.length < pageIndex) {
  //     // load more
  //     pageSNum += pageIndex;
  //     pageENum += pageIndex;
  //     this.dateSet();
  //     this.props.getNotifyList(
  //       pageSNum,
  //       pageENum,
  //       this.state.notifyList,
  //       this.state.sortColumnParam,
  //       this.state.sortDirectionParam,
  //       this.state.searchType,
  //       this.state.searchKeyword,
  //       oneDateString,
  //       startDateString,
  //       endDateString,
  //       this.state.searchSite,
  //     );
  //   }
  // }

  // 날짜변환함수(년.월.일)
  timeToDateForm = (val, formType) => {
    const timestamp = new Date(val).getTime();
    const todate = '00'.concat(new Date(timestamp).getDate()).slice(-2);
    const tomonth = '00'.concat(new Date(timestamp).getMonth() + 1).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';

    if (!Number.isNaN(Number(val)) && formType === 'point') {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    } else if (!Number.isNaN(Number(val)) && formType === 'bar') {
      originalDate = `${toyear}-${tomonth}-${todate}`;
    }
    return originalDate;
  };

  render() {
    const isShowDate = this.state.isDPicker ? 'block' : 'none';
    const isShowPeriod = this.state.isPPicker ? 'block' : 'none';
    const isShowSearch = !this.state.isDPicker && !this.state.isPPicker && !this.state.isMsgType ? 'block' : 'none';
    const isShowMType = this.state.isMsgType ? 'block' : 'none';

    const siteComboList = this.props.siteCombo;

    const getDefaultCombo = comboList => {
      if (comboList.length > 0) {
        return comboList[0].SITE_ID;
      }
      return '';
    };

    const getComboList = comboList => {
      // console.log('comboList', comboList[0]);
      if (comboList.length > 0) {
        return (
          <Select
            defaultValue={getDefaultCombo(siteComboList)}
            style={{ width: 300, float: 'left' }}
            onChange={this.onChangeSite}
            dropdownStyle={{ fontSize: 13 }}
          >
            {comboList.map(item => (
              <Option value={item.SITE_ID}>{lang.get('NAME', item)}</Option>
            ))}
          </Select>
        );
      }
      return false;
    };

    const data = {
      // MSG_ID: val.dependentValues.MSG_ID,
      // OPEN_YN: val.dependentValues.OPEN_YN,
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keywordType: this.state.searchType,
      keyword: this.state.searchKeyword,
      site: this.state.searchSite,
      oneDateStr: oneDateString,
      startDateStr: startDateString,
      endDateStr: endDateString,
    };

    // 검색결과 없을 때 표시(임시)
    const EmptyData = () => (
      <div colSpan="5">
        <font size="5">{intlObj.get(messages.noSearch)}</font>
      </div>
    );

    return (
      <div>
        <StyleNotifyAdminList>
          <h3 className="pageTitle">{intlObj.get(messages.notifyList)}</h3>
          <div className="searchBox">
            {getComboList(siteComboList)}
            <Select defaultValue={this.state.searchType} onChange={this.onChangeType} style={{ width: 120, marginRight: 10 }} dropdownStyle={{ fontSize: 13 }}>
              {/* <Option value="ALL">전체</Option> */}
              <Option value="siteName">{intlObj.get(messages.siteName)}</Option>
              <Option value="postPeriod">{intlObj.get(messages.postPeriod)}</Option>
              <Option value="codeName">{intlObj.get(messages.codeName)}</Option>
              <Option value="title">{intlObj.get(messages.title)}</Option>
              <Option value="userName">{intlObj.get(messages.userName)}</Option>
              <Option value="regDttm">{intlObj.get(messages.regDttm)}</Option>
            </Select>
            {/* 오른쪽 */}
            <div className="searchWrapper">
              <DatePicker
                className="DatePicker"
                format={dateFormat}
                value={this.state.oneDate !== '' ? this.state.oneDate : null}
                onChange={this.onOneChange}
                placeholder="select Date"
                showToday={true}
                style={{ display: isShowDate }}
              />
              <RangePicker
                className="RangePicker"
                format={dateFormat}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')],
                }}
                onChange={this.onPeriodChange}
                showToday={true}
                style={{ display: isShowPeriod }}
                value={this.state.periodDates !== '' ? this.state.periodDates : null}
              />
              <Select
                defaultValue={this.state.searchType === 'codeName' ? this.state.searchKeyword : 'A'}
                onChange={this.onChangeMsgType}
                style={{ display: isShowMType }}
                dropdownStyle={{ fontSize: 13 }}
              >
                <Option value="A">알림메시지</Option>
                <Option value="P">Popup</Option>
                <Option value="T">ToDo</Option>
              </Select>
              <Input
                value={this.state.searchKeyword}
                onChange={this.onChangeKeyword}
                placeholder={intlObj.get(messages.inputSearch)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    this.setState({
                      notifyList: [],
                    });
                    pageSNum = 1;
                    pageENum = pageIndex;
                    this.dateSet();
                    this.props.getNotifyList(
                      pageSNum,
                      pageENum,
                      [],
                      this.state.sortColumnParam,
                      this.state.sortDirectionParam,
                      this.state.searchType,
                      this.state.searchKeyword,
                      oneDateString,
                      startDateString,
                      endDateString,
                      this.state.searchSite,
                    );
                  }
                }}
                style={{ display: isShowSearch }}
              />
              <button
                title={intlObj.get(messages.search)}
                className="searchBtn"
                onClick={() => {
                  this.setState({
                    notifyList: [],
                  });
                  pageSNum = 1;
                  pageENum = pageIndex;
                  this.dateSet();
                  this.props.getNotifyList(
                    pageSNum,
                    pageENum,
                    [],
                    this.state.sortColumnParam,
                    this.state.sortDirectionParam,
                    this.state.searchType,
                    this.state.searchKeyword,
                    oneDateString,
                    startDateString,
                    endDateString,
                    this.state.searchSite,
                  );
                }}
              />
            </div>
          </div>
          <StyleDataGrid className="globalLang">
            <ReactDataGrid
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={this.state.notifyList.length}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
            />
          </StyleDataGrid>
          {/* <ReactDataGrid
            columns={this.columns.filter(column => column.visible === true)}
            rowGetter={this.rowGetter}
            rowHeight={38}
            rowsCount={this.state.notifyList.length}
            emptyRowsView={EmptyData}
            onGridSort={this.handleGridSort}
            readMore={this.readMore}
          /> */}
          <div className="buttonWrapper">
            <StyledButton
              className="btn-primary"
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: '/admin/AdminMain/NotifyAdmin/NotifyAdminReg', state: data })}
            >
              {intlObj.get(messages.register)}
            </StyledButton>
          </div>
        </StyleNotifyAdminList>
      </div>
    );
  }
}

NotifyAdminList.propTypes = {
  getNotifyList: PropTypes.func, //eslint-disable-line
  setNotifyList: PropTypes.array, //eslint-disable-line
  udtPostState: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  getSiteCombo: PropTypes.func, //eslint-disable-line
  siteCombo: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getNotifyList: (sNum, eNum, notifyList, sortColumn, sortDirection, searchType, searchKeyword, oneDate, startDate, endDate, searchSite) =>
    dispatch(actions.getNotifyList(sNum, eNum, notifyList, sortColumn, sortDirection, searchType, searchKeyword, oneDate, startDate, endDate, searchSite)),

  udtPostState: (MSG_ID, OPEN_YN, sNum, eNum, notifyList, sortColumn, sortDirection, searchType, searchKeyword, oneDate, startDate, endDate, searchSite) =>
    dispatch(
      actions.udtPostState(
        MSG_ID,
        OPEN_YN,
        sNum,
        eNum,
        notifyList,
        sortColumn,
        sortDirection,
        searchType,
        searchKeyword,
        oneDate,
        startDate,
        endDate,
        searchSite,
      ),
    ),
  getSiteCombo: SCR_CD => dispatch(actions.getSiteCombo(SCR_CD)),
});

const mapStateToProps = createStructuredSelector({
  setNotifyList: selectors.makeSelectNotifyList(),
  siteCombo: selectors.makeSelectSiteCombo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'NotifyAdmin', saga });
const withReducer = injectReducer({ key: 'NotifyAdmin', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotifyAdminList);
