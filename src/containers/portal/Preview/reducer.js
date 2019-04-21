import { fromJS } from 'immutable';
import update from 'react-addons-update';
import * as actionType from './constants';

const initialState = fromJS({
  dockAppList: [],
  selectedApp: [],
  isUnfixDockItem: false,

  // 메뉴 트리에서 현재 실행중인 Mdi와의 동기화를 위해 필요한 데이터
  selectedIndex: '-1',
  menuName: '',
  managerInfo: undefined,

  dockFixedYn: undefined,
  dockIconType: undefined,

  mySkin: undefined,
  myHNotiCnt: '',
  myMNotiCnt: '',
  myMNotiList: [],
  setBizHome: [],
  isUnreadCnt: [],
});

const portalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOAD_SKIN_REDUCER:
      return state.set('mySkin', action.resultValue.settingList[0]);
    case actionType.SET_HEADERNOTICNT_SUCCESS:
      return state.set('myHNotiCnt', action.resultValue.resultCnt);
    case actionType.SET_MYMENUNOTICNT_SUCCESS:
      return state.set('myMNotiCnt', action.resultValue.resultCnt);
    case actionType.SET_MYMENUNOTNOTILIST_SUCCESS:
      return state.set('myMNotiList', action.resultValue.list);
    case actionType.EXEC_APPS_SUCCESS:
      return state.set('selectedApp', action.resultValue).set('setMyMenuData', action.node);
    case actionType.RESET_EXEC_APPS_SUCCESS:
      return state.set('selectedApp', action.resultValue);
    case actionType.RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS:
      return state.set('selectedApp', action.resultValue).set('isUnreadCnt', action.isUnreadCnt);
    case actionType.EXEC_APPS_FAIL:
      return state;
    case actionType.SET_DOCKAPPLIST:
      return state.set('dockAppList', action.dockAppList).set('dockFixedYn', action.dockFixedYn).set('dockIconType', action.dockIconType);
    case actionType.DND_CHANGE_POSITION: {
      const { appDockId } = action.payload;
      const { afterDockId } = action.payload;

      if (appDockId !== afterDockId) {
        const appIndex = state.get('dockAppList').findIndex(app => app.DOCK_ID === appDockId);
        const app = state.get('dockAppList')[appIndex];
        const afterIndex = state.get('dockAppList').findIndex(app2 => app2.DOCK_ID === afterDockId);
        const result = update(state.toJS(), {
          dockAppList: {
            $splice: [
              [appIndex, 1],
              [afterIndex, 0, app],
            ],
          },
        });
        return state.set('dockAppList', result.dockAppList);
      }
      break;
    }
    case actionType.DND_CHANGE_POSITION_DROP: {
      return state.set('dockAppList', action.payload);
    }
    case actionType.EXEC_DOCKITEM: {
      return state.set('dockAppList', action.payload);
    }
    case actionType.EXIT_DOCKITEM: {
      const { dockAppListUpdate, setTopFlag } = action.payload;

      if (setTopFlag) {
        return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', true);
      }

      return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', false);
    }
    case actionType.FIX_DOCKITEM: {
      return state.set('dockAppList', action.payload);
    }
    case actionType.UNFIX_DOCKITEM: {
      const { dockAppListUpdate, setTopFlag } = action.payload;

      if (setTopFlag) {
        return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', true);
      }

      return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', false);
    }
    case actionType.LOADING_DOCKITEM_SUCCESS: {
      return state.set('dockAppList', action.payload);
    }
    case actionType.SET_ISUNFIXDOCKITEM: {
      return state.set('isUnfixDockItem', false);
    }
    case actionType.RECEIVE_MYMENU_DATA_SUCCESS: {
      return state.set('setMyMenuNodeData', action.payload)
        .set('selectedIndex', action.selectedIndex)
        .set('menuName', action.menuName)
        .set('managerInfo', action.managerInfo);
    }
    case actionType.SET_BIZHOME_SUCCESS:
      return state.set('setBizHome', action.resultValue);
    case actionType.SET_BIZHOME_FAIL:
      return state;
    case actionType.SET_MENUNAME_SELECTEDINDEX:
      return state.set('menuName', action.menuName).set('selectedIndex', action.selectedIndex);
    case actionType.SET_DOCK_FIXED_YN:
      return state.set('dockFixedYn', action.dockFixedYn);
    case actionType.SET_DOCK_ICON_TYPE:
      return state.set('dockIconType', action.dockIconType);
    case actionType.SET_MANAGERINFO:
      return state.set('managerInfo', action.managerInfo);
    default:
      return state;
  }
  return state;
};

export default portalReducer;
