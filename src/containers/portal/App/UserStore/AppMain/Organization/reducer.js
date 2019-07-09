import { fromJS } from 'immutable';
import { SET_USERS, SET_USER, SET_TREE_DATA } from './constants';

const initialState = fromJS({
  searchString: '',
  searchFocusIndex: 0,
  searchFoundCount: null,
  treeData: [],

  users: [],
  selectedIndexes: [],

  user: '',
});

const orgReducer = (state = initialState, action) => {
  // let return fromJS(state);

  switch (action.type) {
    case SET_TREE_DATA:
      return state.set('treeData', action.treeData);
    case SET_USERS:
      return state.set('users', action.users).set('selectedIndexes', action.selectedIndexes);
    case SET_USER:
      return state.set('user', action.user);
    default:
      return state;
  }
};

export default orgReducer;
