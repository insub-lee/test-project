import { fromJS } from 'immutable';
import update from 'react-addons-update';

import * as constants from './constants';
import { getView } from './actions';

const initialState = fromJS({
  view: getView(window.innerWidth),

  dockAppList: [],
  selectedApp: [],
  isUnfixDockItem: false,

  // 메뉴 트리에서 현재 실행중인 Mdi와의 동기화를 위해 필요한 데이터
  selectedIndex: -1,
  menuName: '',
  managerInfo: undefined,

  dockFixedYn: undefined,
  dockIconType: undefined,

  mySkin: undefined,
  myHNotiCnt: 0,
  myMNotiCnt: 0,
  myMNotiList: [],
  setBizHome: [],
  isUnreadCnt: [],

  setMyMenuNodeData: undefined,

  myAppTreeData: [],
  myAppStoreTreeData: [],

  dataForApps: undefined,
  apps: [],

  // 마지막에 종료/실행한 독의 페이지아이디
  deletedDockPageId: undefined,
  executedDockPageId: undefined,
});

const windowResizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.WINDOW_RESIZE:
      if (state.get('view') !== action.view || state.get('view') === 'Tablet' || state.get('view') === 'Mobile') {
        return state.set('view', action.view);
      }
      return state;

    // . 포탈로 접속시 로딩에 필요한 액션 ******************
    // 1-1 getInitialPortalPage
    case constants.SET_BIZHOME_SUCCESS:
      return state.set('setBizHome', action.resultValue);
    case constants.SET_BIZHOME_FAIL:
      return state;
    case constants.RECEIVE_MYMENU_DATA_SUCCESS:
      return state.set('setMyMenuData', action.payload)
        .set('selectedIndex', action.selectedIndex)
        .set('menuName', action.menuName)
        .set('managerInfo', action.managerInfo);
    case constants.SET_DOCKAPPLIST:
      return state.set('dockAppList', action.dockAppList)
        .set('dockFixedYn', action.dockFixedYn)
        .set('dockIconType', action.dockIconType);
    // 1-2 loadSkin
    case constants.LOAD_SKIN_REDUCER:
      return state.set('mySkin', action.resultValue.settingList[0]);
    // 1-3 getNotiMCnt
    // case constants.SET_MYMENUNOTICNT_SUCCESS:
    //   return state.set('myMNotiCnt', action.a);
    // 1-4
    case constants.SET_MYMENUNOTNOTILIST_SUCCESS:
      return state.set('myMNotiList', action.notiList)
        .set('myMNotiCnt', action.unreadS)
        .set('isUnreadCnt', []);
    // 포탈로 접속시 로딩에 필요한 액션 끝 ******************

    // 2. 독 실행/고정/이동 관련 액션 ******************
    // 2-1
    case constants.EXEC_DOCKITEM:
      return state.set('dockAppList', action.payload);
    // 2-3
    case constants.EXIT_DOCKITEM: {
      const { setTopFlag } = action.payload;

      if (setTopFlag) {
        return state.set('isUnfixDockItem', true);
      }

      return state.set('isUnfixDockItem', false);
    }
    case constants.EXEC_APPS_FAIL:
      return state;
    case constants.EXEC_APPS_SUCCESS:
      return state.set('selectedApp', fromJS(action.resultValue));
    case constants.SET_MENUNAME_SELECTEDINDEX:
      return state.set('menuName', action.menuName).set('selectedIndex', action.selectedIndex);

    // 2-4
    case constants.FIX_DOCKITEM:
      return state.set('dockAppList', action.payload);

    // 2-5
    case constants.UNFIX_DOCKITEM: {
      const { dockAppListUpdate, setTopFlag } = action.payload;

      if (setTopFlag) {
        return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', true);
      }

      return state.set('dockAppList', dockAppListUpdate).set('isUnfixDockItem', false);
    }

    // 2-6
    case constants.DND_CHANGE_POSITION: {
      const { appDockId, afterDockId } = action;

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
      return state;
    }

    // 2-7
    case constants.DND_CHANGE_POSITION_DROP:
      return state.set('dockAppList', action.payload);

    // 2-8
    case constants.SET_ISUNFIXDOCKITEM:
      return state.set('isUnfixDockItem', false);
    // 2. 독 실행/고정/이동 관련 액션 끝 ******************

    // 3. 메뉴 실행 관련 액션 ******************
    // 3-1
    case constants.SET_MANAGERINFO:
      return state.set('managerInfo', action.managerInfo);
    case constants.LOADING_DOCKITEM_SUCCESS: {
      return state.set('dockAppList', action.payload)
        .set('setMyMenuData', action.node);
    }
    // 3. 메뉴 실행 관련 액션 끝 ******************

    // 5. 독 설정 관련 액션 ******************
    // 5-1
    case constants.SET_DOCK_FIXED_YN:
      return state.set('dockFixedYn', action.dockFixedYn);
    // 5-2
    case constants.SET_DOCK_ICON_TYPE:
      return state.set('dockIconType', action.dockIconType);
    // 5. 독 설정 관련 액션 끝 ******************
    // 6. 서버 푸시(공통) ******************
    case constants.RESET_EXEC_APPS_SUCCESS:
      return state.set('selectedApp', fromJS(action.resultValue))
        .set('isUnreadCnt', action.isUnreadCnt)
        .set('apps', action.apps);
    case constants.RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS:
      return state.set('selectedApp', fromJS(action.resultValue))
        .set('isUnreadCnt', action.isUnreadCnt)
        .set('apps', action.apps);
    // 6. 서버 푸시(공통) 끝 ******************

    // 7. 마이 메뉴 관련 액션 ******************
    // 7-1
    case constants.SET_MYAPP_TREE_NOTI:
      return state.set('myAppTreeData', action.myAppTreeData ? action.myAppTreeData : fromJS({})).set('open', true);
    case constants.SET_MYAPP_TREE:
      return state.set('myAppTreeData', action.myAppTreeData ? action.myAppTreeData : fromJS({}));
    case constants.SET_MYAPP_TREE_FAIL:
      return state;
    // 7-2
    case constants.SAVE_DATA:
      return state.set('myAppTreeData', action.myAppTreeData).set('tempNode', action.node);
    // 7-3
    case constants.RESET_MYAPP_TREE:
      return state.set('myAppTreeData', action.myAppTreeData ? action.myAppTreeData : fromJS({}))
        .set('myAppStoreTreeData', action.myAppStoreTreeData ? action.myAppStoreTreeData : fromJS({}));
    // 7-4
    case constants.SET_MYAPP_STORE_TREE:
      return state.set('myAppStoreTreeData', action.myAppStoreTreeData ? action.myAppStoreTreeData : fromJS({}));
    // 7. 마이 메뉴 관련 액션 끝 ******************
    case constants.EXEC_APP:
      return state.set('setMyMenuData', action.setMyMenuData).set('selectedApp', action.selectedApp)
        .set('managerInfo', action.managerInfo).set('selectedIndex', action.selectedIndex)
        .set('menuName', action.menuName);
    case constants.GET_DATA_FOR_APPS:
      return state.set('dataForApps', action.dataForApps);
    case constants.SET_MENU_AND_DOCK_DATA:
      console.log('### 2.메뉴 및 독 데이터 저장', action);
      if (action.executedDockPageId) {
        return state.set('setMyMenuData', action.setMyMenuData)
          .set('menuName', action.menuName)
          .set('selectedIndex', action.selectedIndex)
          .set('managerInfo', action.managerInfo)
          .set('dockAppList', action.dockAppList)
          .set('selectedApp', action.selectedApp)
          .set('executedDockPageId', action.executedDockPageId)
          .set('deletedDockPageId', undefined);
      }
      if (action.deletedDockPageId) {
        return state.set('setMyMenuData', action.setMyMenuData)
          .set('menuName', action.menuName)
          .set('selectedIndex', action.selectedIndex)
          .set('managerInfo', action.managerInfo)
          .set('dockAppList', action.dockAppList)
          .set('selectedApp', action.selectedApp)
          .set('deletedDockPageId', action.deletedDockPageId)
          .set('executedDockPageId', undefined);
      }
      return state.set('setMyMenuData', action.setMyMenuData)
        .set('menuName', action.menuName)
        .set('selectedIndex', action.selectedIndex)
        .set('managerInfo', action.managerInfo)
        .set('dockAppList', action.dockAppList)
        .set('selectedApp', action.selectedApp);
    case constants.SAVE_APPS:
      return state.set('apps', action.apps)
        .set('dataForApps', undefined)
        .set('setMyMenuData', action.setMyMenuData);
    case constants.SET_SELECTEDAPP_APPS:
      return state.set('selectedApp', fromJS(action.selectedApp))
        .set('apps', action.apps);
    default:
      return state;
  }
};

export default windowResizeReducer;
