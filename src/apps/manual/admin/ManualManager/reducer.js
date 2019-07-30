import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  pageType: 'list',
  viewCategoryIdx: 0,
  listCategoryIdx: 0,
  manualIdx: 0,
});

const appMualListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_PAGEMODE_REDUCR: {
      const { pageType, categoryIdx, manualIdx } = action;
      if (pageType === 'change') {
        const listIdx = state.get('listCategoryIdx');
        return state
          .set('pageType', 'list')
          .set('listCategoryIdx', listIdx === 0 ? categoryIdx : listIdx)
          .set('manualIdx', manualIdx);
      }
      return state
        .set('pageType', pageType)
        .set(`${pageType}CategoryIdx`, categoryIdx)
        .set('manualIdx', manualIdx);
    }
    default:
      return state;
  }
};

export default appMualListReducer;
