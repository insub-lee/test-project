import * as constants from './constants';

export const changeUserInfo = (target, value) => ({
  type: constants.CHANGE_USER_INFO,
  target,
  value,
});

export const updateUserInfo = (userId, settingData) => ({
  type: constants.UPDATE_USER_INFO,
  userId,
  settingData,
});
