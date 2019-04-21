import * as constants from './constants';

export const loadingCollaboratorList = (empNo) => (
  {
    type: constants.LOADING_COLLABORATOR_LIST_SAGA,
    payload: {
      empNo,
    }
  }
);

export const handleCollaboratorUpdate = (list) => (
  {
    type: constants.UPDATE_COLLABORATOR_LIST_SAGA,
    payload: {
      list,
    }
  }
);
