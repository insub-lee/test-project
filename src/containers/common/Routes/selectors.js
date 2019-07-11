import { createSelector } from 'reselect';

const selectHynixCommon = state => state.get('hynix.common');

const makeSelectView = () => createSelector(
  selectHynixCommon,
  viewState => viewState.view,
);

const makeSelectDockAppList = () => createSelector(
  selectHynixCommon,
  portalState => portalState.dockAppList,
);

const makeSelectDockFixedYn = () => createSelector(
  selectHynixCommon,
  portalState => portalState.dockFixedYn,
);

const makeSelectDockIconType = () => createSelector(
  selectHynixCommon,
  portalState => portalState.dockIconType,
);

const makeSelectSetBizHome = () => createSelector(
  selectHynixCommon,
  portalState => portalState.setBizHome,
);

const makeSelectSetMyMenuNodeData = () => createSelector(
  selectHynixCommon,
  portalState => portalState.setMyMenuNodeData,
);

const makeSelectSelectedIndex = () => createSelector(
  selectHynixCommon,
  portalState => portalState.selectedIndex,
);

const makeSelectMenuName = () => createSelector(
  selectHynixCommon,
  portalState => portalState.menuName,
);

const makeSelectManagerInfo = () => createSelector(
  selectHynixCommon,
  portalState => portalState.managerInfo,
);

const makeSelectSkin = () => createSelector(
  selectHynixCommon,
  portalState => portalState.mySkin,
);

const makeSelectMNotiCnt = () => createSelector(
  selectHynixCommon,
  portalState => portalState.myMNotiCnt,
);

const makeSelectIsUnfixDockItem = () => createSelector(
  selectHynixCommon,
  portalState => portalState.isUnfixDockItem,
);

const makeSelectApps = () => createSelector(
  selectHynixCommon,
  portalState => portalState.selectedApp,
);

const makeUnreadCnt = () => createSelector(
  selectHynixCommon,
  portalState => portalState.isUnreadCnt,
);

const makeSelectMyMenuData = () => createSelector(
  selectHynixCommon,
  portalState => portalState.setMyMenuData,
);

const makeMyAppTree = () => createSelector(
  selectHynixCommon,
  portalState => portalState.get('myAppTreeData').toJS(),
);

const makeMyAppStoreTree = () => createSelector(
  selectHynixCommon,
  portalState => portalState.get('myAppStoreTreeData').toJS(),
);

export {
  makeSelectView,

  // 1-1
  makeSelectDockAppList,
  makeSelectDockFixedYn,
  makeSelectDockIconType,
  makeSelectSetBizHome,
  makeSelectSetMyMenuNodeData,
  makeSelectSelectedIndex,
  makeSelectMenuName,
  makeSelectManagerInfo,

  // 1-2
  makeSelectSkin,

  // 1-3
  makeSelectMNotiCnt,

  // 2-3
  makeSelectIsUnfixDockItem,
  makeSelectApps,
  makeSelectMyMenuData,

  // 7-1
  makeMyAppTree,
  makeUnreadCnt,

  makeMyAppStoreTree,
};
