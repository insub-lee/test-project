import * as constants from './constants';

export const getMyAppDetail = (APP_ID, VER, LANG, history, mod) => (
  {
    type: constants.GET_MY_APP_DETAIL,
    payload: {
      APP_ID,
      VER,
      LANG,
      history,
      mod,
    },
  }
);

export const test = list => (
  {
    type: constants.TEST,
    payload: { list },
  }
);
