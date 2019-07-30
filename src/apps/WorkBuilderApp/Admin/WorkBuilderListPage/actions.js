import * as actionTypes from './constants';

export const toggleModalVisible = payload => ({
  type: actionTypes.TOGGLE_MODAL_VISIBLE,
  payload,
});

/* Actions about api */
export const postWorkBuilder = payload => ({
  type: actionTypes.POST_WORK_BUILDER,
  payload,
});

export const getList = () => ({
  type: actionTypes.GET_LIST,
});

export const successGetList = list => ({
  type: actionTypes.SUCCESS_GET_LIST,
  list,
});
