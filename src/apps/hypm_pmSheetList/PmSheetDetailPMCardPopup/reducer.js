import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  versionList: [],
  signStatusList: [],
  modelList: [],
  pmSheetDataList: [],
  informNoteListCBMSelectList: [],
  ownCompGrid: [],
  contractorGrid: [],
  result: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAM:
      return state.set('fabList', action.fabList)
        .set('versionList', action.versionList)
        .set('signStatusList', action.signStatusList);
    case constants.LOADING_GRID_PARAM:
      return state.set('ownCompGrid', action.ownCompGrid)
        .set('contractorGrid', action.contractorGrid)
        .set('result', action.result);
    default:
      return state;
  }
};
export default pmsheetReducer;
