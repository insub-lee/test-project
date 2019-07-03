import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('work-builder-viewer-page');

const makeSelectBoxes = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('boxes').toJS(),
  );

const makeSelectFormStuffs = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => state.get('formStuffs').toJS(),
  );

export { makeSelectBoxes, makeSelectFormStuffs };
