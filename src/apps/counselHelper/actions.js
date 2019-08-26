import * as action from './constants';

export const saveDetail = detail => ({
  type: action.SAVE_DETAIL,
  detail,
});

export const getDetail = detail => ({
  type: action.GET_DETAIL,
  detail,
});
