import * as constants from './constants';

export const getNotifyMsg = MSG_ID => ({
  type: constants.GET_NOTIFY_MSG,
  MSG_ID,
});

export const udtPostState = (MSG_ID, OPEN_YN) => ({
  type: constants.UDT_POST_STATE,
  MSG_ID,
  OPEN_YN,
});

export const udtNotify = (
  MSG_ID,
  SYSTEM,
  COMPANY_CD,
  SITE_ID,
  APP_ID,
  MSG_TYPE,
  OPEN_YN,
  TITLE,
  CONTENT,
  URL,
  START_DTTM,
  END_DTTM,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  imgList,
  btnList,
) => ({
  type: constants.UDT_NOTIFY,
  MSG_ID,
  SYSTEM,
  COMPANY_CD,
  SITE_ID,
  APP_ID,
  MSG_TYPE,
  OPEN_YN,
  TITLE,
  CONTENT,
  URL,
  START_DTTM,
  END_DTTM,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  imgList,
  btnList,
});
