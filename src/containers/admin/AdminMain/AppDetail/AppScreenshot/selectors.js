import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('admin/AdminMain/AppDetail/AppScreenshot');

const makeSelectAppScreenshotList = () =>
  createSelector(
    selectAppDetail,
    appScreenshotListState => appScreenshotListState.get('appScreenshotList').toJS(),
  );

const makeSelectAppExplain = () =>
  createSelector(
    selectAppDetail,
    appScreenshotListState => appScreenshotListState.get('appExplain'),
  );
const makeSelectRequiredAppList = () =>
  createSelector(
    selectAppDetail,
    appScreenshotListState => appScreenshotListState.get('requiredAppList').toJS(),
  );
const makeSelectRecomAppList = () =>
  createSelector(
    selectAppDetail,
    appScreenshotListState => appScreenshotListState.get('resRecomAppList').toJS(),
  );

const selectView = state => state.get('common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

export { selectAppDetail, makeSelectAppScreenshotList, makeSelectAppExplain, makeSelectRequiredAppList, makeSelectRecomAppList, currentView };
