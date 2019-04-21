export const DEFAULT_LOCALE = 'en';
export const TOGGLE_ALL = 'bizmicro-admin/containers/App/TOGGLE_ALL';
export const TOGGLE_COLLAPSE_SIDEBAR = 'bizmicro-admin/containers/App/TOGGLE_COLLAPSE_SIDEBAR';

export const EXEC_MENU = 'portal/app/EXEC_MENU';
export const EXEC_PAGE = 'portal/app/EXEC_PAGE';
export const EXEC_APPS_SAGA = 'portal/app/EXEC_APPS_SAGA';
export const EXEC_APPS_SUCCESS = 'portal/app/EXEC_APPS_SUCCESS';
export const RESET_EXEC_APPS_SUCCESS = 'RESET_EXEC_APPS_SUCCESS';
export const LOADING_DOCKITEM_SUCCESS = 'LOADING_DOCKITEM_SUCCESS';

export const LOAD_SKIN_SAGA = 'container/portal/App/LOAD_SKIN_SAGA';
export const LOAD_SKIN_REDUCER = 'container/portal/App/LOAD_SKIN_REDUCER';

export const GET_HEADERNOTICNT_SAGA = 'portal/app/GET_HEADERNOTICNT_SAGA';
export const SET_HEADERNOTICNT_SUCCESS = 'portal/app/SET_HEADERNOTICNT_SUCCESS';

export const GET_MYMENUNOTICNT_SAGA = 'portal/app/GET_MYMENUNOTICNT_SAGA';
export const SET_MYMENUNOTICNT_SUCCESS = 'portal/app/SET_MYMENUNOTICNT_SUCCESS';
export const GET_MYMENUNOTILIST_SAGA = 'portal/app/GET_MYMENUNOTILIST_SAGA';
export const SET_MYMENUNOTNOTILIST_SUCCESS = 'portal/app/SET_MYMENUNOTNOTILIST_SUCCESS';

// export const RESET_MYMENU_WIDGET_LIST = 'RESET_MYMENU_WIDGET_LIST';
export const EXEC_APPS_FAIL = 'EXEC_APPS_FAIL';

// Dock Data
export const GET_INITIAL_PORTALPAGE = 'containers/common/Routes/GET_INITIAL_PORTALPAGE';
export const SET_DOCKAPPLIST = 'containers/common/Routes/SET_DOCKAPPLIST';

// 드래그 앤 드랍
export const DND_CHANGE_POSITION = 'DND_CHANGE_POSITION';
export const DND_CHANGE_POSITION_DROP = 'DND_CHANGE_POSITION_DROP';
export const DND_CHANGE_POSITION_DROP_SGAG = 'DND_CHANGE_POSITION_DROP_SGAG';

// DockItem 실행 / 종료
export const EXEC_DOCKITEM = 'EXEC_DOCKITEM';
export const EXIT_DOCKITEM = 'EXIT_DOCKITEM';
export const EXEC_DOCKITEM_SAGA = 'EXEC_DOCKITEM_SAGA';
export const EXIT_DOCKITEM_SAGA = 'EXIT_DOCKITEM_SAGA';

// DockItem 고정 설정
export const FIX_DOCKITEM = 'FIX_DOCKITEM';
export const UNFIX_DOCKITEM = 'UNFIX_DOCKITEM';
export const FIX_DOCKITEM_SAGA = 'FIX_DOCKITEM_SAGA';
export const UNFIX_DOCKITEM_SAGA = 'UNFIX_DOCKITEM_SAGA';

// DockItem을 Dock에서 Unfix 했을 경우, store의 isUnfixDockItem 값이
// true가 되면서 ReactScrollbar의 setTop() 메소드 실행된다.
// 이후 다시 isUnfixDockItem값을 false로 바뀌게 하기 위한 action
export const SET_ISUNFIXDOCKITEM = 'SET_ISUNFIXDOCKITEM';

// my menu용
export const RECEIVE_MYMENU_DATA_SAGA = 'RECEIVE_MYMENU_DATA_SAGA';
export const RECEIVE_MYMENU_DATA_SUCCESS = 'RECEIVE_MYMENU_DATA_SUCCESS';
export const RECEIVE_MYMENU_DATA_FAIL = 'RECEIVE_MYMENU_DATA_FAIL';

export const SET_BIZHOME_SUCCESS = 'SET_BIZHOME_SUCCESS';
export const SET_BIZHOME_FAIL = 'SET_BIZHOME_FAIL';

// set menuName, selectedIndex : 메뉴에서 노드 선택 시 해당 노드의 메뉴명으로 설정
export const SET_MENUNAME_SELECTEDINDEX = 'portal/App/SET_MENUNAME_SELECTEDINDEX';

// Dock 고정 여부 변경하는 액션
export const SET_DOCK_FIXED_YN_SAGA = 'portal/App/SET_DOCK_FIXED_YN_SAGA';
export const SET_DOCK_FIXED_YN = 'portal/App/SET_DOCK_FIXED_YN';

// Dock 아이콘 크기 설정하는 액션
export const SET_DOCK_ICON_TYPE_SAGA = 'portal/App/SET_DOCK_ICON_TYPE_SAGA';
export const SET_DOCK_ICON_TYPE = 'portal/App/SET_DOCK_ICON_TYPE';

// 메뉴 클릭시 해당 메뉴가 앱을 경우 그 앱의 관리자 목록을 store에 저장
// 독 실행시에는 사가의 dockSetMyMenuData에서 저장
export const SET_MANAGERINFO = 'portal/App/SET_MANAGERINFO';

// Notify DOT Control
export const GET_ISNOTIFY = 'portal/App/GET_ISNOTIFY';
export const SET_ISNOTIFY = 'portal/App/SET_ISNOTIFY';

export const COMMON_DOCK_LOADING_UNREADCNT = 'COMMON_DOCK_LOADING_UNREADCNT';
// export const RESET_UNREAD_CNT_UPDATE_SUCCESS = 'portal/apps/RESET_UNREAD_CNT_UPDATE_SUCCESS';
export const RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS = 'RESET_EXEC_APPS_UNREAD_UPDATE_SUCCESS';

// setting dock 상태 삭제
export const DELETE_MAIN_DOCK = 'container/portal/App/DELETE_MAIN_DOCK';
