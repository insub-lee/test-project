import * as actionType from './constants';

export const getBannerList = id => ({
  type: actionType.GET_BANNERLIST_SAGA,
  id,
});

export const deleteBanner = (item, widgetId, pageId) => ({
  type: actionType.DELETE_BANNER_SAGA,
  item,
  widgetId,
  pageId,
});

export const deleteBizBanner = (item, widgetId, pageId) => ({
  type: actionType.DELETE_BIZBANNER_SAGA,
  item,
  widgetId,
  pageId,
});
