import React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import Select, { SelectOption } from 'components/Select';
import StyleDataGrid from 'containers/store/components/uielements/dataGrid.style';
import { LinkBtnDkGray, BtnDelete } from 'containers/store/components/uielements/buttons.style';
import { basicPath } from 'containers/common/constants';
import moment from 'moment';
import { DatePicker, Button } from 'antd';

import StyleSiteAdminList from './StyleSiteAdminList';
import messages from '../messages';

import * as selectors from './selectors';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const Option = SelectOption;
let pageNum = 10;
const pageIndex = 10;
let oneDateString = '';
let startDateString = '';
let endDateString = '';

class BcinfoList extends React.Component {
  constructor(prop) {
    super(prop);
    
    // 사용자 목록 컬럼
    this.columns = [
      {
        key: 'CARD_REQST_NO',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `신청번호`,
        editable: true,
        sortable: true,
        resizable: true,
        visible: true,
        formatter: this.HyperlinkFomatter,
        getRowMetaData: data => data,
      },
      {
        key: 'CARD_TYPE_NM',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `명함종류`,
        sortable: true,
        resizable: true,
       // formatter: this.HyperlinkFomatter,
       // getRowMetaData: data => data,
      },
      {
        key: 'REQST_QTY',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `수량`,
        sortable: true,
        resizable: true,
       // formatter: this.HyperlinkFomatter,
       // getRowMetaData: data => data,
      },

      {
        key: 'ORD_DTTM',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `주문일자`,
        sortable: true,
        resizable: true,
      //  formatter: this.HyperlinkFomatter,
       // getRowMetaData: data => data,
      },
      {
        key: 'CARD_STD_NM',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `주문상태`,
        sortable: true,
        resizable: true,
      //  formatter: this.HyperlinkFomatter,
       // getRowMetaData: data => data,
      },
      {
        key: 'CARD_RCV_NM',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `수령완료`,
        sortable: true,
        resizable: true,
       // formatter: this.HyperlinkFomatter,
      //  getRowMetaData: data => data,
      },
      {
        key: 'REQST_KOR_NM',
        //name: `${intlObj.get(messages.titleSiteName)}`,
        name: `신청자`,
        sortable: true,
        resizable: true,
       // formatter: this.HyperlinkFomatter,
       // getRowMetaData: data => data,
      },
      {
        key: 'AGENT_NM',
        //name: `${intlObj.get(messages.titleUrl)}`,
        name: `신청대리인`,
        resizable: true,
        sortable: true,
      //  formatter: this.HyperlinkFomatter,
      //  getRowMetaData: data => data,
      },
      {
        key: 'CARD_STD_DTTM',
        //name: `${intlObj.get(messages.titleRegdtm)}`,
        name: `발급일자`,
        sortable: true,
        width: 120,
      },
    ];
    
    this.state = {
      //title: `${intlObj.get(messages.titleSiteList)}`,
      title: `신청내역 조회`,
      selectedIndexes: [],
      delData: [],
      keywordType: '전체',
      keyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
      // siteId: prop.siteId,
      pageType: this.props.location.param,
    };
    
    pageNum = pageIndex;
   
    this.props.getList(
      pageNum,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.keywordType,
      this.state.keyword,
      oneDateString,
      startDateString,
      endDateString,
      this.state.pageType,
    );
  

    // 함수 bind
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.initState = this.initState.bind(this);
    this.rowList = this.rowList.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    //this.handleClick = this.handleClick.bind(this);
   // this.handleSearch = this.handleSearch.bind(this);
   // this.handleKeyPress = this.handleKeyPress.bind(this);

  }
  onRowsSelected = (rows) => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      delData: this.state.delData.concat(rows.map(r => r.row.CARD_REQST_NO)),
    });
  };

  onRowsDeselected = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const rowSites = rows.map(r => r.row.CARD_REQST_NO);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(i =>
        rowIndexes.indexOf(i) === -1),
      delData: this.state.delData.filter(i => rowSites.indexOf(i) === -1),
    });
  };

  HyperlinkFomatter = (val) => {
    const hyperlinkName = val.dependentValues.CARD_REQST_NO;
    return (
      <hltext onClick={() => 
        this.dtlLink({
            BC_ID: val.dependentValues.CARD_REQST_NO,
            sortColumnParam: this.state.sortColumnParam,
            sortDirectionParam: this.state.sortDirectionParam,
            keywordType: this.state.searchType,
            keyword: this.state.searchKeyword,
         })}
      >
        {hyperlinkName}
      </hltext>
    );
  };

  dtlLink = (data) => {
    this.props.history.push({ pathname: `/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub/BcinfoDetail`, state: data });
  }


  initState = () => {
    pageNum = pageIndex;
    this.setState({
      selectedIndexes: [],
      delData: [],
      keywordType: '전체',
      keyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
      pageType: '',
    });
  }

  rowList = (i) => {
    if (i === pageNum - 1) {
      pageNum += pageIndex;
      this.props.getList(
        pageNum,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.keywordType,
        this.state.keyword,
        oneDateString,
        startDateString,
        endDateString,
        this.state.pageType,
      );
    }
    return this.props.getRow[i];
  }

  //------------------------------------------------------------------------
  onChangeType = (val) => {
    this.setState({ keywordType: val });

    // 작성일
    if (val === 'RegDttm') {
      this.setState({
        isDPicker: true,
        isPPicker: false,
        keyword: '',
        oneDate: moment(),
        periodDates: [],
      });
    // 게시기간 from ~ to
    } else if (val === 'PostPeriod') {
      this.setState({
        isDPicker: false,
        isPPicker: true,
        keyword: '',
        oneDate: '',
        periodDates: [moment(), moment().endOf('month')],
      });
    } else {
      this.setState({
        isDPicker: false,
        isPPicker: false,
        keyword: '',
        oneDate: '',
        periodDates: [],
      });
    }
  }
//------------------------------------------------------------------------
  onChangeKeyword = (e) => {
    this.setState({ keyword: e.target.value });
  }

  onOneChange = (date) => {
    this.setState({
      oneDate: date,
    });
  }

  onPeriodChange = (dates) => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  }
//------------------------------------------------------------------------

//------------------------------------------------------------------------
dateSet = () => {
  if (this.state.oneDate !== null && this.state.oneDate !== '') {
    oneDateString = this.timeToDateForm(this.state.oneDate, 'bar').replace(/-/g, '');
    startDateString = '';
    endDateString = '';
  } else if (this.state.periodDates.length !== 0) {
    oneDateString = '';
    startDateString = this.timeToDateForm(this.state.periodDates[0], 'bar').replace(/-/g, '');
    endDateString = this.timeToDateForm(this.state.periodDates[1], 'bar').replace(/-/g, '');
  } else {
    oneDateString = '';
    startDateString = '';
    endDateString = '';
  }
}
//------------------------------------------------------------------------
  // 날짜변환함수(년.월.일)
  timeToDateForm = (val, formType) => {
    const timestamp = new Date(val).getTime();
    const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
    const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    let originalDate = '';

    if (!Number.isNaN(Number(val)) && formType === 'point') {
      originalDate = `${toyear}.${tomonth}.${todate}`;
    } else if (!Number.isNaN(Number(val)) && formType === 'bar') {
      originalDate = `${toyear}-${tomonth}-${todate}`;
    }
    return originalDate;
  }
//------------------------------------------------------------------------


  delConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.delConfirm)}`, '', this.deleteRow);
  }

  deleteRow = () => {
    this.props.delRow(this.state.delData);
    this.initState();
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortColumn,
      sortDirectionParam: sortDirection,
    });
    this.props.getList(
      pageNum,
      sortColumn,
      sortDirection,
      this.state.keywordType,
      this.state.keyword,
      oneDateString,
      startDateString,
      endDateString,
      this.state.pageType,
    );
  };

  // selectbox 값 변경 시
  handleSelect(e) {
    this.setState({ keywordType: e });
  }


  render() {
    const EmptyData = () => (
      <div>
        <td colSpan="5"><font size="5">{intlObj.get(messages.emptySearch)}</font></td>
      </div>
    );
    
    const bInfo = {
      MSG_KEY: '',
      DSCR_KOR: '',
      DSCR_ENG: '',
      DSCR_CHN: '',
    };

    const isShowDate = this.state.isDPicker ? 'block' : 'none';
    const isShowPeriod = this.state.isPPicker ? 'block' : 'none';
    const isShowSearch = !this.state.isDPicker && !this.state.isPPicker ? 'block' : 'none';
    
    
    return (
      <div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
       <StyleSiteAdminList>
                          <h3 className="pageTitle">{this.state.title}
                                <div className="searchBox">
                                <Select
                                    defaultValue={this.state.keywordType}
                                    onChange={this.onChangeType}
                                    style={{ width: 120, marginRight: 10, visibility: 'visible' }}
                                    dropdownStyle={{ fontSize: 13 }}
                                >
                                <Option value="PostPeriod">명함신청기간</Option>
                                <Option value="UserName">신청자명</Option>
                                <Option value="RegDttm">신청일자</Option>
                              </Select>
                                {/* 오른쪽  검색어 시작*/}
                                <div className="searchWrapper">
                                  <DatePicker
                                    format={dateFormat}
                                    value={this.state.oneDate !== '' ? this.state.oneDate : null}
                                    onChange={this.onOneChange}
                                    placeholder="select Date"
                                    showToday={true}
                                    style={{ display: isShowDate }}
                                  />
                                  <RangePicker
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
                                  <Input
                                    value={this.state.keyword}
                                    onChange={this.onChangeKeyword}
                                    placeholder={'검색어를 입력해주세요.'}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        pageNum = pageIndex;
                                        this.dateSet();
                                        this.props.getList(
                                          pageNum,
                                          this.state.sortColumnParam,
                                          this.state.sortDirectionParam,
                                          this.state.keywordType,
                                          this.state.keyword,
                                          oneDateString,
                                          startDateString,
                                          endDateString,
                                          this.state.pageType,
                                        );
                                      }
                                    }}
                                    style={{ display: isShowSearch }}
                                  />
                                  <button
                                    title={'검색'}
                                    className="searchBtn"
                                    onClick={() => {
                                        pageNum = pageIndex;
                                        this.dateSet();
                                        this.props.getList(
                                          pageNum,
                                          this.state.sortColumnParam,
                                          this.state.sortDirectionParam,
                                          this.state.keywordType,
                                          this.state.keyword,
                                          oneDateString,
                                          startDateString,
                                          endDateString,
                                          this.state.pageType,
                                        );
                                      }
                                    }
                                  />
                                </div>                                
                                {/* 오른쪽  검색어 쫑*/}

                                </div>
                              </h3>
                 <StyleDataGrid className="siteAdmin">
                   <div>  
                             <ReactDataGrid
                                          columns={this.columns}
                                          rowGetter={this.rowList}
                                          rowsCount={this.props.getRow.length}
                                          onGridSort={this.handleGridSort}
                                          rowSelection={{
                                                        showCheckbox: true,
                                                        enableShiftSelect: true,
                                                        onRowsSelected: this.onRowsSelected,
                                                        onRowsDeselected: this.onRowsDeselected,
                                                        selectBy: {
                                                                    indexes: this.state.selectedIndexes,
                                                                  },
                                                        }}
                                          emptyRowsView={EmptyData}
                              />
                   </div>
                 </StyleDataGrid>

          <div className="buttonWrapper">
           {/*
            <BtnDelete onClick={this.delConfirm}>{intlObj.get(messages.lblDelete)}</BtnDelete>
           
            <LinkBtnDkGray style={{ float: 'right' }}>
              <Link to="/bc/widgets/BcMain/BcaskSub">{intlObj.get(messages.lblReg)}</Link>
            </LinkBtnDkGray>
           */}
           {/*
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: '/bc/widgets/BcMain/BcaskSub', search: 'I', state: bInfo })}
            >등록
            </LinkBtnDkGray>
           */}
            <LinkBtnDkGray
              style={{ float: 'right' }}
              onClick={() => this.props.history.push({ pathname: `/${basicPath.APPS}/businesscard/BcMain/BcaskSub`, search: 'I', state: bInfo })}
            >신규등록
            </LinkBtnDkGray>

          </div>
       </StyleSiteAdminList>
       </div> 
    );
  }

}

const mapDispatchToProps = dispatch => (
  {
    getList: (
      pgNum,
      sortColumnParam,
      sortDirectionParam,
      keywordType,
      keyword,
      oneDate,
      startDate,
      endDate,
      pageType,
    ) => dispatch(actions.getList(
      pgNum,
      sortColumnParam,
      sortDirectionParam,
      keywordType,
      keyword,
      oneDate,
      startDate,
      endDate,
      pageType,
    )),
    historyPush: url => dispatch(push(url)),
    delRow: delData => dispatch(actions.delRow(delData)),
  }
);


const mapStateToProps = createStructuredSelector({
  getRow: selectors.makeSelectInfoList(),
  delList: selectors.makeDelRow(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'SiteList', reducer });
const withSaga = injectSaga({ key: 'SiteList', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(BcinfoList);
