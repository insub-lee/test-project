import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import excelImg from 'images/common/excel.png';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Axios from 'axios';
import { createStructuredSelector } from 'reselect';
import * as feed from 'components/Feedback/functions';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache, } from 'react-virtualized';
import { call } from 'redux-saga/effects';
//import { Axios } from 'utils/AxiosFunc';
import * as actions from '../informNote/actions';
// import { BtnSearchDkBlue } from '../buttons.style';
import NoteDetail from './list';
import * as selectors from './selectors';
import * as informNoteSelectors from '../informNote/selectors';
import jquery from 'jquery';
import * as func from '../function';
import * as commonActions from '../actions';
import informNote from '../informNote';

// import Grid from './grid.js';
// eslint-disable-next-line react/prefer-stateless-function
class InformNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedInformNoteNo: "",
      interlockList: [],
      isLock: "N",
      lockEmpNam: "",
      lockSabun: "",
      //editInformNote: {},
      deleteItemList: [],
      eqid: "",
      tmp: "",
      detail: {},
      currentIndex: 0,
      height: 800,
      overscanRowCount: 2,
      detailIndex: 0,
    }

    this.cache = new CellMeasurerCache({
      defaultHeight: 830,
      fixedWidth: true,
    })

    // window.addEventListener('scroll', this.onScroll);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (this.props.searchState.moveEqid !== nextProps.searchState.moveEqid ) {
      if (nextProps.searchState.moveEqid !== undefined) {
          let idx = this.props.informNoteDataList.informNoteList.findIndex( eq => eq.EQ_ID === nextProps.searchState.moveEqid);
          if (idx > -1) {
            this.setState({
              detailIndex: idx,
            });
          }
        // }
      } else {
        this.setState({
          detailIndex: 0,
        });
      }
    } 
    // else if (this.props.searchState.moveEqid === nextProps.searchState.moveEqid) {
    //   this.setState({
    //     detailIndex: 0,
    //   });
    // } 
  }

  handleChange = (e) => {
    this.setState({tmp: e.target.value});
  }

  handleSearch = (e) => {
    this.setState({ eqid: this.state.tmp });
  }

  handleSave = async() => {
    const { isLock, interlockList, lockSabun } = this.state;
    const { profile } = this.props;

    if(isLock === 'Y') {
      vBackUpOpen = true;
      feed.warning(lockEmpNam + "(" + lockSabun + ") 사용자가 인터락 설정중입니다.\n저장에 실패하였습니다.\n입력하신 데이터는 팝업화면에 보존됩니다.");
		}
		else if(lockSabun != "" && lockEmpNam != lockSabun){
			vBackUpOpen = true;
			feed.warning("인터락이 해제되어 저장에 실패하였습니다.\n입력하신 데이터는 팝업화면에 보존됩니다.");
    }
    
    feed.showConfirm('저장', 'Inform Note를 저장하시겠습니까?', async() => {
      let paramInterlock = new Array();
      for(var i in interlockList){
        paramInterlock.push({LOCK_TABLE_KEY: interlockList[i], LOCK_SABUN: profile.EMP_NO, LOCK_TABLE: "FAB_INFORM_NOTES"});
      }
      
      let saveInformNoteList = [];
      let list = this.refs.InformNote.updateInformNote(saveInformNoteList);
  
      if ( list.bReturn ) {
        alert(list.bReturnMsg);
        return;
      }
  
      var httpOption = {useProgress : true};
      var param = {
        list: {
          informNoteList: list,
          deleteLineList: [],
          deleteLineTechList: [], // 2015-09-15 Added KILHO37
          deleteLineSafetyWorkList: [],
          interlock: paramInterlock,
        },
        // INFORMNOTE_TYPE: INFORMNOTE_TYPE // 2015-09-15 Added KILHO37
      };
      
      Axios.post("/api/gipms/v1/informNote/fabInformNoteListDetailSave", param)
        .then(async(result) => {
          const { sucCode } = result.data;
  
          //m1023_fadeOutLayer('m1023_searchAlarmDiv', false);
          let  strFlag = "F";
  
          if(sucCode > 0){
            strFlag = "S";
            feed.warning("저장에 성공하였습니다.");
          }else{
            strFlag = "F";
            feed.warning("저장에 실패하였습니다.");
          }
    
          func.getInformNoteSingleData(this.state.checkedInformNoteNo, 'SAVE');
          this.setState({checkedInformNoteNo: ''});
        })
        .catch(res => {
          //m1023_fadeOutLayer('m1023_searchAlarmDiv', false);
          feed.warning("처리중 오류가 발생하였습니다.");
        });
    });
  }

  handleDeleteLineList = (M_ID, U_ID) => {
    const data ={
      M_ID: M_ID,
      U_ID: U_ID,
    };
    if(U_ID){
      const tempData = this.state.deleteItemList.push(data);
      this.setState({
        deleteItemList: tempData,
      });
    }
  }

  handleAlarmView = () => {
    // const url = '/hypm/popup/searchlist';
    // const h = 840;
    // const w = 600;
    // window.open(url, 'InformNoteList', 'width=600,height=840,toolbar=no,status=no,menubar=no,scrollbars=yes, resizable=yes, location=no');
    window.open("/sm/informNote/pop/InformNoteListAlarmListPopup/121|P121-08|12057|'CM', 'CP', 'MI', 'N1', 'N2', 'N3', 'N5', 'N6', 'N7'", 'ot', 'width=1650,height=775');
  }

  handleCreate = () => {
    // const url = '/hypm/popup/searchlist';
    // const h = 840;
    // const w = 600;
    // window.open(url, 'InformNoteList', 'width=600,height=840,toolbar=no,status=no,menubar=no,scrollbars=yes, resizable=yes, location=no');
    window.open("/sm/informNote/pop/InformNoteListCreatePopup/121|P121-08|12057|'CM', 'CP', 'MI', 'N5','N7'", 'ot', 'width=1200,height=800');
  }

  onEditEvent = (inform_note_no, checked) => {
    console.log('onEditEvent', inform_note_no, checked);
    if (checked) {
      this.setState({ checkedInformNoteNo: inform_note_no });
    } else {
      this.setState({ checkedInformNoteNo: '' });
    }
  }

  rowRender = ({ index, isScrolling, isVisible, key, parent, style }) => {
    const { informNoteList } = this.props.informNoteDataList;
    const { checkedInformNoteNo, eqid, detail } = this.state;
    const { searchState } = this.props;

    let codingName = '';
    let displayCodingName = true;
    
    const item = informNoteList[index];

    if (codingName !== item.CODING_NAME) {
      displayCodingName = true;
      codingName = item.CODING_NAME;
    } else {
      displayCodingName = false;
    }

    return ( 
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({measure}) => {
          return (
            <NoteDetail 
              key={key} 
              Item={item} 
              editItem={detail}
              onLoad={measure}
              displayCodingName={displayCodingName} 
              searchParam={this.props.searchParam} 
              checkedInformNoteNo={checkedInformNoteNo}
              searchState={searchState}
              dangerTaskList={this.props.dangerTaskList}
              ref={(checkedInformNoteNo === item.INFORM_NOTE_NO) ? "InformNote" : ""}
              visible={ eqid === "" ? true : ( item.EQ_ID.indexOf(eqid) > -1 ? true : false) }
              profile={this.props.profile}
              onEditEvent={this.onEditEvent.bind(this)} 
              onSaveEvent={this.handleSave.bind(this)} 
              handleDeleteLineList={this.handleDeleteLineList}
              userCompanyDefine={this.props.userCompanyDefine}
              rowStyle={style}
            />
          );
        }}
      </CellMeasurer>
	);
  }
  
  render() {
    const { informNoteList } = this.props.informNoteDataList;
    const { detailIndex, overscanRowCount } = this.state;

    return (
      <div ref="notelist" style={{height: '800px'}}>
        <div className="btn-group">
          <div className="right">
            <span className="inner-search-input"><Input ref="eqid" value={this.state.tmp} onChange={this.handleChange} />{/* input Search 에러나서 임시로 input */}</span>
            <Button type="primary" className="btn-normal find-eqid" onClick={this.handleSearch}>EQID 찾기</Button>
            <Button type="primary" className="btn-normal add-line" onClick={this.handleAlarmView}>Alarm등록</Button>
            <Button type="primary" className="btn-normal add-line" onClick={this.handleCreate}>수기생성</Button>
            <Button type="primary" className="btn-apply save" onClick={this.handleSave}>저장</Button>
            <Button type="primary" className="btn-apply excel">엑셀</Button>
          </div>
        </div>
        <AutoSizer>
          { 
            ({width, height }) => (   
              <List
                width={width}
                height={height}
                rowCount={informNoteList ? informNoteList.length : 0}
                overscanRowCount={overscanRowCount}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.rowRender.bind(this)}
                deferredMeasurementCache={this.cache}
                scrollToIndex={detailIndex}
              />
            )
          }
        </AutoSizer>
        {/* { this.renderList() } */}
        <form name="workOrderPopupForm" action="" target="createWorkOrderPopupForInformNotes">
          <input type="hidden" name="PARAM_WO_BEBER" id="PARAM_WO_BEBER" />
          <input type="hidden" name="PARAM_WO_STAND" id="PARAM_WO_STAND" />
          <input type="hidden" name="PARAM_WO_ARBPL" id="PARAM_WO_ARBPL" />
          <input type="hidden" id="IV_AUFNR" name="IV_AUFNR" value="" />
          <input type="hidden" id="ORG_PAGE" name="ORG_PAGE" value="informNotesDetail" />
          <input type="hidden" id="NOTI_TYPE" name="NOTI_TYPE" value="" />
          <input type="hidden" id="CODDING" name="CODDING" value="" />
          <input type="hidden" id="TIDNR" name="TIDNR" value="" />
          <input type="hidden" id="U_ID" name="U_ID" value="" />
          <input type="hidden" id="DOWN_DATE" name="DOWN_DATE" value="" />
          <input type="hidden" id="DOWN_TIME" name="DOWN_TIME" value="" />
        </form>
      </div>
    );
  }
}

InformNote.propTypes = {
  dangerTaskList: PropTypes.array,
  informNoteDataList: PropTypes.array,
  searchParam: PropTypes.object,
  searchState: PropTypes.object,
  handleCheckInterLock: PropTypes.func,
  sendInterlockPush: PropTypes.func,
  move: PropTypes.func,
};

InformNote.defaultProps = {
  searchParam: {},
  searchState: {},
  dangerTaskList: [],
  informNoteDataList: [],
};

const mapStateToProps = createStructuredSelector({
  informNoteDataList: informNoteSelectors.makeInforNoteDataList(),
  dangerTaskList: informNoteSelectors.makeDangerTaskList(),
  profile: selectors.makeSelectProfile(),
  // moveEqid: informNoteSelectors.makeNoteDatail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    sendInterlockPush: (value) => dispatch(commonActions.sendInterlockPush(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(InformNote);

