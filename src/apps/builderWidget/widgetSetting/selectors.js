import { createSelector } from 'reselect';
const selectBuilderWidgetSetting = state => state.get('apps.BuilderWidget.widgetSetting');

const makeSelectWorkList = () =>
  createSelector(
    selectBuilderWidgetSetting,
    state => state.get('workList').toJS(),
  );

const makeSelectWorkSeq = () =>
  createSelector(
    selectBuilderWidgetSetting,
    state => state.get('WORK_SEQ'),
  );

const makeSelectWidgetConfig = () =>
  createSelector(
    selectBuilderWidgetSetting,
    state => state.get('ITEM_VALUE').toJS(),
  );

export { makeSelectWorkList, makeSelectWorkSeq, makeSelectWidgetConfig };
