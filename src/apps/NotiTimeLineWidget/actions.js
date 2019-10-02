import * as actionTypes from './constants';

export const getNotifyList = () => ({
  type: actionTypes.GET_NOTIFY_LIST,
});

export const setNotifyList = list => ({
  type: actionTypes.SET_NOTIFY_LIST,
  list,
});
