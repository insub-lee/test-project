import * as constants from './constants';

// new add
export const projectListSearch = keyword => (
  {
    type: constants.LOADING_PROJECTLISTSEARCH_SAGA,
    keyword,
  }
);

export const projectCountInfo = () => (
  {
    type: constants.LOADING_PROJECTCOUNTINFO_SAGA,
  }
);
