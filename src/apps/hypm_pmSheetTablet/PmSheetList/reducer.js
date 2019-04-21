import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  teamList: [],
  sdptList: [],
  dataList: [],
  clonDataList: [],
  checked: false,
  sdptId: undefined,
  detailData: [],
  codePmList: [],
  userDefine: [],
  informId: '',
  pmSdptList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_TEAM_PARAM:
      return state.set('teamList', action.teamList);
    case constants.LOADING_SDPT_PARAM:
      return state.set('sdptList', action.sdptList)
        .set('sdptId', undefined);
    case constants.LOADING_DATA_PARAM:
      return state.set('dataList', action.dataList)
        .set('clonDataList', action.clonDataList);
    case constants.CHEKCBOX:
      return state.set('checked', action.status);
    case constants.SDPTID:
      return state.set('sdptId', action.value);
    case constants.LOADING_PMSHEET_DETAIL:
      return state.set('detailData', action.dataDetailList);
    case constants.LOADING_PMSHEET_CODE:
      return state.set('codePmList', action.codeList);
    case constants.GET_USER_COMPANY_DEFINE:
      return state.set('userDefine', action.define);
    case constants.SAVE_PMSHEET_INFORMNOTE_ID:
      return state.set('informId', action.id);
    case constants.LOADING_PMSHEET_SDPT:
     return state.set('pmSdptList', action.pmSdptList);
    default:
      return state;
  }
};
export default pmsheetReducer;
