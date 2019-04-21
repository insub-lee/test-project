import { fromJS } from 'immutable';
import * as constants from './constants';
import axios from 'axios';

const initState = fromJS({
  // 데이터의 초기값 세팅
  fabList: [],
  hotList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  // versionList: [],
  signStatusList: [],
  modelList: [],
  downList: [],
  downTypeList: [],
  pmSheetDataList: [],
  informNoteDataList: [],
  param: [],
  tidnList: [],
  lclassList: [],
  mclassList: [],
  sclassList: [],
  dangerTaskList: [],
  editInformNote: [],
  moveEqid: '',
  userGridDefineList: {
    list: [],
    selectList: [],
  },
});

const pmsheetReducer = (state = initState, action) => {
  const tempMultiData ={
    CODE: '',
    NAME: 'ALL'
  };
  // const tempSelData ={
  //   CODE: '',
  //   NAME: 'Select 하세요.'
  // };
  switch (action.type) {
    case constants.LOADING_FAB_PARAM:
      // action.fabList.unshift(tempSelData);
      return state.set('fabList', action.fabList);
    case constants.LOADING_HOT_PARAM:
      return state.set('hotList', action.hotList);
    case constants.LOADING_TEAMPARAM:
      // action.teamList.unshift(tempSelData);
      return state.set('teamList', action.teamList);
    case constants.LOADING_SHIFTPARAM:
      action.shiftList.unshift(tempMultiData);
      return state.set('shiftList', action.shiftList);  
    case constants.LOADING_SDPTPARAM:
      action.sdptList.unshift(tempMultiData);
      return state.set('sdptList', action.sdptList);
    case constants.LOADING_DOWNPARAM:
      action.downList.unshift(tempMultiData);
      return state.set('downList', action.downList);
    case constants.LOADING_DOWNTYPEPARAM:
      action.downTypeList.unshift(tempMultiData);
      return state.set('downTypeList', action.downTypeList);
    case constants.LOADING_MODELPARAM:
      action.modelList.unshift(tempMultiData);
      return state.set('modelList', action.modelList);
    case constants.LOADING_FLPARAM:
      action.flList.unshift(tempMultiData);
      return state.set('flList', action.flList);
    case constants.LOADING_LCLASSPARAM:
      action.lclassList.unshift(tempMultiData);
      return state.set('lclassList', action.lclassList);
    case constants.LOADING_MCLASSPARAM:
      action.mclassList.unshift(tempMultiData);
      return state.set('mclassList', action.mclassList);
    case constants.LOADING_SCLASSPARAM:
      action.sclassList.unshift(tempMultiData);
      return state.set('sclassList', action.sclassList);
    case constants.LOADING_PMSHEETSEARCH:
      return state.set('pmSheetDataList', action.pmSheetDataList);
    case constants.LOADING_DANGERTASK:
      return state.set('dangerTaskList', action.dangerTaskList);
    // case constants.MOVE_NOTEDETAIL:
    //   return state.set('moveEqid', action.eqid);
    case constants.INIT_INFORMNOTELIST:
      return state.set('param', {}).set('informNoteDataList', []);
    case constants.LOADING_FABINFORMNOTELISTSEARCHNEW_SAGA:
      const { alarmList } = action.informNoteList;
      for( let i=0; i<alarmList.length; i++ ) {
        var name = "cookie_" + alarmList[i]["U_ID"];
				var value = empNum;
				//var chkAlarm = fncChkAlarmCookie(name,value);

				// if (chkAlarm == "Y") {
				// fncAlarmPopup("fabInformNoteListAlarmPopupForm"+i, "D", alarmList[i], action.param);
				// }
      }

      return state.set('param', action.param).set('informNoteDataList', action.informNoteList);
    case constants.LOADING_FABINFORMNOTEEDITDETAIL:
      const _list = state.get("informNoteDataList");
      const _list2 = state.get("informNoteDataList");

      let informNote = action.list.informNoteList;
      informNote[0].REPT_EXIST = (informNote[0].REPT_EXIST === 'X') ? "Y" : informNote[0].REPT_EXIST;
      informNote[0].IS_MANUAL = (informNote[0].IS_MANUAL === 'X') ? "Manual" : "Auto";
      //informNote[0].WO_STATUS_NM =;
      informNote[0].IDX = 0;

      if (action.method === "SAVE") {

          let _tmp = Object.assign({}, _list);

          action.list.informNoteList.map( note => {
            for(let i=0; i<_tmp.informNoteList.length; i++) {
              let _t = _tmp.informNoteList[i];
              if ( _t.INFORM_NOTE_NO === note.INFORM_NOTE_NO ) {
                _tmp.informNoteList[i] = note;
                break;
              }
            }
          });

          return state.set('informNoteDataList', _tmp);
      }

      // action.list.informNoteList.map( informNote => {
      //   for(let i=0; i<informNoteList.length; i++) {
      //     let _t = informNoteList[i];
      //     if ( _t.INFORM_NOTE_NO === informNote.INFORM_NOTE_NO ) {
      //       _t = informNote;
      //       break;
      //     }
      //   }
      // });

      // state.set('informNoteDataList', informNoteList);
      return state.set('editInformNote', action.list);
    case constants.LOADING_TIDNPARAM:
      return state.set('tidnList', action.tidnList);
    case constants.LOADING_GRIDCOLUMN_SEARCH:
      const selectCol = [];
      if (action.userGridDefineList.length > 0) {
        for (let i = 0;  i < action.userGridDefineList.length; i += 1) {
          if (action.userGridDefineList[i].USE_YN === 'Y') {
            selectCol.push(action.userGridDefineList[i]);
          }
        }
      }
      const gridData = {
        selectList: selectCol,
        list: action.userGridDefineList,
      }
      return state.set('userGridDefineList',gridData);
    default:
      return state;
  }
};

export default pmsheetReducer;
