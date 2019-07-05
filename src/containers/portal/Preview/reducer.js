import { fromJS } from 'immutable';
import * as actionType from './constants';

const initialState = fromJS({
  selectedApp: [],

  // 메뉴 트리에서 현재 실행중인 Mdi와의 동기화를 위해 필요한 데이터
  selectedIndex: '-1',
  menuName: '',
  managerInfo: undefined,

  mySkin: undefined,
});

const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOAD_SKIN_REDUCER:
      return state.set('mySkin', action.resultValue.settingList[0]);
    case actionType.EXEC_APPS_SUCCESS:
      return state.set('selectedApp', action.resultValue).set('setMyMenuData', action.node);
    case actionType.RECEIVE_MYMENU_DATA_SUCCESS: {
      return state.set('setMyMenuNodeData', action.payload)
        .set('selectedIndex', action.selectedIndex)
        .set('menuName', action.menuName)
        .set('managerInfo', action.managerInfo);
    }
    case actionType.EXEC_APPS_FAIL:
      return state;
    default:
      return state;
  }
};

export default portalReducer;
