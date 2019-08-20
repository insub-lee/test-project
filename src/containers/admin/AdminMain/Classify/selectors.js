import { createSelector } from 'reselect';

const selectClassify = state => state.get('apps.admin.AdminMain.Classify');

const makeClassifyList = () =>
  createSelector(
    selectClassify,
    state => state.get('classifyList').toJS(),
  );

const makeSelectedNode = () =>
  createSelector(
    selectClassify,
    state => state.get('selectedNode').toJS(),
  );

export default {
  makeClassifyList,
  makeSelectedNode,
};
