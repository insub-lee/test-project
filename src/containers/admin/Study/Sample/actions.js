import * as constants from './constants';

export const getStart = num => (
  {
    type: constants.GET_SATRT,
    payload: { num },

  }
);

export const test = num => (
  {
    type: constants.TEST,
    payload: { num },
  }
);
