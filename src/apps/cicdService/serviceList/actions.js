import * as constants from './constants';

export const serviceSearch = param => (
  {
    type: constants.SEARCH_SERVICE_SAGA,
    param,
  }
);

export default serviceSearch;
