import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('work-builder-detail-page');

const makeSelectColumns = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('columns').toJS(),
  );

const makeSelectList = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('list').toJS(),
  );

const makeSelectModalStatus = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('modalStatus').toJS(),
  );

export { makeSelectColumns, makeSelectList, makeSelectModalStatus };
