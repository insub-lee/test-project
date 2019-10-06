import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  manualListState: [],
  isLoding: false,
  paginationIdx: 1,
  expandedKeyList: [],
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
    case constantTypes.SET_EXPANDED_KEY_LIST_REDUCR: {
      const { list } = action;
      return state.set('expandedKeyList', list);
    }
    case constantTypes.SET_EXPANDED_ROW_REDUCR: {
      const { idx } = action;
      let list = state.get('expandedKeyList');
      const expandedIdx = list.findIndex(node => node === idx);
      if (expandedIdx > -1) {
        list = list.splice(expandedIdx, 1);
      } else {
        list = list.push(idx);
      }
      return state.set('expandedKeyList', list);
    }
    default:
      return state;
  }
};

export default appMualListReducer;
