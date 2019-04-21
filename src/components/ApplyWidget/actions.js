import * as constants from './constants';

export const sendApply = (appID, pageID, note) => ({
  type: constants.SEND_APPLY_SAGA,
  appID,
  pageID,
  note,
});

export const sendDeleteApply = (appID, pageID) => ({
  type: constants.SEND_CANCEL_APPLY,
  appID,
  pageID,
});
