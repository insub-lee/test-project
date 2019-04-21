import { fromJS } from 'immutable';

import * as actionType from './constants';

const initialState = fromJS({
  stockList: [],
  stockInfo: [],
});

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_STOCKLIST_SAGA: {
      return state.set('stockList', action.payload);
    }
    case actionType.SET_STOCKINFO_SAGA: {
      return state.set('stockInfo', action.payload);
    }
    default:
      return state;
  }
};

export default stockReducer;