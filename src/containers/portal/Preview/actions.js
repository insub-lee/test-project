import * as actionType from './constants';

export const loadSkin = () => ({
  type: actionType.LOAD_SKIN_SAGA,
});

export const execApps = (pageID, node) => ({
  type: actionType.EXEC_APPS_SAGA,
  pageID,
  node,
});

// Dock Data
export const getInitialPortalPage = PAGE_ID => ({
  type: actionType.GET_INITIAL_PORTALPAGE,
  PAGE_ID,
});

export const getNotify = () => ({
  type: actionType.GET_ISNOTIFY,
});
