import * as constants from './constants';

export const techSafeDetailSearch = value => (
  {
    type: constants.LOADING_TECHSAFE_DETAIL_SEARCH_SAGA,
    value,
  }
);
