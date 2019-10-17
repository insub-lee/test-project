import * as actionTypes from './constants';

export const getDocListBySaga = (NODE_ID, WIDGET_ID) => ({
  type: actionTypes.GET_DOC_LIST,
  NODE_ID,
  WIDGET_ID,
});
export const setDocListByReducer = (docList, WIDGET_ID) => ({
  type: actionTypes.SET_DOC_LIST,
  docList,
  WIDGET_ID,
});

export const setDocNumByReducer = (num, WIDGET_ID) => ({
  type: actionTypes.SET_DOC_NUM,
  num,
  WIDGET_ID,
});
