import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  docMap: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DOC_LIST: {
      const { docList, WIDGET_ID } = action;
      return state.setIn(['docMap', WIDGET_ID, 'docList'], docList);
    }
    case actionTypes.SET_DOC_NUM: {
      const { num, WIDGET_ID } = action;
      return state.setIn(['docMap', WIDGET_ID, 'num'], num);
    }
    default:
      return state;
  }
};
export default appReducer;
