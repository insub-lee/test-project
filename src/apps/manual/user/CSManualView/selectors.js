import { createSelector } from 'reselect';

const makeSelectManualViewState = state => state.get('apps-manual-user-ManualView-reducer');

const makeSelectMaulTabList = () =>
  createSelector(
    makeSelectManualViewState,
    state => state.get('manualTabList'),
  );

const makeSelectedTabIdx = () =>
  createSelector(
    makeSelectManualViewState,
    state => state.get('selectedTabIdx'),
  );

const makeSelectMaulCompList = () =>
  createSelector(
    makeSelectManualViewState,
    state => state.getIn(['manualTabList', state.get('selectedTabIdx'), 'MUAL_TABVIEWINFO']),
  );

const makeSelectedCompIdx = () =>
  createSelector(
    makeSelectManualViewState,
    state => state.get('selectedCompIdx'),
  );

const makeSelectedMualIdx = () =>
  createSelector(
    makeSelectManualViewState,
    state => state.get('selectedMualIdx'),
  );

export default {
  makeSelectMaulTabList,
  makeSelectedTabIdx,
  makeSelectMaulCompList,
  makeSelectedCompIdx,
  makeSelectedMualIdx,
};
