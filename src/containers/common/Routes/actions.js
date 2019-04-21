import { fromJS } from 'immutable';
import * as constants from './constants';

export function getView(width) {
  let newView = 'Mobile';
  if (width > 1760) {
    newView = 'DesktopWide';
  } else if (width > 1460) {
    newView = 'Desktop';
  } else if (width > 1160) {
    newView = 'DesktopNarrow';
  } else if (width > 650) {
    newView = 'Tablet';
  }
  return newView;
}

export const windowResize = (width, height) => (
  {
    type: constants.WINDOW_RESIZE,
    view: getView(width),
    width,
    height,
  }
);

// 1. 포탈로 접속시 로딩에 필요한 액션 ******************
// 1-1 getInitalPortaPage
export const getInitialPortalPage = () => ({
  type: constants.GET_INITIAL_PORTALPAGE,
});

// 1-2 loadSkin
export const loadSkin = () => ({
  type: constants.LOAD_SKIN_SAGA,
});

// 1-3 getNotiMCnt
export const getNotiMCnt = () => ({
  type: constants.GET_MYMENUNOTICNT_SAGA,
});

// 1-4 getNotiMList
export const getNotiMList = () => ({
  type: constants.GET_MYMENUNOTILIST_SAGA,
});

// 1-5 getNotify
export const getNotify = () => ({
  type: constants.GET_ISNOTIFY,
});
// 포탈로 접속시 로딩에 필요한 액션 끝 ******************

// 2. 독 실행/고정/이동 관련 액션 ******************
// 2-1 execDockItem
export const execDockItem = dockId => ({
  type: constants.EXEC_DOCKITEM_SAGA,
  dockId,
});

// 2-2 dockSetMyMenuData
export const dockSetMyMenuData = (pageId, isHome) => ({
  type: constants.RECEIVE_MYMENU_DATA_SAGA,
  pageId,
  isHome,
});

// 2-3 exitDockItem
export const exitDockItem = dockId => ({
  type: constants.EXIT_DOCKITEM_SAGA,
  dockId,
});

// 2-4 fixDockItem
export const fixDockItem = dockId => ({
  type: constants.FIX_DOCKITEM_SAGA,
  dockId,
});

// 2-5 unfixDockItem
export const unfixDockItem = dockId => ({
  type: constants.UNFIX_DOCKITEM_SAGA,
  dockId,
});

// 2-6 dndChangePosition
export const dndChangePosition = (appDockId, afterDockId) => ({
  type: constants.DND_CHANGE_POSITION,
  appDockId,
  afterDockId,
});

// 2-7 dndChangePositionSaga
export const dndChangePositionSaga = () => ({
  type: constants.DND_CHANGE_POSITION_DROP_SGAG,
});

// 2-8 setIsUnfixDockItem
export const setIsUnfixDockItem = () => ({
  type: constants.SET_ISUNFIXDOCKITEM,
});
// 2. 독 실행/고정/이동 관련 액션 끝 ******************

// 3. 메뉴 실행 관련 액션 ******************
// 3-1 execMenu
export const execMenu = (PAGE_ID, TARGET) => ({
  type: constants.EXEC_MENU,
  PAGE_ID,
  TARGET,
});

// 3-2 setMenuNameSelectedIndex
// menuName은 NAME_OOO, selectedIndex는 MENU_ID
export const setMenuNameSelectedIndex = (menuName, selectedIndex) => ({
  type: constants.SET_MENUNAME_SELECTEDINDEX,
  menuName,
  selectedIndex,
});
// 3. 메뉴 실행 관련 액션 끝 ******************

// 4. 페이지 실행 관련 액션 ******************
export const execApps = node => ({
  type: constants.EXEC_APPS_SAGA,
  node,
});
// 4. 페이지 실행 관련 액션 끝 ******************

// 5. 독 설정 관련 액션 ******************
// 5-1 setDockFixedYn
export const setDockFixedYn = dockFixedYn => ({
  type: constants.SET_DOCK_FIXED_YN_SAGA,
  dockFixedYn,
});

// 5-2 setDockIconType
export const setDockIconType = dockIconType => ({
  type: constants.SET_DOCK_ICON_TYPE_SAGA,
  dockIconType,
});
// 5. 독 설정 관련 액션 끝 ******************

// 7. 마이 메뉴 관련 액션 ******************
// 7-1
export const getMyAppTree = () => ({
  type: constants.GET_MYAPP_TREE_SAGA,
});

// 7-2
export const saveData = (node, treeData) => ({
  type: constants.SAVE_DATA,
  node,
  myAppTreeData: fromJS(treeData),
});

// 7-5
export const moveNode = treeData => ({
  type: constants.MOVE_MYMENU,
  treeData,
});

export const updateMymenuDisp = node => ({
  type: constants.UPDATE_MYMENU_DISP,
  node,
});

// 7. 마이 메뉴 관련 액션 끝 ******************

// 8. history.action === 'POP'일 때, 데이터 로딩 ******************
// 8-1
/*
  path: 첫번째 경로(apps, page)
  param: PAGE_ID, SRC_PATH
  node: 메뉴에서 앱 실행 시 dock에 dockitem을 넣어주기 위해 가지고 가는 node 정보
*/
export const getLoaddata = (path, param, data) => ({
  type: constants.GET_LOADDATA_SAGA,
  path,
  param,
  data,
});
// 8. history.action === 'POP'일 때, 데이터 로딩 끝 ******************
export const reload = ITEM => ({
  type: constants.RELOAD_EXEC_MENU_SAGA,
  ITEM,
});

export const execApp = data => ({
  type: constants.EXEC_APP_SAGA,
  data,
});

// SESSION CHECK
export const checkSession = (ctype, payload) => ({
  type: constants.SESSION_CHECK,
  ctype,
  payload,
});

// 최초 apps 만들기!!!!!!!!!!!!!
export const getDataForApps = EXEC_PAGE_IDS => ({
  type: constants.GET_DATA_FOR_APPS_SAGA,
  EXEC_PAGE_IDS,
});

// apps를 스토어에 저장
export const saveApps = (apps, setMyMenuData) => ({
  type: constants.SAVE_APPS,
  apps,
  setMyMenuData,
});

export const setSelectedAppApps = (selectedApp, apps) => ({
  type: constants.SET_SELECTEDAPP_APPS,
  selectedApp,
  apps,
});

export const getSingleModeLoaddata = (path, param, data) => ({
  type: constants.GET_SINGLEMODE_LOADDATA_SAGA,
  path,
  param,
  data,
});
