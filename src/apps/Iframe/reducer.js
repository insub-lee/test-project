import { fromJS } from 'immutable';
import * as actionConst from './constants';

const initialState = fromJS({
  urlMap: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConst.SET_URL: {
      const { url, WIDGET_ID } = action;
      return state.setIn(['urlMap', WIDGET_ID, 'url'], url);
    }
    default:
      return state;
  }
};
export default appReducer;
