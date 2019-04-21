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

export const deleteDock = () => (
  {
    type: actionType.DELETE_MAIN_DOCK,
  }
);
