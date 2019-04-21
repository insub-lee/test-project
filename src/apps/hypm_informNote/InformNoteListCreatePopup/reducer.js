import { fromJS } from 'immutable';
import * as constants from './constants';
import axios from 'axios';
import jquery from 'jquery';

const initState = fromJS({
  sdptList: [],
  modelList: [],
  downList: [],
  downTypeList: [],
});

const ApprovalinformNotePopup = (state = initState, action) => {
  const initState = fromJS({
    // 데이터의 초기값 세팅
    unitList: [],
  });
    const tempMultiData ={
    CODE: '',
    NAME: 'ALL'
  };
  
  switch (action.type) {
    case constants.LOADING_PARAM:
        return state.set('sdptList', action.sdptList)
   case constants.LOADING_SDPT_PARAM:
        return state.set('modelList', action.modelList);
   case constants.LOADING_DOWNPARAM:
          // action.downList.unshift(tempMultiData);
        return state.set('downList', action.downList);
   case constants.LOADING_DOWNTYPEPARAM:
          // action.downTypeList.unshift(tempMultiData);
        return state.set('downTypeList', action.downTypeList);
   case constants.SET_TOTALTIME_CREATE_INFORM_NOTE_POPUP: 
        return state.set('TotalTimeCal', action.TotalTimeCal);
   case constants.LOADING_UNIT_PARAM:
        return state.set('unitList', action.unitList);  
   case constants.LOADING_TYPE_PARAM:
        return state.set('typeList', action.typeList);
   case constants.LOADING_CAUSE_PARAM:
        return state.set('causeList', action.causeList);
   case constants.LOADING_PART_PARAM:
        return state.set('partList', action.partList);
   case constants.LOADING_UNIT_CODE:
        return state.set('unitCode', action.value);
   case constants.LOADING_TYPE_CODE:
        return state.set('typeCode', action.value);
   case constants.LOADING_CAUSE_CODE:
        return state.set('causeCode', action.value);
   case constants.LOADING_PART_CODE:
        return state.set('partCode', action.value);
   default:
      return state;
  }
};
export default ApprovalinformNotePopup;
