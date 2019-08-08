import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  isViewContents: false,
  selectedMualIdx: 0,
  totalManualList: [],
  checkedMualList: [],
});

const appCSMualListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_TOTALMANUALIST: {
      const { totalManualList } = action;
      return state.set('totalManualList', totalManualList);
    }
    case constantTypes.SET_IS_VIEW_CONTENTS_REDUCR: {
      const { flag } = action;
      return state.set('isViewContents', flag);
    }
    case constantTypes.SET_SELECTED_MUAL_IDX_REDUCR: {
      const { mualIdx } = action;
      return state.set('selectedMualIdx', mualIdx);
    }
    case constantTypes.SET_CHECK_MANUAL_REDUCR: {
      const { mualIdx } = action;
      const checkedMualList = state.get('checkedMualList');
      const findIdx = checkedMualList.findIndex(item => item === mualIdx);
      if (findIdx > -1) {
        return state.set('checkedMualList', checkedMualList.splice(findIdx, 1));
      }
      return state.set('checkedMualList', checkedMualList.push(mualIdx));
    }
    default:
      return state;
  }
};

export default appCSMualListReducer;
