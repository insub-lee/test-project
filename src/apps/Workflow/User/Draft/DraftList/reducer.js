import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  draftList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_DRAFT_LIST: {
      const { list } = action;
      return state.set('draftList', fromJS(list));
    }
    case constantTypes.INIT_DRAFT_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default appReducer;
