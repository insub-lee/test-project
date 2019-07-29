import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  userList: [],
});

const UserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_USER_LIST:
      return state.set('userList', action.payload);
    default:
      return state;
  }
};

export default UserListReducer;
