import * as actionType from './constants';

const getView = (width) => {
  let newView = 'MobileView';
  if (width > 1024) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
};

export const toggleCollapseSidebar = () => (
  {
    type: actionType.TOGGLE_COLLAPSE_SIDEBAR,
  }
);

export const toggleAll = (width, height) => {
  const view = getView(width);
  return (
    {
      type: actionType.TOGGLE_ALL,
      collapsed: view !== 'DesktopView',
      view,
      height,
    }
  );
};

// UserMenu에서 Menu 실행 (DockItem 추가 및 Page 띄워주기 ...)
export const execMenu = (PAGE_ID, TARGET) => (
  {
    type: actionType.EXEC_MENU,
    PAGE_ID,
    TARGET,
  }
);

export const loadSkin = () => (
  {
    type: actionType.LOAD_SKIN_SAGA,
  }
);

// export const getNotiHCnt = () => (
//   {
//     type: actionType.GET_HEADERNOTICNT_SAGA,
//   }
// );

export const getNotiMCnt = () => (
  {
    type: actionType.GET_MYMENUNOTICNT_SAGA,
  }
);

export const getNotiMList = () => (
  {
    type: actionType.GET_MYMENUNOTILIST_SAGA,
  }
);

export const execApps = (pageID, node) => (
  {
    type: actionType.EXEC_APPS_SAGA,
    pageID,
    node,
  }
);

// Dock Data
export const getInitialPortalPage = () => ({
  type: actionType.GET_INITIAL_PORTALPAGE,
});

export const dndChangePosition = (appDockId, afterDockId) => (
  {
    type: actionType.DND_CHANGE_POSITION,
    payload: {
      appDockId,
      afterDockId,
    },
  }
);

export const dndChangePositionSaga = () => (
  {
    type: actionType.DND_CHANGE_POSITION_DROP_SGAG,
  }
);

export const execDockItem = (dockId, userId) => (
  {
    type: actionType.EXEC_DOCKITEM_SAGA,
    payload: {
      dockId,
      userId,
    },
  }
);

export const exitDockItem = dockId => (
  {
    type: actionType.EXIT_DOCKITEM_SAGA,
    payload: {
      dockId,
    },
  }
);

export const fixDockItem = dockId => (
  {
    type: actionType.FIX_DOCKITEM_SAGA,
    payload: {
      dockId,
    },
  }
);

export const unfixDockItem = dockId => (
  {
    type: actionType.UNFIX_DOCKITEM_SAGA,
    payload: {
      dockId,
    },
  }
);

export const setIsUnfixDockItem = () => (
  {
    type: actionType.SET_ISUNFIXDOCKITEM,
  }
);

export const dockSetMyMenuData = (pageId, isHome) => (
  {
    type: actionType.RECEIVE_MYMENU_DATA_SAGA,
    pageId,
    isHome,
  }
);

// menuName은 NAME_OOO, selectedIndex는 MENU_ID
export const setMenuNameSelectedIndex = (menuName, selectedIndex) => (
  {
    type: actionType.SET_MENUNAME_SELECTEDINDEX,
    menuName,
    selectedIndex,
  }
);

export const setDockFixedYn = dockFixedYn => (
  {
    type: actionType.SET_DOCK_FIXED_YN_SAGA,
    dockFixedYn,
  }
);

export const setDockIconType = dockIconType => (
  {
    type: actionType.SET_DOCK_ICON_TYPE_SAGA,
    dockIconType,
  }
);

export const getNotify = () => (
  {
    type: actionType.GET_ISNOTIFY,
  }
);

export const deleteDock = () => (
  {
    type: actionType.DELETE_MAIN_DOCK,
  }
);
