import * as constants from './constants';

export const getAppUser = (APP_ID, VER, LANG, history) => (
  {
    type: constants.GET_APP_USER,
    payload: {
      APP_ID,
      VER,
      LANG,
      history,
      mod: 1,
    },
  }
);
export const appUserSave = (
  APP_ID,
  VER,
  history,
  managerSetMembers,
  userSetMembers,
  pstnSetMembers,
  deptSetMembers,
  dutySetMembers,
  grpSetMembers,
  uv,
) => ({
  type: constants.APP_USER_SAVE,
  payload: {
    APP_ID,
    VER,
    history,
    managerSetMembers,
    userSetMembers,
    pstnSetMembers,
    deptSetMembers,
    dutySetMembers,
    grpSetMembers,
    uv,
  },
});
