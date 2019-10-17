import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  draftList: {},
  selectedDraft: {},
  visibleViewModal: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_DRAFT_LIST: {
      const { list, pathname } = action;
      return state
        .setIn(['draftList', pathname], fromJS(list))
        .setIn(['selectedDraft', pathname], fromJS({}))
        .setIn(['visibleViewModal', pathname], false);
    }
    case constantTypes.INIT_DRAFT_DATA: {
      return initialState;
    }
    case constantTypes.SET_SELECTED_DRAFT: {
      const { draft, visible, pathname } = action;
      return state.setIn(['selectedDraft', pathname], fromJS(draft)).setIn(['visibleViewModal', pathname], visible);
    }
    default:
      return state;
  }
};

export default appReducer;
