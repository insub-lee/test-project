import { createSelector } from 'reselect';

const makeSelectDocTemplateState = state => state.get('apps-mdcs-user-docArchitect-reducer');

const makeSelectCategoryMapList = key =>
  createSelector(
    makeSelectDocTemplateState,
    state => state.getIn(['docTemplate', key]),
  );

export default {
  makeSelectCategoryMapList,
};
