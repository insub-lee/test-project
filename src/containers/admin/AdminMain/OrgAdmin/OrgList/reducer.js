import { fromJS } from 'immutable';
import * as actionType from './constants';

const initState = fromJS({
  profile: [],
  fullPath: [],
});

const userProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_FULLPATH_SUCCESS:
      // return state.set('fullPath', action.result);
      return state.set('profile', action.result);
    default:
      return state;
  }
};

export default userProfileReducer;
