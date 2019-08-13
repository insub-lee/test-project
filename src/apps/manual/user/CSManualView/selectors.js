import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const makeSelectManualViewState = state => state.get('apps-manual-user-ManualView-reducer');

const makeSelectMaulTabList = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'manualTabList']),
  );

const makeSelectedTabIdx = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'selectedTabIdx']),
  );

const makeSelectMaulCompList = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) =>
      state.getIn(['manualViewMap', widgetId, 'manualTabList', state.getIn(['manualViewMap', widgetId, 'selectedTabIdx']), 'MUAL_TABVIEWINFO']),
  );

const makeSelectedCompIdx = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'selectedCompIdx']),
  );

const makeSelectedMualIdx = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'selectedMualIdx']),
  );

const makeSelectScrollComp = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'scrollComp']),
  );

const makeSelectedMualIdxByWidgetId = widgetId =>
  createSelector(
    makeSelectManualViewState,
    state => state.getIn(['manualViewMap', widgetId, 'selectedMualIdx']),
  );

const makeSelectHistoryList = () =>
  createSelector(
    makeSelectManualViewState,
    (state, props) => props.widgetId || 24240,
    (state, widgetId) => state.getIn(['manualViewMap', widgetId, 'historyList']),
  );

export default {
  makeSelectMaulTabList,
  makeSelectedTabIdx,
  makeSelectMaulCompList,
  makeSelectedCompIdx,
  makeSelectedMualIdx,
  makeSelectScrollComp,
  makeSelectedMualIdxByWidgetId,
  makeSelectHistoryList,
};
