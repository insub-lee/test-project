import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  list: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST: {
      const { list } = action;
      return state.update('list', arr => arr.concat(fromJS(list)));
    }
    default:
      return state;
  }
};

export default reducer;
