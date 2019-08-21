import * as constantTypes from './constants';

export const getTotalManualList = (categoryIdx, widgetId) => ({ type: constantTypes.GET_TOTALMANUALIST, categoryIdx, widgetId });

export const setTotalManualList = (totalManualList, widgetId) => ({ type: constantTypes.SET_TOTALMANUALIST, totalManualList, widgetId });

export const setIsViewContentsByReducr = (flag, widgetId) => ({ type: constantTypes.SET_IS_VIEW_CONTENTS_REDUCR, flag, widgetId });

export const setSelectedMualIdxByReducr = (mualIdx, widgetId) => ({ type: constantTypes.SET_SELECTED_MUAL_IDX_REDUCR, mualIdx, widgetId });

export const setCheckManualByReducr = (mualIdx, mualOrgIdx, widgetId) => ({ type: constantTypes.SET_CHECK_MANUAL_REDUCR, mualIdx, mualOrgIdx, widgetId });

export const setSelectedMualOrgIdxBySaga = (mualIdx, widgetId, orgIdxList) => ({
  type: constantTypes.SET_SELECTED_MUAL_ORG_IDX_SAGA,
  mualIdx,
  widgetId,
  orgIdxList,
});

export const setMultiViewBySaga = widgetId => ({ type: constantTypes.SET_MULTI_VIEW_SAGA, widgetId });

export const resetCheckManualByReducr = widgetId => ({ type: constantTypes.RESET_CHECK_MANUAL_REDUCR, widgetId });
