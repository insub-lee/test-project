import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  appList: [],
  workBuilderList: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { data } = action;
      return state.set('appList', fromJS(data.filter(work => work.APP_ID !== -1))).set('workBuilderList', fromJS(data));
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
