import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  deptList: [],
  deptUserList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEPT_LIST: {
      const { list } = action;
      return state.set('deptList', fromJS(list));
    }
    case actionTypes.SET_DEPT_USER_LIST: {
      const { list } = action;
      return state.set('deptUserList', fromJS(list));
    }
    case actionTypes.INIT_DEPT_USER_LIST: {
      return state.set('deptUserList', initialState.get('deptUserList'));
    }
    default:
      return state;
  }
};

export default appReducer;
