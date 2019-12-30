import * as actionTypes from './constants';

export const setProcessStep = processStep => ({
  type: actionTypes.SET_PROCESS_STEP,
  processStep,
});

export const setStepInfo = stepInfo => ({
  type: actionTypes.SET_STEP_INFO,
  stepInfo,
});

export const saveProcessInfo = processInfo => ({
  type: actionTypes.SAVE_PROCESS_INFO,
  processInfo,
});

export const updateProcessInfo = processInfo => ({
  type: actionTypes.UPDATE_PROCESS_INFO,
  processInfo,
});

export const deleteProcessInfo = processInfo => ({
  type: actionTypes.DELETE_PROCESS_INFO,
  processInfo,
});

export const setProcessInfo = prcInfo => ({
  type: actionTypes.SET_PROCESS_INFO,
  prcInfo,
});

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

export const setModalVisible = visible => ({
  type: actionTypes.SET_MODAL_VISIBLE,
  visible,
});
export const setSpinning = spin => ({
  type: actionTypes.SET_SPINNING,
  spin,
});
