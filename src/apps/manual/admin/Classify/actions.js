import * as constantTypes from './constants';

export const getClassifyList = () => ({
  type: constantTypes.GET_CLASSIFY_LIST,
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
