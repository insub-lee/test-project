import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import excelImg from 'images/common/excel.png';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import { Button, Select, DatePicker, TimePicker, Input } from 'antd';
//import '../../../../apps/hypm_common/css/gipms.css';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import EqIdSearch from '../EqIdSearch';
import RepairGrid from './repair';

const Options = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// const Search = Input.Search;왜 때문에 에러나나요
let PARAM_BEBER;
let MULTI_PARAM_TPLNR;
let PARAM_STAND;
let PARAM_ARBPL;
let bsiYn;
let opener_menu_id;
let PARAM_ALARM_ARBPL;

//class informNoteListCreatePopup extends React.PureComponent {
class InformNoteListCreatePopup extends PureComponent {
  constructor(props) {
    super(props);
    
     console.log('프랍스', props);

     const { params } = props.match;
     const { PARAM } = params;
     let arrParam = [];

     arrParam          = PARAM.split('|');
     PARAM_BEBER       = arrParam[0] === undefined ? '' : arrParam[0];
     MULTI_PARAM_TPLNR = arrParam[1] === undefined ? '' : arrParam[1];
     PARAM_STAND       = arrParam[2] === undefined ? '' : arrParam[2];
     PARAM_ARBPL       = arrParam[3] === undefined ? '' : arrParam[3];
     bsiYn             = arrParam[4] === undefined ? '' : arrParam[4];
     opener_menu_id    = arrParam[5] === undefined ? '' : arrParam[5];

     this.state = {
        defaultBox: [],
        sdpt: PARAM_STAND,
        //sdpt: '12058',
        fl: undefined,
        model: undefined,
        eqId: [],
        down: undefined,
        selectedDown: undefined,
        downtype: undefined,
        selectedDownType: undefined,
        combo_work_center  : '',  // SDPT
        tidnr              : 'test',  // EQ ID
        equnr              : 'test01',  // EQ_MST_ID
        down_date          : '',  // 작업시작
        down_time          : '',  // 작업시작
        up_date            : '',  // 작업완료
        up_time            : '',  // 작업완료
        totaltime          : '',  // Total Time
        work_time          : '25:00:00',  // work_time
        down_date: new Date(),
        up_date: new Date(),
        combo_noti_type: undefined,
        combo_down_type: undefined,
        work_time          : '25:00:00',  // work_time
        auto_manual        : '홍길동',  // Auto/Manual
        noteComment        : 'test11111',  // Down Comment
        zzproblem          : 'test22222',  // Problem
        tdline             : 'test33333',  // 조치 상세 내용
        remark             : 'test4444',  // remark
        edmsId             : 'test5555',  // 첨부문서
     };

    const param = {
       PARAM_BEBER: PARAM_BEBER, // FAB
     //PARAM_BEBER: '121',
      PARAM_STAND: MULTI_PARAM_TPLNR , // Team    AND STAND =  'P121-08' /**P*/ 
      //PARAM_STAND: 'P121-08',     // AND STAND =  'P121-08' /**P*/ 
      // MULTI_PARAM_CODEGRUPPE: MULTI_PARAM_NOTI_TYPE, // Down
     // PARAM_ARBPL: PARAM_ARBPL, // SDPT
    };
    this.handleChangeDown_date = this.handleChangeDown_date.bind(this);
    this.handleChangeDown_time = this.handleChangeDown_time.bind(this);
    this.handleChangeUp_date   = this.handleChangeUp_date.bind(this);
    this.handleChangeUp_time   = this.handleChangeUp_time.bind(this);
  
    this.props.handleLoadingParam(param);
    this.props.handleLoadingSdptParam(PARAM_ALARM_ARBPL);
  }
  
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

  componentDidMount() {
    // this.handleSelect('note');
    // this.props.handleLoadingFabParam();
    this.props.handleLoadingDownParam();
     this.multiDefault = {
       label: 'All',
       value: '',
     };
     this.SelectDefault = {
       CODE: '',
       NAME: 'Select 하세요.',
     };
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      sdpt: event,
      combo_work_center : event,
      model: [],
      eqId: [],
    });
  }


  handleDownChange = (event) => {
    const { handleLoadingDownTypeParam } = this.props;
    handleLoadingDownTypeParam(event);
    this.setState({
      down: event,
      combo_noti_type: event,
    });
  }

  handleDownTypeChange = (event) => {
    this.setState({
      downtype: event,
      combo_down_type: event,
    });
  }

  handleChangeDown_time(e) {
    this.setState({
        down_time: e
    });
      this.props.handle_Loading_TotalTime(
            this.state.down_date,
            e,
            this.state.up_date,
            this.state.up_time,
            this.state.totaltime,
         );
   }

   handleChangeUp_time(e) {
    this.setState({
        up_time: e
    });
     this.props.handle_Loading_TotalTime(
          this.state.down_date,
          this.state.down_time,
          this.state.up_date,
          e,
          this.state.totaltime,
         );
   }


  handleChangeDown_date(date) {
    this.setState({
        down_date: date
    });
     this.props.handle_Loading_TotalTime(
         date,
         this.state.down_time,
         this.state.up_date,
         this.state.up_time,
         this.state.totaltime,
        );
  }

  handleChangeUp_date(date) {
    this.setState({
        up_date: date
    });
     this.props.handle_Loading_TotalTime(
         this.state.down_date,
         this.state.down_time,
         date,
         this.state.up_time,
         this.state.totaltime,
         );
  }

   onGridReady = (params) => {
     this.gridApi = params.api;
   };
//-------------------------------------------------------------------------------------------------------------------------
// Down Comment
onChnoteComment = (e) => { this.setState({ noteComment: e.target.value }); if (e.target.value !== '') this.setState({ noteCommentValid: true }); else this.setState({ noteCommentValid: false });  };
// Problem
onChzzproblem   = (e) => { this.setState({ zzproblem: e.target.value });   if (e.target.value !== '') this.setState({ zzproblemValid: true });  else this.setState({ zzproblemValid: false });  };
// 조치 상세 내용
onChtdline = (e) => {    this.setState({ tdline: e.target.value });   if (e.target.value !== '') this.setState({ tdlineValid: true });    else this.setState({ tdlineValid: false });  };
// remark
onChremark = (e) => {    this.setState({ remark: e.target.value });   if (e.target.value !== '') this.setState({ remarkValid: true });    else this.setState({ remarkValid: false });  };
// 첨부문서
onChedmsId = (e) => {    this.setState({ edmsId: e.target.value });   if (e.target.value !== '') this.setState({ edmsIdValid: true });    else this.setState({ edmsIdValid: false });  };
//---------------------------------------------------------------------------------------------------
createInformNotes = () => {
  if (this.vaildChk()) {
    const TempVal = {
                    };
    this.props.InsertInformNoteListCreatePopup(
                                              this.state.combo_work_center,   // SDPT
                                              this.state.tidnr,               // EQ ID
                                              this.state.equnr,               // EQ MST ID
                                              this.state.combo_noti_type,     // Down
                                              this.state.combo_down_type,     // Down Type    
                                              this.state.down_date,           // 작업시작
                                              this.state.down_time,           // 작업시작   
                                              this.state.up_date,             // 작업완료      
                                              this.state.up_time,             // 작업완료
                                              this.props.TotalTimeCal,        // Total Time  
                                              this.state.work_time,           // work Time  
                                              this.state.auto_manual,         // Auto_Manual
                                              this.state.noteComment,         // DownComment
                                              this.state.zzproblem,           // Problem
                                              this.state.tdline,              // 조치상세내용
                                              this.state.remark,              // Remark
                                              this.state.edmsId,              // 첨부문서
                                              //rowData,
                                              this.props.history,
    );
    //this.RFC_SAVE();
  }

}  
vaildChk = () => {
  //생략.....
  console.log('#####################[vaildChk-------------- 생략]#######################');
  return true;
}
//============================================================================================================================
  ShowSetNoteTypeN7 = () => {  
    console.log("--------------[ShowSetNoteTypeN7]---------------------"+this.state.combo_noti_type);

    if (this.state.combo_noti_type ==='N7' ){  //틈새보전
      console.log("--------------[ShowSetNoteTypeN7]---------------------");
      return (
        <div>
              <div className="add-content">
                    {/* ag Grid */}
                    <div className="grid-area">
                      <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
                      <RepairGrid 
                                  //Item={Item} 
                                  //editable= {true} 
                                  //searchState={searchState} 
                                  //ref="RepairGrid" 
                                  //handleDeleteLineList={handleDeleteLineList} 
                        />
                      </div>
                    </div>
                </div>
         </div>                      
       );  
      }   
   }
//============================================================================================================================


  render() {
    const {
      defaultBox,
      sdpt,
      fl,
      model,
      eqId,
      down,
      downtype,
    } = this.state;

    const {
      sdptList,
      modelList,
      downList,
      downTypeList,
    } = this.props;

    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">Inform Note 수기생성</h2>
          <Button className="btn-popup-close">닫기</Button>
        </header>
        {/* popup contnent */}
        <main className="popup-content">
          {/* Data Table */}
          <table className="data-table">
            <tr>
              <th className="required">SDPT</th> {/* 필수입력만 th className="required" */}
              <td>
                {/* antd select */}
                <Select
                      defaultValue={defaultBox}
                      value={sdpt}
                      style={{ width: 150 }}
                      onChange={this.handleSdptChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      { sdptList.map(sdptKey => <Options key={sdptKey.CODE}>{sdptKey.NAME}</Options>) }
                    </Select>
              </td>
              <th className="required">EQID</th>
              <td>
                 <EqIdSearch
                      //fab={PARAM_ALARM_BEBER}
                      //team={PARAM_ALARM_STAND}
                      sdpt={sdpt}
                      //fl={fl}
                      //model={model}
                      tidnConfirmList={eqId}
                    />
              </td>
              <th className="required">Down</th>
              <td>
                {/* antd select */}
                <Select
                      defaultValue={defaultBox}
                      value={down}
                      style={{ width: 150 }}
                      onChange={this.handleDownChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      { downList.map(downKey => <Options key={downKey.CODE}>{downKey.NAME}</Options>) }
                    </Select>
              </td>
              <th className="required">Down Type</th>
              <td>
                {/* antd select */}
                <Select
                      defaultValue={defaultBox}
                      value={downtype}
                      style={{ width: 150 }}
                      onChange={this.handleDownTypeChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      { downTypeList.map(downTypeKey => <Options key={downTypeKey.CODE}>{downTypeKey.NAME}</Options>) }
                    </Select>
              </td>
            </tr>
            <tr>
              <th className="required">작업시작</th>
              <td>
                <div className="date-time-area">
                  {/* date picker */}
                  <span className="date">
                    <DatePicker 
                               selected={this.state.down_date}
                               onChange={this.handleChangeDown_date}
                    />
                  </span>
                  {/* time picker */}
                  <span className="time">
                    <TimePicker defaultOpenValue={moment(new Date(), 'HH:mm:ss')} 
                               value={this.state.down_time}
                               onChange={this.handleChangeDown_time}
                    
                    />
                  </span>
                </div>
              </td>
              <th>작업완료</th>
              <td>
                <div className="date-time-area">
                  {/* date picker */}
                  <span className="date">
                    <DatePicker 
                               selected={this.state.up_date}
                               onChange={this.handleChangeUp_date}
                    />
                  </span>
                  {/* time picker */}
                  <span className="time">
                    <TimePicker defaultOpenValue={moment(new Date(), 'HH:mm:ss')} 
                                value={this.state.up_time}
                                onChange={this.handleChangeUp_time}
                    />
                  </span>
                </div>
              </td>
              <th>Total Time</th>
              <td>
                {/* read only input */}
                {/* <Input disabled /> */}
                <Input value={this.props.TotalTimeCal} readOnly />
              </td>
              <th>Auto/Manual</th>
              <td>
                {/* read only input */}
                <Input value={this.props.userInfo.NAME_KOR} readOnly />
              </td>
            </tr>
            <tr>
              <th>Down Comment</th>
              <td colSpan="7">
                    <TextArea
                          value={this.state.noteComment}
                          onChange={this.onChnoteComment}
                          autosize={{ minRows: 1, maxRow: 1 }}
                      />
              </td>
            </tr>
            <tr>
              <th>Problem</th>
              <td colSpan="7">
                {/* text area */}
                <TextArea
                          value={this.state.zzproblem}
                          onChange={this.onChzzproblem}
                          autosize={{ minRows: 3, maxRow: 5 }}
                      />

              </td>
            </tr>
            <tr>
              <th>조직 상세 내용</th>
              <td colSpan="7">
                {/* text area */}
                <TextArea
                          value={this.state.tdline}
                          onChange={this.onChtdline}
                          autosize={{ minRows: 3, maxRow: 5 }}
                      />
              </td>
            </tr>
            <tr>
              <th>Remark</th>
              <td colSpan="7">
                {/* input */}
                <TextArea
                          value={this.state.remark}
                          onChange={this.onChremark}
                          autosize={{ minRows: 1, maxRow: 1 }}
                      />
              </td>
            </tr>
            <tr>
              <th>첨부문서</th>
              <td colSpan="7">
                {/* 첨부파일 */}                    <TextArea
                          value={this.state.edmsId}
                          onChange={this.onChedmsId}
                          autosize={{ minRows: 1, maxRow: 1 }}
                      />
                <Button className="btn-attach-file">첨부파일</Button>
              </td>
            </tr>
          </table>

       {this.ShowSetNoteTypeN7()} 

          <div className="btn-group">
            <div className="right">
              <Button type="primary"  onClick={this.createInformNotes} className="btn-apply save">저장</Button>
              <Button type="primary" className="btn-apply save">닫기</Button>
            </div>
          </div>
        </main>

      </section>
    );
  }
}


InformNoteListCreatePopup.propTypes = {
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  sdptList: PropTypes.array,
  match: PropTypes.object.isRequired,
  downList: PropTypes.array,
  downTypeList: PropTypes.array,
  userInfo: PropTypes.object,
};

InformNoteListCreatePopup.defaultProps = {
  sdptList: [],
  downList: [],
  downTypeList: [],
  TotalTimeCal: '',
  userInfo: [],
};

const mapStateToProps = createStructuredSelector({
  sdptList: selectors.makeSdptList(),
  downList: selectors.makeDownList(),
  downTypeList: selectors.makeDownTypeList(),
  TotalTimeCal : selectors.makeTotalTimeInformNotePopup(),
  userInfo: selectors.makeSelectProfile1(),

});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingParam: param => dispatch(actions.loadingParam(param)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handleLoadingDownParam: () => dispatch(actions.loadingDownParam()),
    handleLoadingDownTypeParam: value => dispatch(actions.loadingDownTypeParam(value)),

    InsertInformNoteListCreatePopup: (
                    combo_work_center,   // SDPT
                    tidnr,               // EQ ID
                    equnr,               // EQ MST ID
                    combo_noti_type,     // Down
                    combo_down_type,     // Down Type    
                    down_date,           // 작업시작
                    down_time,           // 작업시작   
                    up_date,             // 작업완료      
                    up_time,             // 작업완료
                    totaltime,           // Total Time  
                    work_time,           // work Time  
                    auto_manual,         // Auto_Manual
                    noteComment,         // DownComment
                    zzproblem,           // Problem
                    tdline,              // 조치상세내용
                    remark,              // Remark
                    edmsId,              // 첨부문서
                   // rowData,
                    history) =>
                    dispatch(actions.InsertInformNoteListCreatePopup(
                                                                    combo_work_center,   // SDPT
                                                                    tidnr,               // EQ ID
                                                                    equnr,               // EQ MST ID
                                                                    combo_noti_type,     // Down
                                                                    combo_down_type,     // Down Type    
                                                                    down_date,           // 작업시작
                                                                    down_time,           // 작업시작   
                                                                    up_date,             // 작업완료      
                                                                    up_time,             // 작업완료
                                                                    totaltime,           // Total Time  
                                                                    work_time,           // work Time  
                                                                    auto_manual,         // Auto_Manual
                                                                    noteComment,         // DownComment
                                                                    zzproblem,           // Problem
                                                                    tdline,              // 조치상세내용
                                                                    remark,              // Remark
                                                                    edmsId,              // 첨부문서
                                                                   // rowData,
                                                              history)),


    handle_Loading_TotalTime : (         
      down_date,           // 작업시작
      down_time,           // 작업시작   
      up_date,             // 작업완료      
      up_time,             // 작업완료
      totaltime,           // Total Time  
      ) =>
      dispatch(actions.handle_Loading_TotalTime(
                                                  down_date,           // 작업시작
                                                  down_time,           // 작업시작   
                                                  up_date,             // 작업완료      
                                                  up_time,             // 작업완료
                                                  totaltime,           // Total Time  
      )),

  };
}

const withReducer = injectReducer({ key: 'InformNoteListCreatePopup', reducer });
const withSaga = injectSaga({ key: 'InformNoteListCreatePopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNoteListCreatePopup);
