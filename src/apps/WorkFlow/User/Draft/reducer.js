import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  draftList: [],
  selectedDraft: {},
  visibleViewModal: false,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_DRAFT_LIST: {
      const { list } = action;
      return state
        .set('draftList', fromJS(list))
        .set('selectedDraft', fromJS({}))
        .set('visibleViewModal', false);
    }
    case constantTypes.INIT_DRAFT_DATA: {
      return initialState;
    }
    case constantTypes.SET_SELECTED_DRAFT: {
      const { draft, visible } = action;
      return state.set('selectedDraft', fromJS(draft)).set('visibleViewModal', visible);
    }
    default:
      return state;
  }
};

export default appReducer;
