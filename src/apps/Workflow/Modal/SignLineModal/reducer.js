import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  users: [],
  pagination: {
    currentPage: 1,
    pageSize: 10000,
  },
  selectedUsers: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_INITIALSTATE: {
      return initialState;
    }
    case constantTypes.SET_USERS: {
      const { list, currentPage } = action;
      return state.set('users', currentPage > 1 ? state.get('users').concat(fromJS(list)) : fromJS(list));
    }
    case constantTypes.SET_PAGINATION: {
      const { pagination } = action;
      return state.set('pagination', fromJS(pagination));
    }
    case constantTypes.SET_SELECTEDUSERS: {
      const { selectedUsers } = action;
      // selectedUsers.sort((a, b) => {
      //   console.debug(a.SORT_SQ, '/', b.SORT_SQ);
      //   if (a.SORT_SQ > b.SORT_SQ) {
      //     return -11;
      //   }
      //   if (a.SORT_SQ < b.SORT_SQ) {
      //     return 1;
      //   }
      //   return 0;
      // });
      return state.set('selectedUsers', fromJS(selectedUsers));
    }
    default:
      return state;
  }
};

export default appReducer;
