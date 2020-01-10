import { fromJS } from 'immutable';

import * as actionType from './constants';

const initialState = fromJS({
  bannerList: [],
  bannerListFull: [],
  itemBannerList: {},
  widgetId: '',
  pageId: '',
  cashItem: [],
});

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_BANNERLIST_SUCCESS:
      return state
        .set('itemBannerList', action.item)
        .set('widgetId', action.widgetId)
        .set('pageId', action.pageId);
    case actionType.SET_BIZBANNERLIST_SUCCESS:
      return state
        .set('itemBannerList', action.item)
        .set('widgetId', action.widgetId)
        .set('pageId', action.pageId);
    // case actionType.SET_BANNERLIST:
    //   return state.set('itemBannerList', action.item);
    case actionType.SET_BANNERLIST:
      return state.set('cashItem', action.item);
    default:
      return state;
  }
};

export default bannerReducer;
