import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  linkTypeList: [],
  methodList: [],
  wedgetColorList: [],
});

const AppQnaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LINKTYPE:
      return state.set('linkTypeList', action.payload);
    case constants.SET_METHOD:
      return state.set('methodList', action.payload);
    case constants.SET_WEDGET_COLOR:
      return state.set('wedgetColorList', action.payload);
    default:
      return state;
  }
};

export default AppQnaReducer;
