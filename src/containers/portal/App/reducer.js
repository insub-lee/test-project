import { fromJS } from 'immutable';

import * as actionTypes from './constants';

const initialState = fromJS({
  isOpenUserCategoryMenu: false, // UserMenu Open Flag
  open: false, // UserMenu Open Flag
  isOpenMenuCategory: false, // MenuCategory Open Flag
  headerMenuOpen: false, // MenuCategory Open Flag
  isFullscreenEnabled: false, // FullScreen
  set: false, // no use...
  visible: false, // just toggle value
  show: false, // Control Rodal
  showRodal: false, // Control Rodal
  isClose: {}, // 모바일에서 Dock의 ContextMenu 닫기를 위한 플래그
  isSpinnerShow: false, // 스피너 상태
  count: 0, // 일단 카운트
  isMakingApps: false, // 메이킹 앱
});

const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_USER_CATEGORY_MENU:
      return state.set('isOpenUserCategoryMenu', true);
    case actionTypes.CLOSE_USER_CATEGORY_MENU:
      return state.set('isOpenUserCategoryMenu', false);
    case actionTypes.TOGGLE_USER_CATEGORY_MENU:
      return state.set('isOpenUserCategoryMenu', !state.get('isOpenUserCategoryMenu'));
    case actionTypes.OPEN_MENU_CATEGORY:
      return state.set('isOpenMenuCategory', true);
    case actionTypes.CLOSE_MENU_CATEGORY:
      return state.set('isOpenMenuCategory', false);
    case actionTypes.ENABLE_FULLSCREEN:
      return state.set('isFullscreenEnabled', true);
    case actionTypes.DISABLE_FULLSCREEN:
      return state.set('isFullscreenEnabled', false);
    case actionTypes.ENABLE_SPINNER_SHOW:
      return state.set('isSpinnerShow', true);
    case actionTypes.DISABLE_SPINNER_SHOW:
      return state.set('isSpinnerShow', false);
    case actionTypes.ENABLE_MAKING_APP:
      return state.set('isMakingApps', true);
    case actionTypes.DISABLE_MAKING_APP:
      return state.set('isMakingApps', false);
    case actionTypes.SET_COUNT: {
      const { count } = action;
      return state.set('count', count);
    }
    case actionTypes.OPEN_DOCK_CONTEXT_MENU: {
      const { dockId } = action;
      return state.setIn(['isClose', dockId], true);
    }
    case actionTypes.CLOSE_DOCK_CONTEXT_MENU: {
      const { dockId } = action;
      return state.setIn(['isClose', dockId], false);
    }
    case actionTypes.OPEN_RODAL:
      return state.set('showRodal', true);
    case actionTypes.CLOSE_RODAL:
      return state.set('showRodal', false);
    case actionTypes.RESET_DATA:
      return initialState;
    default:
      return state;
  }
};

export default portalReducer;
