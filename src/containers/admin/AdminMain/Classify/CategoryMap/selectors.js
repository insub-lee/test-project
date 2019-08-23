import { createSelector } from 'reselect';

const selectClassifyCategoryMap = state => state.get('containers.admin.AdminMain.Classify.CategoryMap');

const makeRootMapList = () =>
  createSelector(
    selectClassifyCategoryMap,
    state => state.get('rootMapList').toJS(),
  );

const makeCategoryMapList = () =>
  createSelector(
    selectClassifyCategoryMap,
    state => state.get('categoryMapList').toJS(),
  );

const makeSelectedNode = () =>
  createSelector(
    selectClassifyCategoryMap,
    state => state.get('selectedNode').toJS(),
  );

const makeIsAdd = () =>
  createSelector(
    selectClassifyCategoryMap,
    state => state.get('isAdd'),
  );

const makeAddNodeInfo = () =>
  createSelector(
    selectClassifyCategoryMap,
    state => state.get('addNodeInfo').toJS(),
  );

export default { makeRootMapList, makeCategoryMapList, makeSelectedNode, makeIsAdd, makeAddNodeInfo };
