import * as actionType from './constants';

const getView = (width) => {
  let newView = 'MobileView';
  if (width > 1220) {
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

export const changeSearchword = searchword => (
  {
    type: actionType.CHANGE_SEARCHWORD,
    searchword,
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

export const menuAuthChk = (pathname, history, SCRGRP_CD) => (
  {
    type: actionType.MENU_AUTH_CHK,
    payload: { pathname, history, SCRGRP_CD },
  }
);
