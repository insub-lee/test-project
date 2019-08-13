import * as constantTypes from './constants';

export const getTotalManualList = (categoryIdx, widgetId) => ({ type: constantTypes.GET_TOTALMANUALIST, categoryIdx, widgetId });

export const setTotalManualList = (totalManualList, widgetId) => ({ type: constantTypes.SET_TOTALMANUALIST, totalManualList, widgetId });

export const setIsViewContentsByReducr = (flag, widgetId) => ({ type: constantTypes.SET_IS_VIEW_CONTENTS_REDUCR, flag, widgetId });

export const setSelectedMualIdxByReducr = (mualIdx, widgetId) => ({ type: constantTypes.SET_SELECTED_MUAL_IDX_REDUCR, mualIdx, widgetId });

export const setCheckManualByReducr = (mualIdx, widgetId) => ({ type: constantTypes.SET_CHECK_MANUAL_REDUCR, mualIdx, widgetId });
