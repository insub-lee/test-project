import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  detail: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SAVE_DETAIL: {
      return state.set('detail', fromJS(action.detail));
    }

    default:
      return state;
  }
};
export default appReducer;
