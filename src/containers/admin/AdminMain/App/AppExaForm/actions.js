import * as constants from './constants';

export const appExamine = (
  managerSetMembers,
  CONTENT,
  SVC_REQ_DT,
  APP_ID,
  VER,
  history,
) => ({
  type: constants.APP_EXAMINE,
  payload: {
    managerSetMembers,
    CONTENT,
    SVC_REQ_DT,
    APP_ID,
    VER,
    history,
  },
});

export const getMyAppExaDetail = (
  APP_ID,
  VER,
  EXA_MODE,
) => ({
  type: constants.GET_MYAPP_EXADETAIL,
  payload: {
    APP_ID,
    VER,
    EXA_MODE,
  },
});

// export const test = () => ({
//   type: constants.TEST,
// });
