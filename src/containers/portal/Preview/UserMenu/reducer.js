import { fromJS } from 'immutable';
import * as actionType from './constants';

const initialState = fromJS({
  myAppTreeData: [],
  tempRowInfo: {},
});

const userMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_MYAPP_TREE:
      return state.set('myAppTreeData', action.myAppTreeData ? action.myAppTreeData : fromJS({}));
    case actionType.SET_MYAPP_TREE_NOTI:
      return state.set('myAppTreeData', action.myAppTreeData ? action.myAppTreeData : fromJS({})).set('open', true);
    case actionType.SAVE_DATA:
      return state.set('myAppTreeData', action.myAppTreeData).set('tempNode', action.node);
    case actionType.SET_MYAPP_TREE_FAIL:
      return state;
    default:
      return state;
  }
};

export default userMenuReducer;
