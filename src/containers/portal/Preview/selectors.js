import { createSelector } from 'reselect';

const selectPortalAuth = state => state.get('auth').toJS();
const selectView = state => state.get('hynix.common').toJS();
const selectPortalLanguage = state => state.get('language').toJS();
const selectPortal = state => state.get('preview').toJS();

const makeSelectProfile = () => createSelector(
  selectPortalAuth,
  portalState => portalState.profile,
);

const makeSelectLocale = () => createSelector(
  selectPortalLanguage,
  portalState => portalState.locale,
);

const makeSelectView = () => createSelector(
  selectView,
  viewState => viewState.view,
);

const makeSelectSkin = () => createSelector(
  selectPortal,
  portalState => portalState.mySkin,
);

const makeSelectHNotiCnt = () => createSelector(
  selectPortal,
  portalState => portalState.myHNotiCnt,
);

const makeSelectMNotiCnt = () => createSelector(
  selectPortal,
  portalState => portalState.myMNotiCnt,
);

const makeSelectMNotiList = () => createSelector(
  selectPortal,
  portalState => portalState.myMNotiList,
);

const makeSelectMyMenuData = () => createSelector(
  selectPortal,
  portalState => portalState.setMyMenuData,
);

const makeSelectApps = () => createSelector(
  selectPortal,
  portalState => portalState.selectedApp,
);

const makeSelectDockAppList = () => createSelector(
  selectPortal,
  portalState => portalState.dockAppList,
);

const makeSelectIsUnfixDockItem = () => createSelector(
  selectPortal,
  portalState => portalState.isUnfixDockItem,
);

const makeSelectSetMyMenuNodeData = () => createSelector(
  selectPortal,
  portalState => portalState.setMyMenuNodeData,
);

const makeSelectSetBizHome = () => createSelector(
  selectPortal,
  portalState => portalState.setBizHome,
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

const makeSelectDockFixedYn = () => createSelector(
  selectPortal,
  portalState => portalState.dockFixedYn,
);

const makeSelectDockIconType = () => createSelector(
  selectPortal,
  portalState => portalState.dockIconType,
);

// const makeSelectIsNotify = () => createSelector(
//   selectPortal,
//   portalState => portalState.isNotify,
// );

const makeUnreadCnt = () => createSelector(
  selectPortal,
  portalState => portalState.isUnreadCnt,
);

export {
  selectPortalAuth,
  makeSelectProfile,
  makeSelectView,
  makeSelectLocale,
  makeSelectSkin,
  makeSelectHNotiCnt,
  makeSelectMNotiCnt,
  makeSelectMNotiList,
  makeSelectMyMenuData,
  makeSelectApps,
  makeSelectSetBizHome,
  makeSelectSelectedIndex,
  makeSelectMenuName,
  makeSelectManagerInfo,
  makeUnreadCnt,

  // Dock Data
  makeSelectDockAppList,
  makeSelectIsUnfixDockItem,
  makeSelectSetMyMenuNodeData,
  makeSelectDockFixedYn,
  makeSelectDockIconType,
};
