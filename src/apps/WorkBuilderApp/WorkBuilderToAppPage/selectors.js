import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('work-builder-to-app-page');

const makeSelectAppList = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('appList').toJS(),
  );

const makeSelectWorkBuilderList = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('workBuilderList').toJS(),
  );

export { makeSelectAppList, makeSelectWorkBuilderList };
