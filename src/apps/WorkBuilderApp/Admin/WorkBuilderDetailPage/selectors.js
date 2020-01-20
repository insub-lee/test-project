import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('work-builder-detail-page');

const makeSelectView = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    viewState => viewState.view,
  );

export { makeSelectView };
