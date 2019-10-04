import { createSelector } from 'reselect';

const selectClassify = state => state.get('apps.manual.admin.Classify');

const makeClassifyList = () =>
  createSelector(
    selectClassify,
    state => state.get('classifyList').toJS(),
  );

const makeSelectedClassify = () =>
  createSelector(
    selectClassify,
    state => state.get('selectedClassify'),
  );

export default {
  makeClassifyList,
  makeSelectedClassify,
};
