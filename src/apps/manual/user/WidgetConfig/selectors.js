import { createSelector } from 'reselect';

const categoryListState = state => state.get('apps-manual-user-WigetConfig-reducer');

const makeSelectCategoryList = () => createSelector(categoryListState, state => state.get('categoryList'));
const makeSelectWidgetSettingInfo = () => createSelector(categoryListState, state => state.get('manualWidgetSettingInfo'));

export default {
  makeSelectCategoryList,
  makeSelectWidgetSettingInfo,
};
