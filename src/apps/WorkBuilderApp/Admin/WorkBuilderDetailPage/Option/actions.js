import * as actionTypes from './constants';

export const toggleUseWorkFlow = checked => ({
  type: actionTypes.TOGGLE_USE_WORK_FLOW,
  checked,
});

export const toggleUseDynamicWorkFlow = checked => ({
  type: actionTypes.TOGGLE_USE_DYNAMIC_WORK_FLOW,
  checked,
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

export const successEnableUseWorkFlow = data => ({
  type: actionTypes.SUCCESS_ENABLE_USE_WORK_FLOW,
  data,
});

export const successDisableUseWorkFlow = () => ({
  type: actionTypes.SUCCESS_DISABLE_USE_WORK_FLOW,
});
