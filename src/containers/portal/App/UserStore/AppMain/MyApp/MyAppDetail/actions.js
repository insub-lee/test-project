import * as constants from './constants';

export const getMyAppDetail = (APP_ID, VER) => (
  {
    type: constants.GET_MY_APP_DETAIL,
    payload: { APP_ID, VER },
  }
);

export const serviceStop = (APP_ID, VER, stopReason, reasonText, history) => (
  {
    type: constants.SERVICE_STOP,
    payload: {
      APP_ID,
      VER,
      stopReason,
      reasonText,
      history,
    },
  }
);

export const serviceRestart = (APP_ID, VER, history) => (
  {
    type: constants.SERVICE_RESTART,
    payload: {
      APP_ID,
      VER,
      history,
    },
  }
);
