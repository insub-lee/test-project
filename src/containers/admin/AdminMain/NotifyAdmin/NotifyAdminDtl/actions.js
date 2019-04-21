import * as constants from './constants';

export const getNotifyMsg = MSG_ID => (
  {
    type: constants.GET_NOTIFY_MSG,
    MSG_ID,
  }
);

export const udtPostState = (MSG_ID, OPEN_YN) => (
  {
    type: constants.UDT_POST_STATE,
    MSG_ID,
    OPEN_YN,
  }
);

