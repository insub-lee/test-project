import { createSelector } from 'reselect';

const selectCommon = state => state.get('common');

const makeSelectView = () => createSelector(selectCommon, viewState => viewState.view);

const makeSelectDockAppList = () => createSelector(selectCommon, portalState => portalState.dockAppList);

const makeSelectDockFixedYn = () => createSelector(selectCommon, portalState => portalState.dockFixedYn);

const makeSelectDockIconType = () => createSelector(selectCommon, portalState => portalState.dockIconType);

const makeSelectHeaderTitle = () => createSelector(selectCommon, portalState => portalState.get('headerTitle'));

const makeSelectSetBizHome = () => createSelector(selectCommon, portalState => portalState.setBizHome);

const makeSelectSetMyMenuNodeData = () => createSelector(selectCommon, portalState => portalState.setMyMenuNodeData);

const makeSelectSelectedIndex = () => createSelector(selectCommon, portalState => portalState.selectedIndex);

const makeSelectMenuName = () => createSelector(selectCommon, portalState => portalState.menuName);

const makeSelectManagerInfo = () => createSelector(selectCommon, portalState => portalState.managerInfo);

const makeSelectSkin = () => createSelector(selectCommon, portalState => portalState.mySkin);

const makeSelectMNotiCnt = () => createSelector(selectCommon, portalState => portalState.myMNotiCnt);

const makeSelectIsUnfixDockItem = () => createSelector(selectCommon, portalState => portalState.isUnfixDockItem);

const makeSelectApps = () => createSelector(selectCommon, portalState => portalState.selectedApp);

const makeUnreadCnt = () => createSelector(selectCommon, portalState => portalState.isUnreadCnt);

const makeSelectMyMenuData = () => createSelector(selectCommon, portalState => portalState.setMyMenuData);

const makeMyAppTree = () => createSelector(selectCommon, portalState => portalState.get('myAppTreeData').toJS());

const makeMyAppStoreTree = () => createSelector(selectCommon, portalState => portalState.get('myAppStoreTreeData').toJS());

const makeCommonMenuTree = () => createSelector(selectCommon, portalState => portalState.get('commonMenuTreeData').toJS());

const makeSelectMenuFixedYn = () => createSelector(selectCommon, portalState => portalState.menuFixedYn);

// REMOVE DOCK - 공통홈, 개인홈 페이지 ID
const makeSelectRootPageId = () => createSelector(selectCommon, portalState => portalState.get('rootPageId'));

const makeSelectRootAppYn = () => createSelector(selectCommon, portalState => portalState.get('rootAppYn'));

const makeSelectMyHomePageID = () => createSelector(selectCommon, portalState => portalState.get('myHomePageId'));

export {
  makeSelectView,
  // 1-1
  makeSelectDockAppList,
  makeSelectDockFixedYn,
  makeSelectDockIconType,
  makeSelectHeaderTitle,
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
  // 9-1
  makeCommonMenuTree,
  makeSelectMenuFixedYn,
  // REMOVE DOCK - 공통홈, 개인홈 페이지 ID
  makeSelectRootPageId,
  makeSelectRootAppYn,
  makeSelectMyHomePageID,
};
