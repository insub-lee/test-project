import * as constantTypes from './constants';

export const getCategoryMapListBySaga = (key, mapId) => ({
  type: constantTypes.GET_CATEGORYMAP,
  key,
  mapId,
});

export const setCatgoryMapListByReducr = (key, categoryMapList) => ({
  type: constantTypes.SET_CATEGORYMAP_BYREDUCR,
  key,
  categoryMapList,
});

export const getDeleteDocListBySaga = payload => ({
  type: constantTypes.DELETE_DOC_LIST,
  payload,
});
