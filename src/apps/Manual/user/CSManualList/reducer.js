import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({});

const appCSMualListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_TOTALMANUALIST: {
      const { totalManualList } = action;
      console.debug(totalManualList);
      return state.set('totalManualList', totalManualList);
    }
    default:
      return state;
  }
};

export default appCSMualListReducer;
