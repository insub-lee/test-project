import * as constants from './constants';

export const loadingParam = () => (
  {
    type: constants.LOADING_PARAM_SAGA,
  }
);

export const loadingMeetRoom = () => (
  {
    type: constants.LOADING_MEET_ROOM_SAGA,
  }
);
