import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const makeSelectManualMasterState = state => state.get('apps-ManualMaster-reducer');

const makeSelectUserInfoList = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'userInfoList']),
  );

const makeSelectedUserInfo = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'selectedUserInfo']),
  );
const makeSelectManualMaster = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState']),
  );

const makeSelectDefaultMgr = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'defaultMgrMap']),
  );

const makeSelectMovePageType = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'pageMoveType']),
  );

const makeSelectTabInfo = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']),
  );

const makeSelectTabIdx = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']),
  );

const makeSelectIsEditorMgr = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'isEditorMgr']),
  );

const makeSelectEditorMgr = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity']),
  );

const makeSelectTabComponentList = () =>
  createSelector(
    makeSelectManualMasterState,
    state => {
      const selectedTabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
      const editorTabList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']) || fromJS([]);
      const idx = editorTabList.findIndex(item => item.get('MUAL_TAB_IDX') === selectedTabIdx);
      if (idx === -1) return fromJS([]);
      return state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList']);
    },
  );

const makeSelectEditorComponentIndex = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx']),
  );

const makeSelectAddEditorComponentId = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'addComponentId']),
  );

const makeSelectFocusEditorComponentIndex = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'focusComponentIdx']),
  );

const makeSelectAddEditorComponentIndex = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx']),
  );

const makeSelectedTabName = () =>
  createSelector(
    makeSelectManualMasterState,
    state => {
      const tabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
      const tabList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']);
      const selectedTabIdx = tabList.findIndex(item => item.get('MUAL_TAB_IDX') === tabIdx);
      return tabList.getIn([selectedTabIdx, 'MUAL_TABNAME']);
    },
  );

const makeSelectScrollComp = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualEditorEntity', 'scrollComp']),
  );

const makeSelectRelationManualList = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualOptionMgr', 'relationManualList']),
  );

const makeSelectIsRelationMualModal = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualOptionMgr', 'isRelationMualModal']),
  );

export default {
  makeSelectManualMaster,
  makeSelectDefaultMgr,
  makeSelectMovePageType,
  makeSelectTabInfo,
  makeSelectTabIdx,
  makeSelectIsEditorMgr,
  makeSelectEditorMgr,
  makeSelectTabComponentList,
  makeSelectEditorComponentIndex,
  makeSelectAddEditorComponentId,
  makeSelectFocusEditorComponentIndex,
  makeSelectUserInfoList,
  makeSelectedUserInfo,
  makeSelectAddEditorComponentIndex,
  makeSelectedTabName,
  makeSelectScrollComp,
  makeSelectRelationManualList,
  makeSelectIsRelationMualModal,
};
