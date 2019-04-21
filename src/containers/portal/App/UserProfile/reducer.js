import { fromJS } from 'immutable';
import * as actionType from './constants';

const initState = fromJS({
  profile: null,
  fullPath: [],
});

const userProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_FULLPATH_SUCCESS:
      return state.set('fullPath', action.result);
    default:
      return state;
  }
};

export default userProfileReducer;
