import { createSelector } from 'reselect';

const selectViewDesignerState = state => state.get('apps-mdcs-admin-ViewDesigner-reducer');

const makeSelectActiveTabKey = () => createSelector(selectViewDesignerState, state => state.get('activeTabKey'));

const makeSelectIsShowEditor = () => createSelector(selectViewDesignerState, state => state.get('isShowEditor'));

const makeSelectGroups = () => createSelector(selectViewDesignerState, state => state.get('groups').toJS());

const makeSelectSelectedKeys = () => createSelector(selectViewDesignerState, state => state.get('selectedKeys').toJS());

const makeSelectSelectedStyleCells = () => createSelector(selectViewDesignerState, state => state.get('selectedStyleCells').toJS());

const makeSelectCanMerge = () => createSelector(selectViewDesignerState, state => state.get('canMerge'));

const makeSelectCompData = () => createSelector(selectViewDesignerState, state => state.get('compData').toJS());

const makeSelectBodyStyle = () => createSelector(selectViewDesignerState, state => state.get('bodyStyle').toJS());

const makeSelectWorkInfo = () => createSelector(selectViewDesignerState, state => state.get('workInfo').toJS());

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
};
