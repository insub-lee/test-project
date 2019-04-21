import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  unitList: [],
  typeList: [],
  causeList: [],
  partList: [],
  updateRepairList: [],
  deleteRepairList: [],
  updateTechSafeList: [],
  deleteTechSafeList: [],
  updateSafeWorkList: [],
  deleteSafeWorkList: [],
});

const pmsheetReducer = (state = initState, action) => {
  // const tempSelData ={
  //   CODE: '',
  //   NAME: 'Select 하세요.'
  // };
  switch (action.type) {
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
    case constants.UPDATE_REPAIR_LIST:
      return state.set('updateRepairList', action.value);
    case constants.UPDATE_REPAIR_LIST_DELETE:
      return state.set('updateRepairList', action.value);
    case constants.DELETE_REPAIR_LIST:
      const _list = state.get("deleteRepairList");
      const addList = action.value;
      let _delItem = [];
      if (_list) {
        _delItem = _delItem.concat(_list);
      }
      _delItem = _delItem.concat(addList);
      console.log(_delItem);
      return state.set('deleteRepairList', _delItem);
    case constants.UPDATE_TECHSAFE_LIST:
      return state.set('updateTechSafeList', action.value);
    case constants.UPDATE_TECHSAFE_LIST_DELETE:
      return state.set('updateTechSafeList', action.value);
    case constants.DELETE_TECHSAFE_LIST:
      const _tList = state.get("deleteTechSafeList");
      const addTList = action.value;
      let _tdelItem = [];
      if (_tList) {
        _tdelItem = _tdelItem.concat(_tList);
      }
      _tdelItem = _tdelItem.concat(addTList);
      console.log(_tdelItem);
      return state.set('deleteTechSafeList', _tdelItem);
    case constants.UPDATE_SAFEWORK_LIST:
      return state.set('updateSafeWorkList', action.value);
    case constants.UPDATE_SAFEWORK_LIST_DELETE:
      return state.set('updateSafeWorkList', action.value);
    case constants.DELETE_SAFEWORK_LIST:
      const _sList = state.get("deleteSafeWorkList");
      const addSList = action.value;
      let _sdelItem = [];
      if (_sList) {
        _sdelItem = _sdelItem.concat(_sList);
      }
      _sdelItem = _sdelItem.concat(addSList);
      console.log(_sdelItem);
      return state.set('deleteSafeWorkList', _sdelItem);
    case constants.SEARCH_UNIT_PARAM:
      return state.set('searchUnitList', action.value);  
    case constants.SEARCH_TYPE_PARAM:
      return state.set('searchTypeList', action.value);  
    case constants.SEARCH_CAUSE_PARAM:
      return state.set('searchCauseList', action.value);  
    case constants.SEARCH_PART_PARAM:
      return state.set('searchPartList', action.value);
    case constants.SAVE_SAFEWORK_POPUP_DATA:
      return state.set('safeWorkPopData', action.value);
    case constants.SAVE_BTN_TYPE:
      return state.set('btnType', action.value);
    default:
      return state;
  }
};

export default pmsheetReducer;
