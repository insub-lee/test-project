import { createSelector } from 'reselect';

const selectViewDesignerState = state => state.get('apps-mdcs-admin-ViewDesigner-reducer');

const makeSelectActiveTabKey = () => createSelector(selectViewDesignerState, state => state.get('activeTabKey'));

const makeSelectIsShowEditor = () => createSelector(selectViewDesignerState, state => state.get('isShowEditor'));

const makeSelectGroups = () => createSelector(selectViewDesignerState, state => state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups']).toJS());

const makeSelectSelectedKeys = () => createSelector(selectViewDesignerState, state => state.get('selectedKeys').toJS());

const makeSelectSelectedStyleCells = () => createSelector(selectViewDesignerState, state => state.get('selectedStyleCells').toJS());

const makeSelectCanMerge = () => createSelector(selectViewDesignerState, state => state.get('canMerge').toJS());

const makeSelectCanDivide = () => createSelector(selectViewDesignerState, state => state.get('canDivide').toJS());

const makeSelectCompData = () => createSelector(selectViewDesignerState, state => state.get('compData').toJS());

const makeSelectBodyStyle = () => createSelector(selectViewDesignerState, state => state.getIn(['viewData', 'CONFIG', 'property', 'bodyStyle']).toJS());

const makeSelectWorkInfo = () => createSelector(selectViewDesignerState, state => state.get('workInfo').toJS());

const makeSelectTopMenus = () => createSelector(selectViewDesignerState, state => state.get('topMenus').toJS());

const makeSelectViewData = () => createSelector(selectViewDesignerState, state => state.get('viewData').toJS());

const makeSelectCompPoolList = () => createSelector(selectViewDesignerState, state => state.get('compPoolList').toJS());

const makeSelectCompGroupList = () => createSelector(selectViewDesignerState, state => state.get('compGroupList').toJS());

const makeSelectCompTreeData = () => createSelector(selectViewDesignerState, state => state.get('compTreeData').toJS());

const makeSelectSysMetaList = () => createSelector(selectViewDesignerState, state => state.get('sysMetaList').toJS());

const makeSelectIsLoadingContent = () => createSelector(selectViewDesignerState, state => state.get('isLoadingContent'));

export {
  makeSelectIsShowEditor,
  makeSelectGroups,
  makeSelectSelectedKeys,
  makeSelectSelectedStyleCells,
  makeSelectCanMerge,
  makeSelectBodyStyle,
  makeSelectCompData,
  makeSelectActiveTabKey,
  makeSelectWorkInfo,
  makeSelectTopMenus,
  makeSelectViewData,
  makeSelectCompPoolList,
  makeSelectCompGroupList,
  makeSelectCompTreeData,
  makeSelectSysMetaList,
  makeSelectIsLoadingContent,
  makeSelectCanDivide,
};
