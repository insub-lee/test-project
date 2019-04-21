import { fromJS } from 'immutable';
import * as actionType from './constants';
import EmptyRowsView from '../../components/Organization/emptyRowsView';

const initialState = fromJS({
  searchString: '',
  searchFocusIndex: 0,
  searchFoundCount: null,
  treeData: [],

  users: [],
  selectedIndexes: [],
  selectedDept: [],
  user: '',
  organizationSearchResult: [],
  organizationData: [],
  checkboxInitialize: false,

  // EmptyRowsView
  emptyRowsView: EmptyRowsView.EmptyViewTree,

  selectedIndex: '',

  profile: [],
});

const orgReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionType.SET_TREE_DATA:
      return state.set('treeData', action.treeData).set('selectedIndex', '');
      case actionType.SET_USERS:
      if(action.users !== undefined) {
        return state.set('users', action.users).set('selectedIndexes', action.selectedIndexes).set('organizationSearchResult', fromJS([])).set('emptyRowsView', EmptyRowsView.EmptyViewTree);
      }else{
        return state.set('users', '').set('selectedIndexes', '').set('organizationSearchResult', fromJS([])).set('emptyRowsView', EmptyRowsView.EmptyViewTree);
      }
    case actionType.SET_USER:
      return state.set('user', action.user);
      case actionType.GET_ORGANIZATION_USER:
      const result = action.payload.result;
      if (result.size === 0) {
        return state.set('organizationSearchResult', result).set('users', fromJS([])).set('emptyRowsView', EmptyRowsView.EmptyViewSearch);
      }
      return state.set('organizationSearchResult', result).set('emptyRowsView', EmptyRowsView.EmptyViewSearch);
    case actionType.SET_ORGANIZATION_DATA:
      return state.set('organizationData', action.organizationData).set('selectedDept', action.selectedDept);
    case actionType.SET_CHANGE_TREE_DATA:
      return state.set('treeData', action.treeData).set('selectedDept', action.selectedDept);
    case actionType.CLOSE_MODAL: 
      return state.set('users', []).set('organizationSearchResult', fromJS([]));
    case actionType.SET_PROFILE_DATA:
    return state.set('profile', action.result).set('selectedIndex', action.selectedIndex);
    case actionType.SET_PROFILE_DATA_SEARCH:
    return state.set('profile', action.result).set('selectedIndex', action.selectedIndex);
    default:
      return state;
  }
};

export default orgReducer;
