import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  collaboratorList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_COLLABORATOR_LIST:
      return state.set('collaboratorList', action.collaboratorList);
    default:
      return state;
  }
};
export default pmsheetReducer;
