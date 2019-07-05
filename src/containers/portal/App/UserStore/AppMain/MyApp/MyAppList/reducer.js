import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  myAppList: [],
  searchTypeList: [],
});

const AppQnaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MY_APP_LIST:
      return state.set('myAppList', action.payload);
    case constants.SET_SEARCH_TYPE_LIST:
      return state.set('searchTypeList', action.payload);
    default:
      return state;
  }
};

export default AppQnaReducer;
