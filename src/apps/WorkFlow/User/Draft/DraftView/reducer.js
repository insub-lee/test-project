import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  draftDetail: {},
  signline: [],
  draftHistory: [],
  isRedirect: false,
  visibleOpinionModal: false,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_DRAFT_DETAIL: {
      const { detail, signline, draftHistory } = action;
      return state.set('draftDetail', fromJS(detail)).set('signline', fromJS(signline));
      // .set('draftHistory', fromJS(draftHistory));
    }
    case constantTypes.SET_ISREDIRECT: {
      const { isRedirect } = action;
      return state.set('isRedirect', isRedirect);
    }
    case constantTypes.SET_VISIBLE_OPINION: {
      const { visibleOpinionModal } = action;
      return state.set('visibleOpinionModal', visibleOpinionModal);
    }
    case constantTypes.INIT_DRAFT_DETAIL: {
      return initialState;
    }
    default:
      return state;
  }
};

export default appReducer;
