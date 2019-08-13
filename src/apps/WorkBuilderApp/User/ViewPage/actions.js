import * as actionTypes from './constants';

export const getView = apiUrl => ({
  type: actionTypes.GET_VIEW,
  apiUrl,
});

export const successGetView = (metaList, data) => ({
  type: actionTypes.SUCCESS_GET_VIEW,
  metaList,
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
