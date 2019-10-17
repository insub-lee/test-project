import * as constantTypes from './constants';

export const getCategoryMapListBySaga = (mapId, draftMapId, degreeMapId, approverMapId) => ({
  type: constantTypes.GET_CATEGORYMAP_BY_SAGA,
  mapId,
  draftMapId,
  degreeMapId,
  approverMapId,
});

export const setCatgoryMapListByReducr = (key, categoryMapList) => ({
  type: constantTypes.SET_CATEGORYMAP_BY_REDUCR,
  key,
  categoryMapList,
});

export const getDocApproverListBySaga = (key, workSeq) => ({
  type: constantTypes.GET_DOC_APPROVER_LIST_BY_SAGA,
});

export const setTaskSeqByReducr = taskSeq => ({
  type: constantTypes.SET_TASK_SEQ_BY_REDUCR,
  taskSeq,
});
