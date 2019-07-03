import * as actionTypes from './constants';

export const getView = id => ({
  type: actionTypes.GET_VIEW,
  id,
});

export const successGetView = (boxes, formStuffs) => ({
  type: actionTypes.SUCCESS_GET_VIEW,
  boxes,
  formStuffs,
});

export const postData = payload => ({
  type: actionTypes.POST_DATA,
  payload,
});

export const successPostData = () => ({
  type: actionTypes.SUCCESS_POST_DATA,
});
