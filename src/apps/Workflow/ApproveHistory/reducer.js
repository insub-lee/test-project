import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  draftQueHistoryList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DRAFT_QUE_HISTORY_LIST: {
      const { list } = action;
      return state.set('draftQueHistoryList', fromJS(list));
    }
    default:
      return state;
  }
};

export default appReducer;
