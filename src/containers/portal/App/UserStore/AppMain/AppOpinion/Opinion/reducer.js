import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  opinionList: [],
  oppoList: [],
  comboList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_OPINION_LIST:
      return state.set('opinionList', action.list);
    case constants.SET_OPPO_LIST:
      return state.set('oppoList', action.list);
    case constants.SET_COMBO_LIST:
      return state.set('comboList', action.list);
    default:
      return state;
  }
};

export default orgReducer;
