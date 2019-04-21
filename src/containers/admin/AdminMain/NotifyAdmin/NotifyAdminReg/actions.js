import * as constants from './constants';

export const regNotify = (
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
) => (
  {
    type: constants.REG_NOTIFY,
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
  }
);

export const getSiteCombo = SCR_CD => (
  {
    type: constants.GET_SITE_COMBO,
    SCR_CD,
  }
);

