import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  bizInfo: {},
  bizQnaList: [],
  bizFaqList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BIZ_INFO:
      return state.set('bizInfo', action.bizInfo);
    case constants.SET_QNALIST:
      return state.set('bizQnaList', action.bizQnaList);
    case constants.SET_FAQLIST:
      return state.set('bizFaqList', action.bizFaqList);
    default:
      return state;
  }
};

export default orgReducer;
