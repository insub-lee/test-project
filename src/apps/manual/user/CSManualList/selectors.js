import { createSelector } from 'reselect';
const makeSelectStateCSManualList = state => state.get('apps-manual-user-CSManualList-reducer');

const makeSelectCSManualList = () =>
  createSelector(
    makeSelectStateCSManualList,
    state => state.get('totalManualList'),
  );

const makeSelectIsViewContents = () =>
  createSelector(
    makeSelectStateCSManualList,
    state => state.get('isViewContents'),
  );

const makeSelectedMualIdx = () =>
  createSelector(
    makeSelectStateCSManualList,
    state => state.get('selectedMualIdx'),
  );

export default {
  makeSelectCSManualList,
  makeSelectIsViewContents,
  makeSelectedMualIdx,
};
