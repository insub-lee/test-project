import * as actionTypes from './constants';

const getView = width => {
  let newView = 'MobileView';
  if (width > 1024) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
};

export const toggleCollapseSidebar = () => ({
  type: actionTypes.TOGGLE_COLLAPSE_SIDEBAR,
});

export const toggleAll = (width, height) => {
  const view = getView(width);
  return {
    type: actionTypes.TOGGLE_ALL,
    collapsed: view !== 'DesktopView',
    view,
    height,
  };
};

export const deleteDock = () => ({
  type: actionTypes.DELETE_MAIN_DOCK,
});

export const enableSpinnerShow = () => ({
  type: actionTypes.ENABLE_SPINNER_SHOW,
});

export const disableSpinnerShow = () => ({
  type: actionTypes.DISABLE_SPINNER_SHOW,
});

export const enableFullscreen = () => ({
  type: actionTypes.ENABLE_FULLSCREEN,
});

export const disableFullscreen = () => ({
  type: actionTypes.DISABLE_FULLSCREEN,
});

export const enableMakingApp = () => ({
  type: actionTypes.ENABLE_MAKING_APP,
});

export const disableMakingApp = () => ({
  type: actionTypes.DISABLE_MAKING_APP,
});

export const openUserCategoryMenu = () => ({
  type: actionTypes.OPEN_USER_CATEGORY_MENU,
});

export const closeUserCategoryMenu = () => ({
  type: actionTypes.CLOSE_USER_CATEGORY_MENU,
});

export const toggleUserCategoryMenu = () => ({
  type: actionTypes.TOGGLE_USER_CATEGORY_MENU,
});

export const openMenuCategory = () => ({
  type: actionTypes.OPEN_MENU_CATEGORY,
});

export const closeMenuCategory = () => ({
  type: actionTypes.CLOSE_MENU_CATEGORY,
});

export const setCount = count => ({
  type: actionTypes.SET_COUNT,
  count,
});

export const openDockContextMenu = dockId => ({
  type: actionTypes.OPEN_DOCK_CONTEXT_MENU,
  dockId,
});

export const closeDockContextMenu = dockId => ({
  type: actionTypes.CLOSE_DOCK_CONTEXT_MENU,
  dockId,
});

export const resetDate = () => ({
  type: actionTypes.RESET_DATA,
});

export const openRodal = () => ({
  type: actionTypes.OPEN_RODAL,
});

export const closeRodal = () => ({
  type: actionTypes.CLOSE_RODAL,
});


