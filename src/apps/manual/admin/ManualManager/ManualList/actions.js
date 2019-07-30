import * as constantTypes from './constants';

export const getManualList = categoryIdx => ({
  type: constantTypes.GET_MANUALLIST_SAGA,
  categoryIdx,
});

export const setManualListByReducr = manualList => ({
  type: constantTypes.SET_MANUALLIST_REDUCR,
  manualList,
});

export const setListLodingByRedcr = flag => ({ type: constantTypes.SET_LIST_LODING_REDUCR, flag });

export const setPaginationIdxByReducr = idx => ({
  type: constantTypes.SET_PAGINATION_IDX_REDUCR,
  idx,
});
