import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  selectedMualTabIdx: 0,
  selectedMualIdx: 0,
  selectedTabIdx: 0,
  selectedCompIdx: [],
  manualTabList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_MANUAL_VIEW_REDUCR: {
      const { maulTabList } = action;
      return state.set('manualTabList', maulTabList);
    }
    case constantTypes.SET_SELECTED_MUAL_IDX_REDUCR: {
      const { mualIdx } = action;
      return state.set('selectedMualIdx', mualIdx);
    }
    case constantTypes.SET_SELECTED_TAB_IDX_REDUCR: {
      const { idx } = action;
      return state.set('selectedTabIdx', idx);
    }
    case constantTypes.SET_SELECTED_COMPONENT_IDX_REDUCR: {
      const { idx } = action;
      const compList = state.getIn(['manualTabList', state.get('selectedTabIdx'), 'MUAL_TABVIEWINFO']);
      const selectedCompIdx = getCompIdx(compList.toJS(), idx);
      return state.set('selectedCompIdx', fromJS(selectedCompIdx));
    }
    case constantTypes.RESET_MANUAL_VIEW_REDUCR: {
      return state
        .set('selectedMualTabIdx', 0)
        .set('selectedTabIdx', 0)
        .set('selectedCompIdx', fromJS([]))
        .set('manualTabList', fromJS([]));
    }
    default:
      return state;
  }
};

const getCompIdx = (compList, idx) => {
  let resultList = [];
  resultList.push(idx);
  const node = compList.filter(item => item.MUAL_TABCOMP_IDX === idx)[0];
  if (node.MUAL_TABCOMP_PIDX > 0) {
    const tempList = getCompIdx(compList, node.MUAL_TABCOMP_PIDX);
    resultList = resultList.concat(tempList);
  }
  return resultList;
};

export default appReducer;
