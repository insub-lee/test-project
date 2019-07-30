import { createSelector } from 'reselect';
const makeSelectManualManagerState = state => state.get('apps-ManualManager-reducer');

const makeSelectPageType = () =>
  createSelector(
    makeSelectManualManagerState,
    state => state.get('pageType'),
  );

const makeSelectListCategoryIdx = () =>
  createSelector(
    makeSelectManualManagerState,
    state => state.get('listCategoryIdx'),
  );

const makeSelectViewCategoryIdx = () =>
  createSelector(
    makeSelectManualManagerState,
    state => state.get('viewCategoryIdx'),
  );

const makeSelectManualIdx = () =>
  createSelector(
    makeSelectManualManagerState,
    state => state.get('manualIdx'),
  );

export default {
  makeSelectPageType,
  makeSelectListCategoryIdx,
  makeSelectViewCategoryIdx,
  makeSelectManualIdx,
};
