import { createSelector } from 'reselect';

// ****************** auth 스토어에서 가져오는 state ******************
const selectPortalAuth = state => state.get('auth').toJS();

const makeSelectProfile = () =>
  createSelector(
    selectPortalAuth,
    portalState => portalState.profile,
  );

const makeSelectHNotiCnt = () =>
  createSelector(
    selectPortalAuth,
    portalState => portalState.myHNotiCnt,
  );

const makeSelectRoleAdmin = () =>
  createSelector(
    selectPortalAuth,
    portalState => portalState.profile.SA,
  );

// ****************** language 스토어에서 가져오는 state ******************
const selectPortalLanguage = state => state.get('language').toJS();
const makeSelectLocale = () =>
  createSelector(
    selectPortalLanguage,
    portalState => portalState.locale,
  );

// ****************** app 스토어에서 가져오는 state ******************
// const selectPortal = state => state.get('app').toJS();

// ****************** 초기 로그인 성공시 라우터의 스토어에서 가져오는 state ******************
const selectRoute = state => state.get('common').toJS();

const makeSelectView = () =>
  createSelector(
    selectRoute,
    viewState => viewState.view,
  );

const makeSelectDockAppList = () =>
  createSelector(
    selectRoute,
    portalState => portalState.dockAppList,
  );

const makeSelectDockFixedYn = () =>
  createSelector(
    selectRoute,
    portalState => portalState.dockFixedYn,
  );

const makeSelectDockIconType = () =>
  createSelector(
    selectRoute,
    portalState => portalState.dockIconType,
  );

const makeSelectSetMyMenuNodeData = () =>
  createSelector(
    selectRoute,
    portalState => portalState.setMyMenuNodeData,
  );

const makeSelectSelectedIndex = () =>
  createSelector(
    selectRoute,
    portalState => portalState.selectedIndex,
  );

const makeSelectMenuName = () =>
  createSelector(
    selectRoute,
    portalState => portalState.menuName,
  );

const makeSelectManagerInfo = () =>
  createSelector(
    selectRoute,
    portalState => portalState.managerInfo,
  );

const makeSelectSkin = () =>
  createSelector(
    selectRoute,
    portalState => portalState.mySkin,
  );

const makeSelectMNotiCnt = () =>
  createSelector(
    selectRoute,
    portalState => portalState.myMNotiCnt,
  );

const makeSelectMNotiList = () =>
  createSelector(
    selectRoute,
    portalState => portalState.myMNotiList,
  );

const makeSelectIsUnfixDockItem = () =>
  createSelector(
    selectRoute,
    portalState => portalState.isUnfixDockItem,
  );

const makeSelectSelectedApp = () =>
  createSelector(
    selectRoute,
    portalState => portalState.selectedApp,
  );

const makeUnreadCnt = () =>
  createSelector(
    selectRoute,
    portalState => portalState.isUnreadCnt,
  );

const makeSelectMyMenuData = () =>
  createSelector(
    selectRoute,
    portalState => portalState.setMyMenuData,
  );

const makeSelectDeletedDockPageId = () =>
  createSelector(
    selectRoute,
    portalState => portalState.deletedDockPageId,
  );

const makeSelectExecutedDockPageId = () =>
  createSelector(
    selectRoute,
    portalState => portalState.executedDockPageId,
  );

const makeSelectDataForApps = () =>
  createSelector(
    selectRoute,
    portalState => portalState.dataForApps,
  );

const makeSelectApps = () =>
  createSelector(
    selectRoute,
    portalState => portalState.apps,
  );

  const makeSelectMenuFixedYn = () =>
  createSelector(
    selectRoute,
    portalState => portalState.menuFixedYn,
  );  

// ****************** app 스토어에서 가져오는 state ******************
const selectApp = state => state.get('app');

const makeSelectHeaderMenuOpen = () =>
  createSelector(
    selectApp,
    appState => appState.get('headerMenuOpen'),
  );

const makeSelectIsFullscreenEnabled = () =>
  createSelector(
    selectApp,
    appState => appState.get('isFullscreenEnabled'),
  );

const makeSelectSet = () =>
  createSelector(
    selectApp,
    appState => appState.get('set'),
  );

const makeSelectVisible = () =>
  createSelector(
    selectApp,
    appState => appState.get('visible'),
  );

const makeSelectShow = () =>
  createSelector(
    selectApp,
    appState => appState.get('show'),
  );

const makeSelectIsClose = () =>
  createSelector(
    selectApp,
    appState => appState.get('isClose').toJS(),
  );

const makeSelectIsSpinnerShow = () =>
  createSelector(
    selectApp,
    appState => appState.get('isSpinnerShow'),
  );

const makeSelectCount = () =>
  createSelector(
    selectApp,
    appState => appState.get('count'),
  );

const makeSelectIsMakingApps = () =>
  createSelector(
    selectApp,
    appState => appState.get('isMakingApps'),
  );

export {
  makeSelectProfile,
  makeSelectLocale,
  makeSelectHNotiCnt,
  makeSelectMNotiList,
  makeSelectMyMenuData,
  makeSelectSelectedApp,
  makeSelectIsUnfixDockItem,
  makeUnreadCnt,
  makeSelectRoleAdmin,
  makeSelectView,
  makeSelectDockAppList,
  makeSelectDockFixedYn,
  makeSelectDockIconType,
  makeSelectSetMyMenuNodeData,
  makeSelectSelectedIndex,
  makeSelectMenuName,
  makeSelectManagerInfo,
  makeSelectSkin,
  makeSelectMNotiCnt,
  makeSelectDeletedDockPageId,
  makeSelectExecutedDockPageId,
  makeSelectDataForApps,
  makeSelectApps,
  makeSelectMenuFixedYn,

  makeSelectHeaderMenuOpen,
  makeSelectIsFullscreenEnabled,
  makeSelectSet,
  makeSelectVisible,
  makeSelectShow,
  makeSelectIsClose,
  makeSelectIsSpinnerShow,
  makeSelectCount,
  makeSelectIsMakingApps,
};
