import * as actionTypes from './constants';

export const onDragEnd = dropResult => ({
  type: actionTypes.ON_DRAG_END,
  dropResult,
});

export const addHeader = label => ({
  type: actionTypes.ADD_HEADER,
  label,
});

export const removeItem = () => ({
  type: actionTypes.REMOVE_ITEM,
});

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
