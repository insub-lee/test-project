import * as actionTypes from './constants';

export const getProcessData = payload => ({
  type: actionTypes.GET_PROCESS_DATA,
  payload,
});

export const setProcessData = (processInfo, processStep) => ({
  type: actionTypes.SET_PROCESS_DATA,
  processInfo,
  processStep,
});

export const initProcessData = () => ({
  type: actionTypes.INIT_PROCESS_DATA,
});

export const changeStepInfo = stepInfo => ({
  type: actionTypes.CHANGE_STEP_INFO,
  stepInfo,
});
