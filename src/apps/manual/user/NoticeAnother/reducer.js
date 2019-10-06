import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORYMAP_BYREDUCR: {
      const { key, categoryMapList } = action;
      return state.setIn(['notice', key], categoryMapList);
    }
    case actionTypes.SET_FILTERED_DATA_BYREDUCER: {
      const { data } = action;
      return state.setIn(['noticeData'], data);
    }
    default:
      return state;
  }
};
export default appReducer;
