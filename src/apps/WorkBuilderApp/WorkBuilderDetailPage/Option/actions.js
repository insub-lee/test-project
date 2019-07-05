import * as actionTypes from './constants';

export const toggleUseWorkFlow = () => ({
  type: actionTypes.TOGGLE_USE_WORK_FLOW,
});

export const toggleUseDynamicWorkFlow = () => ({
  type: actionTypes.TOGGLE_USE_DYNAMIC_WORK_FLOW,
});

export const fetchData = id => ({
  type: actionTypes.FETCH_DATA,
  id,
});

export const successFetchData = data => ({
  type: actionTypes.SUCCESS_FETCH_DATA,
  data,
});
