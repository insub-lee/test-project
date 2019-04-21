import * as actionType from './constants';

const getView = (width) => {
  let newView = 'MobileView';
  if (width > 1023) {
    newView = 'DesktopView';
  } else if (width > 649) {
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
