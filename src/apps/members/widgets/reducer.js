import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 사용자가 즐겨찾기에 등록한 구성원들
  userSetMembers: [],
});

const membersReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_MEMBERS:
      return state.set('members', action.members);
    case constants.LOADING_SETTING_MEMBERS:
      return state.set('userSetMembers', action.userSetMembers);
    case constants.DELETE_ALL_MEMBER:
      return state.set('userSetMembers', []);
    default:
      return state;
  }
};
  
export default membersReducer;
