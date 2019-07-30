import * as actionTypes from './constants';

export const fetchData = id => ({
  type: actionTypes.FETCH_DATA,
  id,
});

export const successFetchData = data => ({
  type: actionTypes.SUCCESS_FETCH_DATA,
  data,
});

export const enableLoading = () => ({
  type: actionTypes.LOADING_ON,
});

export const disableLoading = () => ({
  type: actionTypes.LOADING_OFF,
});

export const resetData = () => ({
  type: actionTypes.RESET_DATA,
});

export const setProcessId = prcId => ({
  type: actionTypes.SET_PROCESS_ID,
  prcId,
});

export const successUpdatePrcId = data => ({
  type: actionTypes.SUCCESS_UPDATE_PRC_ID,
  data,
});
