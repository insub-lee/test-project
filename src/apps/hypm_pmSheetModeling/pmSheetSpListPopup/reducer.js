import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  MaterialDataList: [],
  save: '',
  ModalDataList: [],
  pmBomTreeList: [],
});


const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_GRID_PARAM:
      return state.set('MaterialDataList', action.MaterialDataList)
        .set('ACTIVE', action.ACTIVE);
    case constants.LOADING_MODAL_PARAM:
      return state.set('ModalDataList', action.ModalDataList);
    case constants.LOADING_BOM_PARAM:
      return state.set('pmBomTreeList', action.pmBomTreeList).set('titleStr', action.titleStr);
      case constants.LOADING_SAVE_PARAM:
      return state.set('save', action.save);
    default:
      return state;
  }
};
export default pmsheetReducer;
