import * as actionTypes from './constants';

export const boot = () => ({
  type: actionTypes.ACTION_TYPES,
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
