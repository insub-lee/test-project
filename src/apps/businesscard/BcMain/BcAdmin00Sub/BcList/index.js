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
let pageNum = 20;
const pageIndex = 20;
let oneDateString = '';
let startDateString = '';  //주문시작일 100
let endDateString = '';    //주문종료일 100

let std130Val = '';    //발급시작일 130
let end130Val = '';    //발급종료일 130

let cardRcvCdValidVal = '';


class BcinfoList extends React.Component {
  constructor(prop) {
    super(prop);

    // 사용자 목록 컬럼
    //, CARD_REQST_NO    /* 신청번호 */
    //, ORD_DTTM         /* 신청일자 */
    //, CARD_TYPE_NM     /* 명함종류 */
    //, REQST_KOR_NM     /* 성 명    */ 	
    //, REQST_ID         /* 사 번    */ 	
    //, IM_GBN           /* 임 원    */
    //, JW_KOR_NM        /* 직 위    */ 
    //, PL_UN_KOR_NM     /* 직 책    */ 
    //, TM_KOR_NM        /* 팀       */
    //, MEMO_DESC        /* 메모     */ 	
    //, REQST_QTY        /* 신청수량  */ 
    //, CARD_RCV_NM      /* 배송방법  */
    //, BULDING_NM       /* 상주건물  */ 	
    //, CARD_STD_NM      /* 발급상태  */
    //, AGENT_NM         /* 신청대리인 */
    //, AGENT_ID         /* 신청대리인사번 */
    //, CARD_STD_140     /* 수령완료 */

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
        width: 120,
      },
      {
        key: 'ORD_DTTM',
        name: `신청일자`,
        sortable: true,
        resizable: true,
      },
      {
        key: 'CARD_TYPE_NM',
        name: `명함종류`,
        sortable: true,
        resizable: true,
      },

      {
        key: 'REQST_KOR_NM',
        name: `성 명`,
        sortable: true,
        resizable: true,
        editable: true,
        visible: true,
        formatter: this.HyperlinkFomatterName,
        getRowMetaData: data => data,
      },
      {
        key: 'REQST_ID',
        name: `사 번`,
        sortable: true,
        resizable: true,
      },
      {
        key: 'IM_GBN',
        name: `임 원`,
        sortable: true,
        resizable: true,
      },
      {
        key: 'JW_KOR_NM',
        name: `직 위`,
        sortable: true,
        resizable: true,
      },
      {
        key: 'PL_UN_KOR_NM',
        name: `직 책`,
        resizable: true,
        sortable: true,
      },
      {
        key: 'TM_KOR_NM',
        name: `팀`,
        sortable: true,
      },
      {
        key: 'MEMO_DESC',
        name: `메모`,
        sortable: true,
      },
      {
        key: 'REQST_QTY',
        name: `신청수량`,
        sortable: true,
      },
      {
        key: 'CARD_RCV_NM',
        name: `배송방법`,
        sortable: true,
      },
      {
        key: 'BULDING_NM',
        name: `상주건물`,
        sortable: true,
      },
      {
        key: 'CARD_STD_NM',
        name: `발급상태`,
        sortable: true,
      },
      {
        key: 'AGENT_NM',
        name: `신청대리인`,
        sortable: true,
      },
      {
        key: 'AGENT_ID',
        name: `신청대리인사번`,
        sortable: true,
      },                        
      {
        key: 'CARD_STD_140',
        name: `수령완료`,
        sortable: true,
      },                              
    ];
  
    this.state = {
      title: `전체현황`,
      selectedIndexes: [],
      delData: [],
      keywordType: '전체',
      keyword: '',
      cardTypeCd: '',         // 명함종류
      cardRcvCd: '',          // 배송방법
      reqstId: '',            // 사번 
      cardReqstNo: '',        // 신청번호 
      reqstKorNm: '',         // 신청자성명
      agentNm: '',            // 대리 신청인명 AGENT_NM
      startDateString: '',    // 주문시작일 100
      endDateString: '',      // 주문종료일 100
      std130Val: '',          // 발급시작일 130
      end130Val: '',          // 발급종료일 130      
      sortColumnParam: '',
      sortDirectionParam: '',
      // siteId: prop.siteId,
      periodDates:  [,],
      periodDates2: [,],
      reqstKorNmValid:   false,   //신청자성명  
      agentNmValid:      false,   //대리인명  
      cardReqstNoValid:  false,   //신청번호
      reqstIdValid:      false,   //사번
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
      std130Val,
      end130Val,
      this.state.reqstKorNm,
      this.state.agentNm,
      this.state.cardReqstNo,
      this.state.reqstId,
      this.state.cardRcvCd,
      this.state.cardTypeCd,
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

  //============================== 이벤트 =======================
  onChangereqstKorNm = (e) => {
    this.setState({ reqstKorNm: e.target.value });   if (e.target.value !== '') this.setState({ reqstKorNmValid: true });    else this.setState({ reqstKorNmValid: false });
  };

  onChangeagentNm = (e) => {
    this.setState({ agentNm: e.target.value });   if (e.target.value !== '') this.setState({ agentNmValid: true });    else this.setState({ agentNmValid: false });
  };

  onChangecardReqstNo = (e) => {
    this.setState({ cardReqstNo: e.target.value });   if (e.target.value !== '') this.setState({ cardReqstNoValid: true });    else this.setState({ cardReqstNoValid: false });
  };

  onChangecardreqstId = (e) => {
    this.setState({ reqstId: e.target.value });   if (e.target.value !== '') this.setState({ reqstIdValid: true });    else this.setState({ reqstIdValid: false });
  };

  onChangecardRcvCd  = (val) => { this.setState({ cardRcvCd: val });  };
  onChangecardTypeCd = (val) => { this.setState({ cardTypeCd: val }); };


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
 //---------------------------------------------------------------------------------------------------------------
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
    this.props.history.push({ pathname: `/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub/BcDetail`, state: data });
  }
 //-------------------------------------------REQST_KOR_NM--------------------------------------------------------------------
  HyperlinkFomatterName = (val) => {
    const hyperlinkName2 = val.dependentValues.REQST_KOR_NM;
    return (
      <hltext onClick={() => 
        this.dtlLink2({
            BC_ID: val.dependentValues.CARD_REQST_NO,
            sortColumnParam: this.state.sortColumnParam,
            sortDirectionParam: this.state.sortDirectionParam,
            keywordType: this.state.searchType,
            keyword: this.state.searchKeyword,
         })}
      >
        {hyperlinkName2}
      </hltext>
    );
  };
  dtlLink2 = (data) => {
    this.props.history.push({ pathname: `/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub/BcDetail`, state: data });
  }
 //---------------------------------------------------------------------------------------------------------------

  initState = () => {
    pageNum = pageIndex;
    this.setState({
      selectedIndexes: [],
      delData: [],
      keywordType: '전체',
      keyword: '',
      sortColumnParam: '',
      sortDirectionParam: '',
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
        std130Val,
        end130Val,
        this.state.reqstKorNm,
        this.state.agentNm,
        this.state.cardReqstNo,
        this.state.reqstId,
        this.state.cardRcvCd,
        this.state.cardTypeCd,
      );
    }
    return this.props.getRow[i];
  }

//------------------------------------------------------------------------
//------------------------------------------------------------------------
  onChangeKeyword = (e) => {
    this.setState({ keyword: e.target.value });
  }

  //------------------------------------------------------------------------
  onPeriodChange = (dates) => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  }
//------------------------------------------------------------------------
  onPeriodChange2 = (dates) => {
    this.setState({
      periodDates2: [dates[0], dates[1]],
    });
  }

//------------------------------------------------------------------------
dateSet = () => {
  if (this.state.periodDates !== '' && this.state.periodDates !== null) {
     startDateString = this.timeToDateForm(this.state.periodDates[0], 'bar').replace(/-/g, '');
     endDateString   = this.timeToDateForm(this.state.periodDates[1], 'bar').replace(/-/g, '');
  } else {
     startDateString = '';
     endDateString = '';
  }
}
//----------발급기간-------------------------------------------------------------- std130Val end130Val
dateSet2 = () => {
  if (this.state.periodDates2 !== '' && this.state.periodDates2 !== null) {    
     std130Val = this.timeToDateForm(this.state.periodDates2[0], 'bar').replace(/-/g, '');
     end130Val = this.timeToDateForm(this.state.periodDates2[1], 'bar').replace(/-/g, '');
  } else {
     std130Val = '';
     end130Val = '';
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
      std130Val,
      end130Val,
      this.state.reqstKorNm,
      this.state.agentNm,
      this.state.cardReqstNo,
      this.state.reqstId,
      this.state.cardRcvCd,
      this.state.cardTypeCd,
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
   
    return (
      <div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
         <div>
           <table align='center'>
                   <tr>
                        <td><font color='red'>{this.state.title}</font>
                                <table>
                                      <tr>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;주문일자</font></td>
                                            <td>  <RangePicker format={dateFormat}
                                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')], }}
                                                    onChange={this.onPeriodChange}
                                                    value={this.state.periodDates !== '' ? this.state.periodDates : null}
                                                  />
                                            </td>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;신청자</font></td>
                                            <td><Input value={this.state.reqstKorNm}    onChange={this.onChangereqstKorNm} /></td>

                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;대리신청인</font></td>
                                            <td><Input value={this.state.agentNm}    onChange={this.onChangeagentNm} /></td>
                                      </tr>
                                      <tr>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;발급일자</font></td>
                                            <td>  <RangePicker format={dateFormat}
                                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')], }}
                                                    onChange={this.onPeriodChange2}
                                                    value={this.state.periodDates2 !== '' ? this.state.periodDates2 : null}
                                                  />
                                            </td>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;신청번호</font></td>
                                            <td><Input value={this.state.cardReqstNo}    onChange={this.onChangecardReqstNo}  /> </td>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;사 번</font></td>
                                            <td><Input value={this.state.reqstId}  onChange={this.onChangecardreqstId} /> </td>
                                      </tr>
                                      <tr>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;배송방법</font></td>
                                            <td>   
                                                  <Select onChange={this.onChangecardRcvCd} defaultValue={this.state.cardRcvCd} style={{ width: 120, marginRight: 10, visibility: 'visible' }} >
                                                    <Option value="">-- 전체 --</Option>
                                                    <Option value="A">직접수령</Option>
                                                    <Option value="B">사내문서수발</Option>
                                                  </Select>
                                            </td>
                                            <td  width='80' ><font size="2">&nbsp;&nbsp;&nbsp;명함종류</font></td>
                                            <td>
                                                  <Select  onChange={this.onChangecardTypeCd} defaultValue={this.state.cardTypeCd} style={{ width: 120, marginRight: 10, visibility: 'visible' }} >
                                                    <Option value="">-- 전체 --</Option>
                                                    <Option value="AA">한글기본형</Option>
                                                    <Option value="AB">한글확대형</Option>
                                                    <Option value="BA">한자기본형</Option>
                                                    <Option value="BB">한자확대형</Option>
                                                    <Option value="CA">별정기본형</Option>
                                                    <Option value="CB">별정확대형</Option>
                                                  </Select>

                                            </td>
                                            <td  width='80' ></td><td></td>
                                      </tr>
                                </table>
                        </td>
                        <td> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               <LinkBtnDkGray
                                            onClick={() => {
                                              pageNum = pageIndex;
                                              this.dateSet();
                                              this.dateSet2();
                                              this.props.getList(
                                                pageNum,
                                                this.state.sortColumnParam,
                                                this.state.sortDirectionParam,
                                                this.state.keywordType,
                                                this.state.keyword,
                                                oneDateString,
                                                startDateString,
                                                endDateString,
                                                std130Val,
                                                end130Val,
                                                this.state.reqstKorNm,
                                                this.state.agentNm,
                                                this.state.cardReqstNo,
                                                this.state.reqstId,
                                                this.state.cardRcvCd,
                                                this.state.cardTypeCd,
                                              );
                                              }
                                            } >검 색</LinkBtnDkGray></td>   
                   </tr>
           </table>    
       </div>                                

      <StyleSiteAdminList>         
                <StyleDataGrid className="siteAdmin">
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

                 </StyleDataGrid>
          <div className="buttonWrapper">
           {/* <BtnDelete onClick={this.delConfirm}>{intlObj.get(messages.lblDelete)}</BtnDelete>*/}
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
      std130Val,
      end130Val,
      reqstKorNm,
      agentNm,
      cardReqstNo,
      reqstId,
      cardRcvCd,
      cardTypeCd,
    ) => dispatch(actions.getList(
      pgNum,
      sortColumnParam,
      sortDirectionParam,
      keywordType,
      keyword,
      oneDate,
      startDate,
      endDate,
      std130Val,
      end130Val,
      reqstKorNm,
      agentNm,
      cardReqstNo,
      reqstId,
      cardRcvCd,
      cardTypeCd,
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
const withReducer = injectReducer({ key: 'SiteListAll', reducer });
const withSaga = injectSaga({ key: 'SiteListAll', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(BcinfoList);
