import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  manualListState: {},
  isLoding: false,
  paginationIdx: 1,
});

const appMualListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_MANUALLIST_REDUCR: {
      const { manualList } = action;
      return state.setIn(['manualListState'], manualList).set('isLoding', false);
    }
    case constantTypes.SET_LIST_LODING_REDUCR: {
      const { flag } = action;
      return state.set('isLoding', flag);
    }
    case constantTypes.SET_PAGINATION_IDX_REDUCR: {
      const { idx } = action;
      return state.set('paginationIdx', idx);
    }
    default:
      return state;
  }
};

export default appMualListReducer;
