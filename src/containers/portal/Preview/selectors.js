import { createSelector } from 'reselect';

const selectPortalAuth = state => state.get('auth').toJS();
const selectView = state => state.get('common').toJS();
const selectPortal = state => state.get('preview').toJS();

const makeSelectView = () => createSelector(
  selectView,
  viewState => viewState.view,
);

const makeSelectSkin = () => createSelector(
  selectPortal,
  portalState => portalState.mySkin,
);

const makeSelectMyMenuData = () => createSelector(
  selectPortal,
  portalState => portalState.setMyMenuData,
);

const makeSelectApps = () => createSelector(
  selectPortal,
  portalState => portalState.selectedApp,
);

const makeSelectSetMyMenuNodeData = () => createSelector(
  selectPortal,
  portalState => portalState.setMyMenuNodeData,
);

const makeSelectSelectedIndex = () => createSelector(
  selectPortal,
  portalState => portalState.selectedIndex,
);

const makeSelectMenuName = () => createSelector(
  selectPortal,
  portalState => portalState.menuName,
);

const makeSelectManagerInfo = () => createSelector(
  selectPortal,
  portalState => portalState.managerInfo,
);

export {
  selectPortalAuth,
  makeSelectView,
  makeSelectSkin,
  makeSelectMyMenuData,
  makeSelectApps,
  makeSelectSelectedIndex,
  makeSelectMenuName,
  makeSelectManagerInfo,
  makeSelectSetMyMenuNodeData,
};
