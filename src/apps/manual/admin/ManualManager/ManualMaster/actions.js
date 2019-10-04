import * as constantTypes from './constants';
// 카테고리 리스트
export const getCategoryListBySaga = () => ({
  type: constantTypes.GET_CATEGORYLIST,
});

export const setRelationManualListByMualIdxByRecur = (mualIdx, selected, target) => ({
  type: constantTypes.SET_RELATIONMANUALLISTBYMUALIDX_REDUCR,
  mualIdx,
  selected,
  target,
});

export const setRelationManualListBySaga = manualList => ({
  type: constantTypes.SET_RELATIONMANUALLIST_SAGA,
  manualList,
});

export const setSelectedRelationManual = items => ({
  type: constantTypes.SET_SELECTEDRELATIONMANUAL_REDUCR,
  items,
});

export const getRelationManualListBySaga = (categoryIdx, chooesItem) => ({
  type: constantTypes.GET_RELATIONMANUALLIST_SAGA,
  categoryIdx,
  chooesItem,
});

export const setRelationManualListByRecur = manualList => ({
  type: constantTypes.SET_RELATIONMANUALLIST_REDUCR,
  manualList,
});

export const setCategoryListByReducr = categoryList => ({
  type: constantTypes.SET_CATEGORYLIST_REDUCR,
  categoryList,
});

export const setRelationCategoryIdx = categoryIdx => ({
  type: constantTypes.SET_RELATIONCATEGORYIDX,
  categoryIdx,
});

// 사용자
export const getUserInfoBySaga = userName => ({
  type: constantTypes.GET_USERINFO_SAGA,
  userName,
});

export const getSelectedUserInfoBySaga = () => ({
  type: constantTypes.GET_SELECTEDUSERINFO_SAGA,
});

export const setUserInfoListByReducr = userInfoList => ({
  type: constantTypes.SET_USERINFO_REDUCR,
  userInfoList,
});

export const setSelectedUserInfoByReducr = selectedUserInfo => ({
  type: constantTypes.SET_SELECTEDUSERINFO_REDUCR,
  selectedUserInfo,
});

export const initManualMagerByReducr = () => ({
  type: constantTypes.INIT_MANUALMANGERBYREDUCR,
});

export const setMovePageTypeReducr = pageMoveType => ({
  type: constantTypes.SET_MOVEPAGETYPEBYREDUCR,
  pageMoveType,
});

export const initDefaultMgrByReduc = () => ({
  type: constantTypes.INIT_DEFAULTMGR_REDUCR,
});

export const getDefaultMgrBySaga = () => ({
  type: constantTypes.GET_DEFAULTMGR_SAGA,
});

// 매뉴얼 마스터 reducer 데이터 변경
export const setDefaultMgrByReduc = defaultMgrMap => ({
  type: constantTypes.SET_DEFAULTMGR_REDUCR,
  defaultMgrMap,
});

// 리듀서 값 변경 기능
export const setDefaultMgrChangeValueByReduc = (key, value) => ({
  type: constantTypes.SET_DEFAULTMGRCHANGEVALUE_REDUCR,
  key,
  value,
});

// 매뉴얼 등록
export const insertDefaultMgr = defaultMgrMap => ({
  type: constantTypes.ADD_DEFAULTMGR_SAGA,
  defaultMgrMap,
});

// 매뉴얼 수정
export const updateDefaultMgr = defaultMgrMap => ({
  type: constantTypes.MODIFY_DEFUALTMGR_SAGA,
  defaultMgrMap,
});
export const addTabInfoByReduc = () => ({
  type: constantTypes.ADD_TAB_INFO_REDUCR,
});

export const setTabIdxByReduc = (tabIdx, idx) => ({
  type: constantTypes.SET_TAB_IDX_REDUCR,
  tabIdx,
  idx,
});

export const removeTabInfoByReduc = tabIdx => ({
  type: constantTypes.REMOVE_TAB_INFO_REDUCR,
  tabIdx,
});

export const getManualEditorMgrBySaga = () => ({
  type: constantTypes.GET_EDITOR_INFO_SAGA,
});

export const setEditorMgrByReduc = tabList => ({
  type: constantTypes.SET_EDITORMGR_REDUCR,
  tabList,
});

export const setIsEditorMgrByReduc = flag => ({ type: constantTypes.SET_IS_EDITORMGR_REDUCR, flag });

export const setPageTypeByReduc = pageType => ({ type: constantTypes.SET_PAGE_TYPE_REDUCR, pageType });

export const saveEditorMgrBySaga = () => ({ type: constantTypes.SAVE_EDITOR_SAGA });

export const setTabNameByReduc = (tabName, tabIdx) => ({ type: constantTypes.SET_TAB_NAME_REDUCR, tabName, tabIdx });

export const resetEditorMgrByReduc = () => ({ type: constantTypes.RESET_EDITORMGR_REDUCR });

export const moveTabComponentByReduc = node => ({ type: constantTypes.MOVE_TAB_COMPONENT_REDUCR, node });

export const addEditorComponentByReduc = (compType, text) => ({ type: constantTypes.ADD_EDITOR_COMPONENT_REDUCR, compType, text });

export const setEditorComponentValueByReduc = (tabIdx, compIdx, key, value) => ({
  type: constantTypes.SET_EDITOR_COMPONENT_VALUE_REDUCR,
  tabIdx,
  compIdx,
  key,
  value,
});

export const setEditorComponentIndexByReduc = idx => ({ type: constantTypes.SET_EDITOR_COMPONENT_INDEX_REDUCR, idx });

export const removeEditorComponentByReduc = (tabIdx, compIdx) => ({ type: constantTypes.REMOVE_EDITOR_COMPONENT_REDUCR, tabIdx, compIdx });

export const setAddEditorComponentIdByReduc = id => ({ type: constantTypes.SET_ADD_EDITOR_COMPONENT_ID_REDUCR, id });

export const setFocusEditorComponentIdxByReduc = idx => ({ type: constantTypes.SET_FOCUS_EDITOR_COMPONENT_IDX_REDUCR, idx });

export const setAddEditorComponentIdxByReduc = idx => ({ type: constantTypes.SET_ADD_EDITOR_COMPONENT_IDX_REDUCR, idx });

export const setEditorComponentListByReduc = compList => ({ type: constantTypes.SET_EDITOR_COMPONENT_LIST_REDUCR, compList });

export const RevisionManualBySaga = () => ({ type: constantTypes.REVISION_MANUAL_SAGA });

export const ConfirmDefaultMgrBySaga = () => ({ type: constantTypes.CONFIRM_DEFAULT_MGR_SAGA });

export const ResetDefaultMgrBySaga = () => ({ type: constantTypes.RESET_DEFAULT_MGR_SAGA });

export const RemoveManualBySaga = () => ({ type: constantTypes.REMOVE_MANUAL_SAGA });

export const GetDefaultMgrByVersionBySaga = version => ({ type: constantTypes.GET_DEFAULTMGR_BY_VERSION_SAGA, version });

export const setScrollComponentByReducr = item => ({ type: constantTypes.SET_SCROLL_COMPONENT_REDUCR, item });

export const getOptionMgrBySaga = () => ({ type: constantTypes.GET_OPTIONMGR_SAGA });

export const setIsRelationMualModalByReduc = flag => ({ type: constantTypes.SET_IS_RELATION_MUAL_MODAL_REDUCR, flag });

export const setIsAddMualTypeModalByReducr = flag => ({ type: constantTypes.SET_IS_ADD_MUAL_TYPE_MODAL_REDUCR, flag });

export const getCompareTempletListBySaga = () => ({ type: constantTypes.GET_COMPARE_TEMPLET_SAGA });

export const setCompareTempletListByReducr = list => ({ type: constantTypes.SET_COMPARE_TEMPLET_REDUCR, list });

export const setCompareTempletViewModeByReducr = (node, flag) => ({ type: constantTypes.SET_COMPARE_TEMPLET_VIEW_MODE_REDUCR, node, flag });

export const saveCompareTempletBySaga = () => ({ type: constantTypes.SAVE_COMPARE_TEMPLET });

export const setCompareTempletChangeValueByReducr = (key, value) => ({ type: constantTypes.SET_COMPARE_TEMPLET_CHANGE_VALUE_REDUCR, key, value });

export const setCompareTampletOnHoverKey = idx => ({ type: constantTypes.SET_COMPARE_TEMPLET_HOVER_KEY_REDUCR, idx });

export const setCompareTempletContentNameByReducr = (id, value) => ({ type: constantTypes.SET_COMPARE_TEMPLET_CONTENT_NAME_REDUCR, id, value });

export const removeCompareTempletContentItemByReducr = id => ({ type: constantTypes.REMOVE_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR, id });

export const addCompareTempletContentItemByReducr = () => ({ type: constantTypes.ADD_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR });

export const moveCompareTempletContentItemByReducr = dropResult => ({ type: constantTypes.MOVE_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR, dropResult });

export const getCompareMgrBySaga = () => ({ type: constantTypes.GET_COMPARE_MGR_SAGA });

export const setCompareManageTemplet = data => ({ type: constantTypes.SET_COMPARE_MANAGE_TEMPLET_REDUCR, data });

export const setCompareManageData = data => ({ type: constantTypes.SET_COMPARE_MANAGE_DATA_REDUCR, data });

export const setCompareManageChangeValueByReducr = (idx, value) => ({ type: constantTypes.SET_COMPARE_MANAGE_CHANGE_VALUE_REDUCR, idx, value });

export const saveCompareDataBySaga = () => ({ type: constantTypes.SAVE_COMPARE_DATA_SAGA });

export const setSelectedCompareManageIdx = idx => ({ type: constantTypes.SET_SELECTED_COMPARE_MANAGE_IDX_REDUCR, idx });

export const addEditorComponentValueByReduc = (tabIdx, compIdx, key, value) => ({
  type: constantTypes.ADD_EDITOR_COMPONENT_VALUE_REDUCR,
  tabIdx,
  compIdx,
  key,
  value,
});

export const removeEditorComponentValueByReduc = (tabIdx, compIdx, key) => ({ type: constantTypes.REMOVE_EDITOR_COMPONENT_VALUE_REDUCR, tabIdx, compIdx, key });

export const setIsIndexRelationModalByReducr = flag => ({ type: constantTypes.SET_IS_INDEX_RELATION_MODAL_REDUCR, flag });

export const getIndexRelationManualListBySaga = idx => ({ type: constantTypes.GET_INDEX_RELATION_MANUAL_LIST_SAGA, idx });

export const setIndexRelationManualListByReducr = list => ({ type: constantTypes.SET_INDEX_RELATION_MANUAL_LIST_REDUCR, list });

export const getIndexRelationComponetListBySaga = idx => ({ type: constantTypes.GET_INDEX_RELATION_COMPONENT_LIST_SAGA, idx });

export const setInexRelationComponentListByReduc = list => ({ type: constantTypes.SET_INDEX_RELATION_COMPONENT_LIST_REDUCR, list });

export const setIndexRelationComponetIitemByReducr = item => ({ type: constantTypes.SET_INDEX_RELATION_COMPONENT_ITEM_REDUCR, item });

export const setIndexRelationListByReducr = list => ({ type: constantTypes.SET_INDEX_RELATION_LIST_REDUCR, list });

export const setEditorParagraphByReducr = (idx, flag) => ({ type: constantTypes.SET_EDITOR_PARAGRAPH_REDUCR, idx, flag });

export const setPreviewModalByReducr = flag => ({ type: constantTypes.SET_PREVIEW_MODAL_REDUCR, flag });
