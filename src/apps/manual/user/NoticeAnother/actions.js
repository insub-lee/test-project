import * as actionTypes from './constants';

export const getCategoryMapListBySaga = (key, mapId) => ({
  type: actionTypes.GET_CATEGORYMAP,
  key,
  mapId,
});

export const setCatgoryMapListByReducr = (key, categoryMapList) => ({
  type: actionTypes.SET_CATEGORYMAP_BYREDUCR,
  key,
  categoryMapList,
});
export const getFilteredData = selectedKey => ({
  type: actionTypes.GET_FILTERED_DATA,
  selectedKey,
});

export const setFilteredDataByReducer = data => ({
  type: actionTypes.SET_FILTERED_DATA_BYREDUCER,
  data,
});
