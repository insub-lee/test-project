import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  boxes: [],
  formStuffs: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GET_VIEW: {
      const { boxes, formStuffs } = action;
      console.debug(boxes, formStuffs);
      return state.set('boxes', fromJS(boxes)).set('formStuffs', fromJS(formStuffs));
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
