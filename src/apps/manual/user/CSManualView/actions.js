import * as constantTypes from './constants';

// get
export const getManualViewBySaga = () => ({ type: constantTypes.GET_MANUAL_VIEW_SAGA });

// add

// set
export const setManualViewByReducr = maulTabList => ({ type: constantTypes.SET_MANUAL_VIEW_REDUCR, maulTabList });
export const setSelectedMualIdxByReducr = mualIdx => ({ type: constantTypes.SET_SELECTED_MUAL_IDX_REDUCR, mualIdx });
export const setSelectedTabIdxByReducr = idx => ({ type: constantTypes.SET_SELECTED_TAB_IDX_REDUCR, idx });
export const setSelectedCompIdxByReducr = idx => ({ type: constantTypes.SET_SELECTED_COMPONENT_IDX_REDUCR, idx });
export const setScrollComponentByReducr = item => ({ type: constantTypes.SET_SCROLL_COMPONENT_REDUCR, item });

// remove

// etc
export const resetManualViewByReducr = () => ({ type: constantTypes.RESET_MANUAL_VIEW_REDUCR });
