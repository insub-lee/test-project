import * as constants from './constants';

export const safeWorkConnectSearch = value => (
  {
    type: constants.LOADING_SAFEWORK_CONNECT_SEARCH_SAGA,
    value,
  }
);
