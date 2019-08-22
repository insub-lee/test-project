import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  detail: [],
  searchWord: '',
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_DETAIL: {
      return state.set('detail', fromJS(action.detail));
    }
    case actionConst.SAVE_SEARCH_WORD: {
      return state.set('searchWord', action.text);
    }

    default:
      return state;
  }
};
export default appReducer;
