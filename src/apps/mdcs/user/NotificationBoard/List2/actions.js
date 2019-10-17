import * as constantTypes from './constants';

export const getNotificationListBySaga = (key, workSeq) => ({
  type: constantTypes.GET_NOTIFICATIONLIST,
  key,
  workSeq,
});

export const setNotificationListByReducr = (key, notificationList) => ({
  type: constantTypes.SET_NOTIFICATIONLIST_BYREDUCR,
  key,
  notificationList,
});
