import * as actionType from './constants';

export const getFullPath = id => (
  {
    type: actionType.GET_FULLPATH_SAGA,
    id,
  }
);

export default getFullPath;
