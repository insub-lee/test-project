import * as actionTypes from './constants';

export const postRegistWBApp = (appName, id) => ({
  type: actionTypes.POST_REGIST_WB_APP,
  appName,
  id,
});

export const fetchData = () => ({
  type: actionTypes.FETCH_DATA,
});

export const successFetchData = data => ({
  type: actionTypes.SUCCESS_FETCH_DATA,
  data,
});

export const updateWorkData = (id, appId, categoryId) => ({
  type: actionTypes.UPDATE_WORK_DATA,
  id,
  appId,
  categoryId,
});
