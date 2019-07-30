import { createSelector } from 'reselect';

const selectAppsCategoryManageState = state => state.get('apps-CategoryManage-reducer');

const makeSelectMode = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('mode'),
  );

const makeSelectNode = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('selectNode'),
  );

const makeSelectTreeData = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('treeData'),
  );

const makeSelectCategoryInfo = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('categoryInfo'),
  );

const makeSelectedIndex = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('selectedIndex'),
  );

const makeSelectedNode = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('selectedNode'),
  );

const makeSelectOnHoverKey = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('onHoverKey'),
  );

const makeSelectIsWaitModal = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('isWaitModal'),
  );

const makeSelectManualist = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.getIn(['manualListState']),
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('isLoding'),
  );

const makeSelectPaginationIdx = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('paginationIdx'),
  );
export default {
  makeSelectMode,
  makeSelectNode,
  makeSelectTreeData,
  makeSelectCategoryInfo,
  makeSelectedIndex,
  makeSelectedNode,
  makeSelectOnHoverKey,
  makeSelectIsWaitModal,
  makeSelectManualist,
  makeSelectIsLoading,
  makeSelectPaginationIdx,
};
