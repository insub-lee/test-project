import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
const makeSelectManualMasterState = state => state.get('apps-ManualMaster-reducer');

const makeSelectCategoryList = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'optionMgr', 'categoryList']),
  );

const makeSelectChooseRelMual = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'optionMgr', 'selectedRelationManual']),
  );

const makeSelectRelationManualList = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'optionMgr', 'relationManualList']),
  );

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

const makeSelectIsRelationMualModal = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'manualOptionMgr', 'isRelationMualModal']),
  );

const makeSelectIsAddMualTypeModal = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'isAddMualTypeModal']),
  );

const makeSelectCompareTemplet = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'compareTempletList']).toJS(),
  );

const makeSelectedCompareTempletNode = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'selectedNode']).toJS(),
  );

const makeSelectedCompareTempletViewMode = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'viewMode']),
  );

const makeSelectCompareTempletHoverKey = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'hoverKey']),
  );

const makeSelectCompareManageTemplet = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'manage', 'templet']).toJS(),
  );

const makeSelectCompareManageData = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'manage', 'data']).toJS(),
  );

const makeSelectedCompareManageIdx = () =>
  createSelector(
    makeSelectManualMasterState,
    state => state.getIn(['manualMasterState', 'compareTempletMgr', 'manage', 'selectedIdx']),
  );

export default {
  makeSelectChooseRelMual,
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
  makeSelectIsAddMualTypeModal,
  makeSelectCompareTemplet,
  makeSelectedCompareTempletNode,
  makeSelectedCompareTempletViewMode,
  makeSelectCompareTempletHoverKey,
  makeSelectCategoryList,
  makeSelectCompareManageTemplet,
  makeSelectCompareManageData,
  makeSelectedCompareManageIdx,
};
