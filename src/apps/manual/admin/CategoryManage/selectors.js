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

const makeSelectIsSecurityModal = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('isSecurityModal'),
  );

const makeSelectListDept = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('listDept').toJS(),
  );

const makeSelectListGrp = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('listGrp').toJS(),
  );

// const makeSelectListPstn = () =>
//   createSelector(
//     selectAppsCategoryManageState,
//     state => state.get('listPstn').toJS(),
//   );

// const makeSelectListDuty = () =>
//   createSelector(
//     selectAppsCategoryManageState,
//     state => state.get('listDuty').toJS(),
//   );

const makeSelectListUser = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('listUser').toJS(),
  );

const makeSelectSecurityList = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('securityList').toJS(),
  );

const makeSelectSecurityViewList = () =>
  createSelector(
    selectAppsCategoryManageState,
    state => state.get('securityViewList').toJS(),
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
  makeSelectIsSecurityModal,
  makeSelectListDept,
  makeSelectListGrp,
  // makeSelectListPstn,
  // makeSelectListDuty,
  makeSelectListUser,
  makeSelectSecurityList,
  makeSelectSecurityViewList,
};
