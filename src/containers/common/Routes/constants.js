export const WINDOW_RESIZE = 'common/WINDOW_RESIZE';
export const WINDOW_RELOAD = 'common/WINDOW_RELOAD';
export const COMMON_NOTIFY = 'notify/COMMON_NOTIFY';
export const COMMON_NOTIFY_RESET = 'notify/COMMON_NOTIFY_RESET';

export const DEFAULT_LOCALE = 'ko';
export const AUTH_REQUEST = 'portal/container/App/AUTH_REQUEST';
export const AUTH_REQUEST_UUID = 'portal/container/App/AUTH_REQUEST_UUID';
export const AUTH_RECONNECT_UUID = 'portal/container/App/AUTH_RECONNECT_UUID';
export const AUTH_SUCCESS = 'portal/container/App/AUTH_SUCCESS';
export const AUTH_SUCCESS_SAGA = 'portal/container/App/AUTH_SUCCESS_SAGA';
export const AUTH_REQUEST_ERROR = 'portal/container/App/AUTH_REQUEST_ERROR';
export const AUTH_CHECK = 'portal/container/App/AUTH_CHECK';
export const AUTH_LOGOUT = 'portal/container/App/AUTH_LOGOUT';
export const AUTH_LOADING = 'portal/container/App/AUTH_LOADING';
export const SESSION_CHECK = 'portal/container/App/SESSION_CHECK';
export const CHANGE_LANG = 'portal/container/App/CHANGE_LANG';

export const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';

export const UNREAD_CNT_UPDATE = 'portal/container/app/UNREAD_CNT_UPDATE';

// 1. 포탈로 접속시 로딩에 필요한 상수 ******************
// 1-1 getInitialPortalPage
export const GET_INITIAL_PORTALPAGE = 'containers/common/Routes/GET_INITIAL_PORTALPAGE';
export const SET_BIZHOME_SUCCESS = 'containers/common/Routes/SET_BIZHOME_SUCCESS';
export const SET_BIZHOME_FAIL = 'containers/common/Routes/SET_BIZHOME_FAIL';
export const RECEIVE_MYMENU_DATA_SAGA = 'containers/common/Routes/RECEIVE_MYMENU_DATA_SAGA';
export const RECEIVE_MYMENU_DATA_SUCCESS = 'containers/common/Routes/RECEIVE_MYMENU_DATA_SUCCESS';
export const RECEIVE_MYMENU_DATA_FAIL = 'containers/common/Routes/RECEIVE_MYMENU_DATA_FAIL';
export const COMMON_DOCK_LOADING_UNREADCNT = 'containers/common/Routes/COMMON_DOCK_LOADING_UNREADCNT';
export const SET_DOCKAPPLIST = 'containers/common/Routes/SET_DOCKAPPLIST';
export const SET_PORTAL_MENU_TYPE_CODE = 'containers/common/Routes/SET_PORTAL_MENU_TYPE_CODE';

// 1-2 loadSkin
export const LOAD_SKIN_SAGA = 'containers/common/Routes/LOAD_SKIN_SAGA';
export const LOAD_SKIN_REDUCER = 'container/portal/App/LOAD_SKIN_REDUCER';

// 1-3 getNotiMCnt
export const GET_MYMENUNOTICNT_SAGA = 'containers/common/Routes/GET_MYMENUNOTICNT_SAGA';
export const SET_MYMENUNOTICNT_SUCCESS = 'containers/common/Routes/SET_MYMENUNOTICNT_SUCCESS';

// 1-4 getNotiMList
export const GET_MYMENUNOTILIST_SAGA = 'containers/common/Routes/GET_MYMENUNOTILIST_SAGA';
export const SET_MYMENUNOTNOTILIST_SUCCESS = 'containers/common/Routes/SET_MYMENUNOTNOTILIST_SUCCESS';

// 1-5
export const GET_ISNOTIFY = 'containers/common/Routes/GET_ISNOTIFY';
export const SET_ISNOTIFY = 'containers/common/Routes/SET_ISNOTIFY';
// 포탈로 접속시 로딩에 필요한 상수 끝 ******************

// 2. 독 실행/고정/이동 관련 상수 ******************
// 2-1 execDockItem
export const EXEC_DOCKITEM_SAGA = 'containers/common/Routes/EXEC_DOCKITEM_SAGA';
export const EXEC_DOCKITEM = 'containers/common/Routes/EXEC_DOCKITEM';

// 2-2 dockSetMyMenuData
// 1-1의 RECEIVE_MYMENU_DATA_SAGA, RECEIVE_MYMENU_DATA_SUCCESS, RECEIVE_MYMENU_DATA_FAIL

// 2-3 exitDockItem
export const EXIT_DOCKITEM_SAGA = 'containers/common/Routes/EXIT_DOCKITEM_SAGA';
export const EXIT_DOCKITEM = 'containers/common/Routes/EXIT_DOCKITEM';
export const EXEC_APPS_SAGA = 'containers/common/Routes/EXEC_APPS_SAGA';
export const SET_MENUNAME_SELECTEDINDEX = 'containers/common/Routes/SET_MENUNAME_SELECTEDINDEX';
export const EXEC_APPS_SUCCESS = 'containers/common/Routes/EXEC_APPS_SUCCESS';
export const EXEC_APPS_FAIL = 'containers/common/Routes/EXEC_APPS_FAIL';

// 2-4 fixDockItem
export const FIX_DOCKITEM_SAGA = 'containers/common/Routes/FIX_DOCKITEM_SAGA';
export const FIX_DOCKITEM = 'containers/common/Routes/FIX_DOCKITEM';

// 2-5 unfixDockItem
export const UNFIX_DOCKITEM_SAGA = 'containers/common/Routes/UNFIX_DOCKITEM_SAGA';
export const UNFIX_DOCKITEM = 'containers/common/Routes/UNFIX_DOCKITEM';

// 2-6
export const DND_CHANGE_POSITION = 'containers/common/Routes/DND_CHANGE_POSITION';

// 2-7
export const DND_CHANGE_POSITION_DROP_SGAG = 'containers/common/Routes/DND_CHANGE_POSITION_DROP_SGAG';
export const DND_CHANGE_POSITION_DROP = 'containers/common/Routes/DND_CHANGE_POSITION_DROP';

// 2-8
export const SET_ISUNFIXDOCKITEM = 'containers/common/Routes/SET_ISUNFIXDOCKITEM';

// 2. 독 실행/고정/이동 관련 상수 끝 ******************

// 3. 메뉴 실행 관련 상수 ******************
// 3-1
export const EXEC_MENU = 'containers/common/Routes/EXEC_MENU';
export const SET_MANAGERINFO = 'containers/common/Routes/SET_MANAGERINFO';
export const LOADING_DOCKITEM_SUCCESS = 'containers/common/Routes/LOADING_DOCKITEM_SUCCESS';
// 3. 메뉴 실행 관련 상수 끝 ******************

// 5. 독 설정 관련 상수 ******************
// 5-1
export const SET_DOCK_FIXED_YN_SAGA = 'containers/common/Routes/SET_DOCK_FIXED_YN_SAGA';
export const SET_DOCK_FIXED_YN = 'containers/common/Routes/SET_DOCK_FIXED_YN';

// 5-2
export const SET_DOCK_ICON_TYPE_SAGA = 'containers/common/Routes/SET_DOCK_ICON_TYPE_SAGA';
export const SET_DOCK_ICON_TYPE = 'containers/common/Routes/SET_DOCK_ICON_TYPE';
// 5. 독 설정 관련 상수 끝 ******************

// 6. 서버 푸시(공통) ******************
export const RESET_EXEC_APPS_SUCCESS = 'containers/common/Routes/RESET_EXEC_APPS_SUCCESS';
export const RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS = 'containers/common/Routes/RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS';
// 6. 서버 푸시(공통) 끝 ******************

// 7. 마이 메뉴 관련 상수 ******************
// 7-1
export const GET_MYAPP_TREE_SAGA = 'containers/common/Routes/GET_MYAPP_TREE_SAGA';
export const SET_MYAPP_TREE_NOTI = 'containers/common/Routes/SET_MYAPP_TREE_NOTI';
export const SET_MYAPP_TREE = 'containers/common/Routes/SET_MYAPP_TREE';
export const SET_MYAPP_TREE_FAIL = 'containers/common/Routes/SET_MYAPP_TREE_FAIL';

// 7-2
export const SAVE_DATA = 'containers/common/Routes/SAVE_DATA';

// 7-3
export const RESET_MYAPP_TREE = 'containers/common/Routes/RESET_MYAPP_TREE';

// 7-4
export const GET_MYAPP_STORE_TREE_SAGA = 'containers/common/Routes/GET_MYAPP_STORE_TREE_SAGA';
export const SET_MYAPP_STORE_TREE = 'containers/common/Routes/SET_MYAPP_STORE_TREE';

// 7-5
export const MOVE_MYMENU = 'containers/common/Routes/MOVE_MYMENU';
export const UPDATE_MYMENU_DISP = 'containers/common/Routes/UPDATE_MYMENU_DISP';

// 7. 마이 메뉴 관련 상수 끝 ******************

// 8. history.action === 'POP'일 때, 데이터 로딩 ******************
// 8-1
export const GET_LOADDATA_SAGA = 'containers/common/Routes/GET_LOADDATA_SAGA';
export const GET_LOADDATA = 'containers/common/Routes/GET_LOADDATA';
// 8. history.action === 'POP'일 때, 데이터 로딩 끝 ******************
export const RELOAD_EXEC_MENU_SAGA = 'RELOAD_EXEC_MENU_SAGA';
export const EXIT_AFTER_EXEC_MENU_SAGA = 'EXIT_AFTER_EXEC_MENU_SAGA';

export const EXEC_APP_SAGA = 'containers/common/Routes/EXEC_APP_SAGA';
export const EXEC_APP = 'containers/common/Routes/EXEC_APP';

// 최초 apps 만들기!!!!!!!!!!!!!
export const GET_DATA_FOR_APPS_SAGA = 'containers/common/Routes/GET_DATA_FOR_APPS_SAGA';
export const GET_DATA_FOR_APPS = 'containers/common/Routes/GET_DATA_FOR_APPS';

// 메뉴 및 독 정보 저장
export const SET_MENU_AND_DOCK_DATA = 'containers/common/Routes/SET_MENU_AND_DOCK_DATA';

// apps를 스토어에 저장
export const SAVE_APPS = 'containers/common/Routes/SAVE_APPS';

export const SET_SELECTEDAPP_APPS = 'containers/common/Routes/SET_SELECTEDAPP_APPS';

export const GET_SINGLEMODE_LOADDATA_SAGA = 'container/common/Routes/GET_SINGLEMODE_LOADDATA_SAGA';

// 9. 공통 메뉴 관련 상수 ******************
// 9-1
export const GET_COMMON_MENU_TREE_SAGA = 'containers/common/Routes/GET_COMMON_MENU_TREE_SAGA';
export const SET_COMMON_MENU_TREE = 'containers/common/Routes/SET_COMMON_MENU_TREE';
// 9. 마이 메뉴 관련 상수 끝 ******************

export const RESET_LAST_EXEC_YN = 'containers/common/Routes/RESET_LAST_EXEC_YN';

export const UPDATE_MENU_FIXED_YN = 'containers/common/Routes/UPDATE_MENU_FIXED_YN';
export const SET_MENU_FIXED_YN = 'containers/common/Routes/SET_MENU_FIXED_YN';
// REMOVE DOCK - 공통홈, 개인홈 페이지 ID
export const SET_HOME_ROOT_PAGE = 'containers/common/Routes/SET_HOME_ROOT_PAGE';
