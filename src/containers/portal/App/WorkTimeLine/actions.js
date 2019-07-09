import * as actionTypes from './constants';

export const getList = (page, pagepernum) => ({
  type: actionTypes.GET_LIST,
  page,
  pagepernum,
});

export const setList = list => ({
  type: actionTypes.SET_LIST,
  list,
});
