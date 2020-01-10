import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  draftPrcRule: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DRAFT_PRC_RULE: {
      const { draftPrcRule } = action;
      return state.set('draftPrcRule', fromJS(draftPrcRule));
    }
    default:
      return state;
  }
};

export default appReducer;
