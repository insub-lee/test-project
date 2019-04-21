import * as constants from './constants';

export const saveBookroom = param => ({
  type: constants.SAVE_BOOKROOM_SAGA,
  param,
});

export const setResModalType = resModalType => ({
  type: constants.SET_RESMODALTYPE,
  resModalType,
});

export const getLocationAndNoti = MR_REG_NO => ({
  type: constants.GET_LOCATION_AND_NOTI_SAGA,
  MR_REG_NO,
});
