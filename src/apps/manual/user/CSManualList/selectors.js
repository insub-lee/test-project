import { createSelector } from 'reselect';
const makeSelectStateCSManualList = state => state.get('apps-manual-user-CSManualList-reducer');

const makeSelectCSManualList = () =>
  createSelector(
    makeSelectStateCSManualList,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.data && props.item.data.categoryIdx) || 24240),
    (state, widgetId) => state.getIn(['manualListMap', widgetId, 'totalManualList']),
  );

const makeSelectIsViewContents = () =>
  createSelector(
    makeSelectStateCSManualList,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.data && props.item.data.categoryIdx) || 24240),
    (state, widgetId) => state.getIn(['manualListMap', widgetId, 'isViewContents']),
  );

const makeSelectedMualIdx = () =>
  createSelector(
    makeSelectStateCSManualList,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.data && props.item.data.categoryIdx) || 24240),
    (state, widgetId) => state.getIn(['manualListMap', widgetId, 'selectedMualIdx']),
  );

const makeCheckedManualList = () =>
  createSelector(
    makeSelectStateCSManualList,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.data && props.item.data.categoryIdx) || 24240),
    (state, widgetId) => state.getIn(['manualListMap', widgetId, 'checkedMualList']),
  );

export default {
  makeSelectCSManualList,
  makeSelectIsViewContents,
  makeSelectedMualIdx,
  makeCheckedManualList,
};
