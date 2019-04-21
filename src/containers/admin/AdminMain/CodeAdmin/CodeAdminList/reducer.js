import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  codeAdminList: [],
  delAdminList: [],
});

const codeAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CODE_ADMIN_LIST:
      // console.log('reducers_SET_CODE_ADMIN_LIST', action.payload);
      return state.set('codeAdminList', action.payload);
    case constants.SET_DEL_CODEID:
      // console.log('reducers_SET_DEL_CODEID', action.payload);
      return state.set('delAdminList', action.payload);
    default:
      return state;
  }
};

export default codeAdminReducer;
