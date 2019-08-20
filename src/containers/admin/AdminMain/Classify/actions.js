import * as constantTypes from './constants';

export const getClassifyList = gubun => ({
  type: constantTypes.GET_CLASSIFY_LIST,
  gubun,
});

export const setClassifyList = classifyList => ({
  type: constantTypes.SET_CLASSIFY_LIST,
  classifyList,
});

export const saveClassify = classifyInfo => ({
  type: constantTypes.SAVE_CLASSIFY,
  classifyInfo,
});

export const addClassifyInfo = classifyInfo => ({
  type: constantTypes.ADD_CLASSIFY_INFO,
  classifyInfo,
});

export const updateClassifyInfo = classifyInfo => ({
  type: constantTypes.UPDATE_CLASSIFY_INFO,
  classifyInfo,
});

export const deleteClassifyInfo = classifyInfo => ({
  type: constantTypes.DELETE_CLASSIFY_INFO,
  classifyInfo,
});

export const updateClassifyList = updateData => ({
  type: constantTypes.UPDATE_CLASSIFY_LIST,
  updateData,
});

export const setSelectedNode = nodeInfo => ({
  type: constantTypes.SET_SELECTED_NODE,
  nodeInfo,
});

export const initClassifyData = () => ({
  type: constantTypes.INIT_CLASSIFY_DATA,
});
