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

// remove

// etc
export const resetManualViewByReducr = widgetId => ({ type: constantTypes.RESET_MANUAL_VIEW_REDUCR, widgetId });
