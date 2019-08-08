import * as constantTypes from './constants';

export const getTotalManualList = categoryIdx => ({ type: constantTypes.GET_TOTALMANUALIST, categoryIdx });

export const setTotalManualList = totalManualList => ({ type: constantTypes.SET_TOTALMANUALIST, totalManualList });

export const setIsViewContentsByReducr = flag => ({ type: constantTypes.SET_IS_VIEW_CONTENTS_REDUCR, flag });

export const setSelectedMualIdxByReducr = mualIdx => ({ type: constantTypes.SET_SELECTED_MUAL_IDX_REDUCR, mualIdx });

export const setCheckManualByReducr = mualIdx => ({ type: constantTypes.SET_CHECK_MANUAL_REDUCR, mualIdx });
