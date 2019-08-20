import * as constantTypes from './constants';

// get
export const getManualViewBySaga = (widgetId, flag) => ({ type: constantTypes.GET_MANUAL_VIEW_SAGA, flag, widgetId });

// add

// set
export const setManualViewByReducr = (maulTabList, widgetId) => ({ type: constantTypes.SET_MANUAL_VIEW_REDUCR, maulTabList, widgetId });
export const setSelectedMualIdxByReducr = (mualIdx, widgetId) => ({ type: constantTypes.SET_SELECTED_MUAL_IDX_REDUCR, mualIdx, widgetId });
export const setSelectedTabIdxByReducr = (idx, widgetId) => ({ type: constantTypes.SET_SELECTED_TAB_IDX_REDUCR, idx, widgetId });
export const setSelectedCompIdxByReducr = (idx, widgetId) => ({ type: constantTypes.SET_SELECTED_COMPONENT_IDX_REDUCR, idx, widgetId });
export const setScrollComponentByReducr = (item, widgetId) => ({ type: constantTypes.SET_SCROLL_COMPONENT_REDUCR, item, widgetId });
export const setManualViewHistoryByReducr = (historyList, widgetId) => ({ type: constantTypes.SET_MANUAL_VIEW_HISTORY_REDUCR, historyList, widgetId });
export const setManualBookmarkBySaga = (flag, widgetId) => ({ type: constantTypes.SET_MANUAL_BOOKMARK_SAGA, flag, widgetId });
export const setManualBookmarkByReducr = (historyList, widgetId) => ({ type: constantTypes.SET_MANUAL_BOOKMARK_REDUCR, historyList, widgetId });
export const setManualMasterByReducr = (manualMaster, widgetId) => ({ type: constantTypes.SET_MANUAL_MASTER_REDUCR, manualMaster, widgetId });
export const setManualViewNavListByReducr = (navList, widgetId) => ({ type: constantTypes.SET_MANUAL_VIEW_NAV_LIST_REDUCR, navList, widgetId });
// remove

// etc
export const resetManualViewByReducr = widgetId => ({ type: constantTypes.RESET_MANUAL_VIEW_REDUCR, widgetId });
